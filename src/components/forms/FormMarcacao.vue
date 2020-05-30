<template>
    <div id="content">
        <h3 class="text-left">Marcação</h3><br>

        <section>
            <h6 class="text-left">Selecione a Turma</h6>
            <h6 class="text-left">
                <select class="browser-default custom-select col-lg-5" name="turmas" @change="this.getValueOfTurma">
                    <option v-for="t in turmas"
                            :value="t.id_regime+'-'+t.id_disciplina_curso+'-'+t.id_curso+'-'+t.id_alocacao">{{
                        t.disciplina }} {{ t.ano }} {{ t.regime }}
                    </option>
                </select>
            </h6>
        </section>
        <br>

        <section class="btn-aulas text-left" onselectstart="return false" id="aulas">
            <div id="lbl-adicionar" class="lbl-add" @dblclick="showModal">
                &nbsp;&nbsp;&nbsp;<i class="fa fa-plus-circle"/>&nbsp;&nbsp;&nbsp;
            </div>
        </section>

        <div class="timer-table col-lg-12">
            <div class="start-timer col-lg-4">
                <div class="start container">
                    <h1 class="text-left finger"><i class="fa fa-fingerprint" style="color: #f749a8"/></h1>
                    <div>
                        <h6 class="text-left font-weight-bold">{{date}}</h6>
                        <h6 class="text-left">
                            <btn class="btn-md" @click="this.openSession" id="btn-open-session">Abrir Sessão</btn>
                        </h6>
                    </div>
                </div>
                <br><br>
                <div class="timer col-lg-10">
                    <div>
                        <h6 class="text-center"><i class="fa fa-stopwatch"/>&nbsp;<span class="font-weight-bold">Temporizador</span>
                        </h6>
                        <h6 class="text-center">
                            {{ etime }}
                        </h6>
                    </div>
                </div>
            </div>

            <div class="col-lg-8">
                <table class="tabela col-lg-12">
                    <thead style="background-color: #f749a8;color: white;">
                    <tr>
                        <th>Nr da Sessão</th>
                        <th>Numero do Estudante</th>
                        <th>Nome</th>
                        <th>Presença</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="linha" v-for="p in presencas">
                        <td>{{p.id_sessao}}</td>
                        <td>{{p.nr_estudante}}</td>
                        <td>{{p.nome}} {{p.apelido}}</td>
                        <td><input type="checkbox" class="custom-checkbox" :checked="p.is_presente" disabled></td>
                    </tr>
                    </tbody>
                </table>
                <br>
                <h6 class="text-right">
                    <btn class="btn-md" @click="this.breakMarking" id="btn-close-session">Fechar Sessão</btn>
                </h6>
                <br><br><br><br>
                <h6 class="text-right">
                    <btn class="btn-md" @click="this.showModalCloseLesson">Fechar Aula</btn>
                </h6>
            </div>
        </div>
        <br><br>

        <!--Modal-->
        <modal size="md" id="modal">
            <modal-header>
                <modal-title>Selecione o tipo de aula</modal-title>
            </modal-header>
            <modal-body>
                <section>
                    <div class="text-left radio">
                        <input type="radio" name="tipo-aula" id="teo" value="1" checked>
                        <label for="teo">&nbsp;Teórica</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="tipo-aula" id="pra" value="2">
                        <label for="pra">&nbsp;Prática</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="tipo-aula" id="lab" value="3">
                        <label for="lab">&nbsp;Laboratorial</label>
                    </div>
                </section>
            </modal-body>
            <modal-footer>
                <btn outline="default" darkWaves id="btn-cancel" @click="hideModal" class="btn-sm">Cancelar</btn>
                <btn id="btn-confirm" class="btn-sm" @click="createAulas">Confirmar</btn>
            </modal-footer>
        </modal>

        <!--Modal Close Lesson-->
        <modal size="md" id="modalCloseLesson">
            <modal-header>
                <modal-title danger>Deseja Mesmo Fechar a Aula e Atribuir Faltas aos Estudantes nao Presentes?
                </modal-title>
            </modal-header>
            <modal-footer>
                <btn outline="danger" darkWaves id="btn-cancel-close-lesson" class="btn-sm"
                     @click="hideModalCloseLesson">
                    Cancelar
                </btn>
                <btn id="btn-confirm-close-lesson" class="btn-sm" color="danger" @click="assignAbsences">Confirmar</btn>
            </modal-footer>
        </modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Btn, Tbl, TblBody, TblHead, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter} from 'mdbvue';
    import axios from "axios";
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-default.css'
    import {my_base_url} from "../../recycler/global";

    Vue.use(VueToast);


    export default {
        name: "FormMarcacao",
        components: {Btn, Tbl, TblBody, TblHead, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter},
        data() {
            return {
                date: ((new Date().getDate() < 10) ? '0' + (new Date().getDate()) : new Date().getDate()) + ' / '
                    + (((new Date().getMonth().valueOf() + 1) < 10) ? '0' + (new Date().getMonth().valueOf() + 1) : (new Date().getMonth().valueOf() + 1)) + ' / '
                    + (new Date().getFullYear()),
                turmas: [],
                id_docente: localStorage.getItem('user_id'),
                value_turmas: {
                    id_regime: '',
                    id_disciplina_curso: '',
                    id_curso: ''
                },
                presencas: [],
                ano: new Date().getFullYear(),
                nr_aula: 1,
                id_aula: '',
                aulas: [],
                hora_inicio_sessao: '',
                id_sessao: '',
                is_session_opened: false,
                id_estudante_finger: '',
                id_alocacao: '',
                id_inscricao: '',
                now: 0,
                timer: null,
                etime: '00 : 00: 00',
                keepGoing: true,
                inscricoes: [],
                inscricoes_marcacoes: []
            }
        },
        methods: {
            getStreams() {
                axios.get(my_base_url + 'get_turmas?id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmas = response.data.turmas;

                        localStorage.setItem('marcacao_id_alocacao', this.turmas[0].id_alocacao);
                        this.id_alocacao = this.turmas[0].id_alocacao;
                    });
            },
            getValueOfTurma: function () {
                let selected = $('select[name=turmas]').val().split('-');

                this.value_turmas.id_regime = selected[0];
                this.value_turmas.id_disciplina_curso = selected[1];
                this.value_turmas.id_curso = selected[2];
                this.id_alocacao = selected[3];

                this.fillAulas();
            },
            fillAulas() {
                document.getElementById("btn-open-session").disabled = true;
                document.getElementById("btn-close-session").disabled = true;

                let self = this;
                let nr_aula = 1;
                let section = document.getElementById('aulas');
                let d = new Date();
                let data = d.getFullYear() + '-'
                    + ((d.getMonth().valueOf() + 1 < 10) ? '0' + (d.getMonth().valueOf() + 1) : (d.getMonth().valueOf() + 1)) + '-'
                    + ((d.getDate() < 10) ? '0' + (d.getDate()) : (d.getDate()));
                let id_alocacao;
                try {
                    id_alocacao = $('select[name=turmas]').val().split('-')[3];
                } catch (e) {
                    id_alocacao = localStorage.getItem('marcacao_id_alocacao');
                }

                for (let i = 0; i < section.children.length - 1; i++) {
                    section.removeChild(section.children[i]);
                }

                //Get the Aulas and fill it in the tabs
                axios.get(my_base_url + 'get_aulas?data=' + data + '&id_alocacao=' + id_alocacao)
                    .then(response => {
                        self.aulas = response.data.aulas;

                        for (let i = 0; i < section.children.length - 1; i++) {
                            section.removeChild(section.children[i]);
                        }

                        //Filling the Aulas in the tab_line (screen)
                        for (let i = 0; i < self.aulas.length; i++) {
                            let section = document.getElementById('aulas');
                            let div = document.createElement('div');
                            div.setAttribute('id', 'lbl-adicionar');
                            div.classList.add('lbl-add');
                            div.innerText = 'Aula ' + nr_aula++;
                            div.setAttribute('onselectstart', 'return false');
                            div.style.backgroundColor = '#bfcfcc';
                            div.style.cursor = 'pointer';
                            div.style.marginRight = '.2%';
                            div.style.fontSize = '10pt';
                            div.style.padding = '.2%2%0%2%';
                            div.addEventListener('click', function () {
                                for (let i = 0; i < self.aulas.length; i++) {
                                    section.children[i].style.borderBottom = '#bfcfcc 3px solid';
                                }
                                this.style.borderBottom = '#2bbbad 3px solid';

                                document.getElementById("btn-open-session").disabled = false;

                                //Getting the presences of students
                                self.id_aula = this.children[0].value;
                                let data = d.getFullYear() + '-'
                                    + ((d.getMonth().valueOf() + 1 < 10) ? '0' + (d.getMonth().valueOf() + 1) : (d.getMonth().valueOf() + 1)) + '-'
                                    + ((d.getDate() < 10) ? '0' + (d.getDate()) : (d.getDate()));
                                let id_alocacao = $('select[name=turmas]').val().split('-')[3];

                                axios.get(my_base_url + 'get_presencas?data=' + data + '&id_alocacao=' + id_alocacao + '&id_aula=' + self.id_aula)
                                    .then(response => {
                                        self.presencas = response.data.presencas;
                                    });
                            });
                            let input = document.createElement('input');
                            input.setAttribute('type', 'hidden');
                            input.value = self.aulas[i].id_aula;
                            div.appendChild(input);

                            section.insertBefore(div, section.childNodes[0]);
                        }
                    });
            },
            createAulas() {
                let self = this;

                //Create Aula
                let id_tipo_aula = $('input[name="tipo-aula"]:checked').val(),
                    id_alocacao = $('select[name=turmas]').val().split('-')[3],
                    id_sala = 4,
                    data = new Date().getFullYear() + '-' + (new Date().getMonth().valueOf() + 1) + '-' + new Date().getDate()
                        + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

                axios.post(my_base_url + 'save_aula', {
                    'id_tipo_aula': id_tipo_aula,
                    'id_alocacao': id_alocacao,
                    'id_sala': id_sala,
                    'data': data
                }).then(response => {
                    console.log('Aula salva com sucesso!');
                    self.fillAulas();
                });

                $('#modal').modal('hide');
            },
            openSession() {
                let self = this;
                let d = new Date();
                let hora_inicio = ((d.getHours() < 10) ? '0' + d.getHours() : d.getHours()) + ':' +
                    ((d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()) + ':' +
                    ((d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds()),
                    id_aula = this.id_aula;
                this.hora_inicio_sessao = hora_inicio;

                document.getElementById("btn-close-session").disabled = false;
                setTimeout(function () {
                    document.getElementById("btn-open-session").disabled = true;
                }, 1000);

                axios.post(my_base_url + 'abrir_sessao', {
                    'hora_inicio': hora_inicio,
                    'is_aberta': 1,
                    'id_aula': id_aula,
                }).then(response => {
                    console.log('Sessao criada');
                });

                axios.get('http://127.0.0.1:8081/api/start_session/' + self.id_alocacao)
                    .then(response => {
                        self.is_session_opened = true;

                        self.startStopwatch();

                        let flag = true;

                        function check() {
                            axios.get('http://127.0.0.1:8081/api/check_student')
                                .then(response => {
                                    self.id_estudante_finger = response.data;

                                    if (self.id_estudante_finger > 0) {
                                        flag = true;
                                        axios.get(my_base_url + 'get_id_inscricao?id_alocacao=' + self.id_alocacao + '&id_estudante=' + self.id_estudante_finger)
                                            .then(response => {
                                                self.id_inscricao = response.data.id_inscricao[0].id_inscricao;

                                                axios.get(my_base_url + 'get_id_sessao?hora_inicio_sessao=' + self.hora_inicio_sessao + '&id_aula=' + self.id_aula)
                                                    .then(response => {
                                                        self.id_sessao = response.data.id_sessao[0].id_sessao;

                                                        axios.post(my_base_url + 'save_marcacao', {
                                                            'is_presente': 1,
                                                            'id_inscricao': self.id_inscricao,
                                                            'id_sessao': self.id_sessao,
                                                        }).then(response => {
                                                            Vue.$toast.open({
                                                                message: 'Presença marcada com sucesso',
                                                                type: 'success',
                                                                position: 'top',
                                                                duration: 3000,
                                                                queue: false,
                                                                dismissible: true
                                                            });

                                                            let data = d.getFullYear() + '-'
                                                                + ((d.getMonth().valueOf() + 1 < 10) ? '0' + (d.getMonth().valueOf() + 1) : (d.getMonth().valueOf() + 1)) + '-'
                                                                + ((d.getDate() < 10) ? '0' + (d.getDate()) : (d.getDate()));

                                                            axios.get(my_base_url + 'get_presencas?data=' + data + '&id_alocacao=' + self.id_alocacao + '&id_aula=' + self.id_aula)
                                                                .then(response => {
                                                                    self.presencas = response.data.presencas;
                                                                });
                                                        });
                                                    });
                                            });
                                    } else if (self.id_estudante_finger === 0) {
                                        flag = false;
                                        self.closeSession();
                                    } else {
                                        flag = true;
                                        Vue.$toast.open({
                                            message: 'Estudante não registado',
                                            type: 'error',
                                            position: 'top',
                                            duration: 3000,
                                            queue: false,
                                            dismissible: true
                                        });
                                    }
                                    if (flag) {
                                        check();
                                    }
                                });
                        }

                        if (flag) {
                            check();
                        }
                    });
            },
            closeSession() {
                this.resetStopwatch();
                document.getElementById("btn-open-session").disabled = false;
                setTimeout(function () {
                    document.getElementById("btn-close-session").disabled = true;
                }, 1000);

                axios.get('http://127.0.0.1:8081/api/close_session')
                    .then(response => {
                        console.log('Session Closed');
                    });

                let d = new Date();
                let hora_fim = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

                axios.get(my_base_url + 'get_id_sessao?hora_inicio_sessao=' + this.hora_inicio_sessao + '&id_aula=' + this.id_aula)
                    .then(response => {
                        this.id_sessao = response.data.id_sessao[0].id_sessao;
                        axios.post(my_base_url + 'fechar_sessao', {
                            'hora_fim': hora_fim,
                            'is_selada': 1,
                            'is_aberta': 0,
                            'id_sessao': this.id_sessao
                        }).then(response => {
                            console.log('Sessao fechada');
                        });
                    });
            },
            assignAbsences() {
                let self = this;
                axios.get(my_base_url + 'get_inscricoes?id_alocacao=' + self.id_alocacao)
                    .then(response => {
                        self.inscricoes = response.data.inscricoes;

                        axios.get(my_base_url + 'get_inscricoes_marcacoes?id_aula=' + self.id_aula)
                            .then(response => {
                                self.inscricoes_marcacoes = response.data.inscricoes_marcacoes;

                                let second_flag = false;
                                for (let i = 0; i < self.inscricoes.length; i++) {
                                    let flag = false;
                                    for (let j = 0; j < self.inscricoes_marcacoes.length; j++) {
                                        if (self.inscricoes[i].id_inscricao === self.inscricoes_marcacoes[j].id_inscricao) {
                                            flag = true;
                                            break;
                                        }
                                    }

                                    if (!flag) {
                                        second_flag = true;
                                        axios.post(my_base_url + 'save_marcacao', {
                                            'is_presente': 0,
                                            'id_inscricao': self.inscricoes[i].id_inscricao,
                                            'id_sessao': self.id_sessao,
                                        }).then(response => {
                                            //TODO: fuck you JavaScript!
                                            let d = new Date();
                                            let data = d.getFullYear() + '-'
                                                + ((d.getMonth().valueOf() + 1 < 10) ? '0' + (d.getMonth().valueOf() + 1) : (d.getMonth().valueOf() + 1)) + '-'
                                                + ((d.getDate() < 10) ? '0' + (d.getDate()) : (d.getDate()));

                                            axios.get(my_base_url + 'get_presencas?data=' + data + '&id_alocacao=' + self.id_alocacao + '&id_aula=' + self.id_aula)
                                                .then(response => {
                                                    self.presencas = response.data.presencas;
                                                });
                                        });
                                    }
                                }

                                if (second_flag) {
                                    Vue.$toast.open({
                                        message: 'Faltas atribuidas com sucesso',
                                        type: 'success',
                                        position: 'top',
                                        duration: 3000,
                                        queue: false,
                                        dismissible: true
                                    });
                                    self.hideModalCloseLesson();
                                } else {
                                    Vue.$toast.open({
                                        message: 'Todos os estudantes ja marcaram as presencas',
                                        type: 'success',
                                        position: 'top',
                                        duration: 3000,
                                        queue: false,
                                        dismissible: true
                                    });
                                    self.hideModalCloseLesson();
                                }
                            });
                    });
            },
            breakMarking() {
                axios.get('http://127.0.0.1:8081/api/break_marking')
                    .then(response => {
                        console.log('The marking has broken!');
                    });
            },
            showModal() {
                $('#modal').modal('show');
            },
            hideModal() {
                $('#modal').modal('hide');
            },
            tick: function () {
                let self = this;
                self.now++;
                let remain = self.now;
                let hours = Math.floor(remain / 3600);
                remain -= hours * 3600;
                let mins = Math.floor(remain / 60);
                remain -= mins * 60;
                let secs = remain;

                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (mins < 10) {
                    mins = "0" + mins;
                }
                if (secs < 10) {
                    secs = "0" + secs;
                }
                self.etime = hours + " : " + mins + " : " + secs;
            },
            startStopwatch: function () {
                let self = this;
                self.timer = setInterval(self.tick, 1000);
            },
            stopStopwatch: function () {
                let self = this;
                clearInterval(self.timer);
                self.timer = null;
            },
            resetStopwatch: function () {
                let self = this;
                if (self.timer != null) {
                    self.stopStopwatch();
                }
                self.now = -1;
                self.tick();
            },
            showModalCloseLesson() {
                $('#modalCloseLesson').modal('show');
            },
            hideModalCloseLesson() {
                $('#modalCloseLesson').modal('hide');
            }
        },
        beforeMount() {
            if (localStorage.getItem('user_id') === 'null') {
                this.$router.push('/');
            }
            this.getStreams();
        },
        mounted() {
            // document.getElementById("btn-open-session").disabled = true;
            // document.getElementById("btn-close-session").disabled = true;
            this.fillAulas();
        }
    }
</script>

<style scoped>
    #content {
        margin: 2% 1% auto 18%;
        padding-left: 1%;
    }

    .finger {
        font-size: 50pt;
        margin-right: 10%;
        margin-left: -3%;
    }

    .start {
        display: flex;
    }

    .tabela {
        border: #cfc6c1 1px dotted;
        margin-bottom: 2%;
        margin-top: 1%;
    }

    .linha {
        border-top: rgba(230, 221, 226, 0.77) 1px solid;
    }

    .linha:hover {
        background-color: #e5dae0;
        transition-duration: 0.1s
    }

    .timer {
        border: #cf99a9 1px dotted;
        background-color: #faf4ff;
        height: 72px;
        padding-top: 1%;
    }

    .timer-table {
        display: flex;
        border-bottom: #cf99a9 1px dotted;
        border-left: #cf99a9 1px dotted;
        border-right: #cf99a9 1px dotted;
        padding-top: 5%;
        padding-bottom: 5%;
    }

    .btn-aulas {
        display: flex;
        border: #cf99a9 1px dotted;
    }

    .lbl-add {
        background-color: #bfcfcc !important;
        cursor: default;
    }

    .radio {
        padding-left: 2%;
        padding-top: 1%;
    }

    #modal {
        display: none;
    }

    #modalCloseLesson {
        display: none;
    }
</style>