<template>
    <div id="content">
        <h3 class="text-left">Turmas Alocadas Neste Semestre</h3>

        <div class="cards">
            <div class="col-lg-5 cartao">
                <section class="demo-section">
                    <h6 class="text-left">Nível</h6>
                    <section>
                        <select class="browser-default custom-select" name="nivel">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </section>
                </section>
                <br>

                <section class="demo-section">
                    <h6 class="text-left">Curso</h6>
                    <section>
                        <select class="browser-default custom-select" name="curso" @change="this.getDisciplinas">
                            <option value="1">Informatica</option>
                            <option value="2">Matematica</option>
                            <option value="3">Estatistica</option>
                            <option value="4">Ciencias de Informacao Geografica</option>
                        </select>
                    </section>
                </section>
                <br>

                <section class="demo-section">
                    <h6 class="text-left">Disciplina</h6>
                    <section>
                        <select class="browser-default custom-select" name="disciplina">
                            <option v-for="d in disciplinas" :value="d.id_disciplina">{{ d.designacao }}</option>
                        </select>
                    </section>
                </section>
                <br>

                <section class="demo-section">
                    <h6 class="text-left">Regime</h6>
                    <section>
                        <div class="text-left radio">
                            <input type="radio" name="regime" id="lab" value="1" checked>
                            <label for="lab">&nbsp;Laboral</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" name="regime" id="pl" value="2">
                            <label for="pl">&nbsp;Pós-Laboral</label>
                        </div>
                    </section>
                </section>
                <br>

                <section class="demo-section">
                    <h6 class="text-left">Semestre</h6>
                    <section>
                        <div class="text-left radio">
                            <input type="radio" name="semestre" id="pr" value="1" checked>
                            <label for="pr">&nbsp;Primeiro</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" name="semestre" id="seg" value="2">
                            <label for="seg">&nbsp;Segundo</label>
                        </div>
                    </section>
                </section>
                <br>

                <section class="demo-section">
                    <h6 class="text-left">Carga Horária (Aulas)</h6>
                    <input type="number" class="form-control" id="carga">
                </section>
                <br>
            </div>

            <div class="col-lg-6 aside">
                <!--                <div class="col-lg-12 card-2 cartao">-->
                <!--                    <div style="background-color: #f749a8;color: white;padding: .2%0%.2%0%" class="col-lg-12">-->
                <!--                        Selecione os Dias de Semana das Aulas-->
                <!--                    </div>-->
                <!--                    <table class="col-lg-12 tabela" onselectstart="return false" style="cursor: pointer;">-->
                <!--                        <tr scope="row" class="linha">-->
                <!--                            <td><span>Segunda-Feira</span></td>-->
                <!--                            <td></td>-->
                <!--                            <td><input type="checkbox" class="custom-checkbox"></td>-->
                <!--                        </tr>-->
                <!--                        <tr scope="row" class="linha">-->
                <!--                            <td><span>Terca-Feira</span></td>-->
                <!--                            <td></td>-->
                <!--                            <td><input type="checkbox" class="custom-checkbox"></td>-->
                <!--                        </tr>-->
                <!--                        <tr scope="row" class="linha">-->
                <!--                            <td><span>Quarta-Feira</span></td>-->
                <!--                            <td></td>-->
                <!--                            <td><input type="checkbox" class="custom-checkbox"></td>-->
                <!--                        </tr>-->
                <!--                        <tr scope="row" class="linha">-->
                <!--                            <td><span>Quinta-Feira</span></td>-->
                <!--                            <td></td>-->
                <!--                            <td><input type="checkbox" class="custom-checkbox"></td>-->
                <!--                        </tr>-->
                <!--                        <tr scope="row" class="linha">-->
                <!--                            <td><span>Sexta-Feira</span></td>-->
                <!--                            <td></td>-->
                <!--                            <td><input type="checkbox" class="custom-checkbox"></td>-->
                <!--                        </tr>-->
                <!--                    </table>-->
                <!--                </div>-->
                <!--                <br>-->
                <br>
                <div class="col-lg-12 card-2 cartao">
                    <div style="background-color: #f749a8;color: white;padding: .2%0%.2%0%" class="col-lg-12">
                        Selecione os Feriados
                    </div>
                    <table class="col-lg-12 tabela" onselectstart="return false" style="cursor: pointer;">
                        <tr scope="row" class="linha">
                            <td><span>Selecionar Todos</span></td>
                            <td></td>
                            <td><input type="checkbox" class="custom-checkbox" id="check-all" @change="checkAll" checked></td>
                        </tr>
                        <tr scope="row" class="linha" v-for="d in datas">
                            <td><span>{{ d.data.split('-')[2] + ' / ' + d.data.split('-')[1] + ' / ' + d.data.split('-')[0] }}</span>
                            </td>
                            <td><span>{{ d.descricao }}</span></td>
                            <td class="check">
                                <input type="hidden" :value="d.id_data_historica">
                                <input type="checkbox" class="custom-checkbox" checked>
                            </td>
                        </tr>
                        <tr scope="row" class="linha" v-for="d2 in datas_2">
                            <td><span>{{ d2.data.split('-')[2] + ' / ' + d2.data.split('-')[1] + ' / ' + d2.data.split('-')[0] }}</span>
                            </td>
                            <td><span>{{ d2.descricao }}</span></td>
                            <td class="check">
                                <input type="hidden" :value="d2.id_data_historica">
                                <input type="checkbox" class="custom-checkbox" checked>
                            </td>
                        </tr>
                    </table>

                    <div class="col-lg-12 btn-add-data" id="btn-adicionar-data" @click="showModal">
                        <i class="fa fa-plus-circle"/>&nbsp;&nbsp;&nbsp;&nbsp;Adicionar Data
                    </div>
                </div>
            </div>

            <h5 class="text-right botao">
                <btn class="btn-create btn-md" @click="saveTurma">Criar</btn>
            </h5>
        </div>

        <div class="list">
            <div class="list-turmas col-lg-12">
                <div style="border: #2bbbad dotted 1px;padding: .2%0%.2%0%; font-size: small"
                     class="col-lg-12 font-weight-bold">Turmas
                    Criadas
                </div>
                <br>

                <table class="tabela col-lg-12">
                    <thead style="background-color: #f749a8;color: white;">
                    <tr>
                        <th>Nível</th>
                        <th>Curso</th>
                        <th>Disciplina</th>
                        <th>Regime</th>
                        <th>Semestre</th>
                        <th>Carga Horária</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="linha" v-for="t in turmas_completas">
                        <td>{{ t.nivel }}</td>
                        <td>{{ t.curso }}</td>
                        <td>{{ t.disciplina }}</td>
                        <td>{{ t.regime }}</td>
                        <td>{{ t.semestre }}</td>
                        <td>{{ t.carga_horaria }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!--Modal-->
        <modal size="md" id="modal">
            <modal-header>
                <modal-title>Registar Data</modal-title>
            </modal-header>
            <modal-body>
                <section>
                    <div class="text-left">
                        <label for="data">&nbsp;Data</label>
                        <input type="date" class="form-control" id="data">
                        <br>
                        <label for="descricao">&nbsp;Descricao</label>
                        <textarea class="form-control" id="descricao"/>
                    </div>
                </section>
            </modal-body>
            <modal-footer>
                <btn outline="default" darkWaves id="btn-cancel" @click="hideModal" class="btn-sm">Cancelar</btn>
                <btn id="btn-confirm" class="btn-sm" @click="saveData">Criar</btn>
            </modal-footer>
        </modal>
    </div>
</template>

<script>
    import {
        NumericInput,
        Btn,
        Card,
        CardBody,
        CardTitle,
        CardText,
        Tbl,
        TblBody,
        TblHead,
        Modal,
        ModalHeader,
        ModalTitle,
        ModalBody,
        ModalFooter
    } from 'mdbvue'
    import axios from "axios";
    import Vue from "vue";
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-default.css'
    import {my_base_url} from "../../recycler/global";

    Vue.use(VueToast);

    export default {
        name: "FormTurmas",
        components: {
            NumericInput,
            Btn,
            Card,
            CardBody,
            CardTitle,
            CardText,
            Tbl,
            TblBody,
            TblHead,
            Modal,
            ModalHeader,
            ModalTitle,
            ModalBody,
            ModalFooter
        },
        data() {
            return {
                disciplinas: [],
                turmas_completas: [],
                id_docente: localStorage.getItem('user_id'),
                datas: [],
                datas_2: [],
                datas_da_turma: []
            }
        },
        methods: {
            getDisciplinas() {
                let
                    id_nivel = $('select[name=nivel]').val(),
                    id_curso = $('select[name=curso]').val();
                axios.get(my_base_url + 'get_disciplinas?id_nivel=' + id_nivel + '&id_curso=' + id_curso)
                    .then(response => {
                        this.disciplinas = response.data.disciplinas;
                    });
            },
            saveTurma() {
                let
                    id_nivel = $('select[name=nivel]').val(),
                    id_curso = $('select[name=curso]').val(),
                    id_disciplina = $('select[name=disciplina]').val(),
                    id_regime = $('input[name="regime"]:checked').val(),
                    semestre = $('input[name="semestre"]:checked').val(),
                    carga_horaria = $('#carga').val(),
                    id_docente = this.id_docente,
                    ano = new Date().getFullYear(),
                    id_disciplina_curso = '';

                //Saving DisciplinaCurso
                axios.post(my_base_url + 'save_disciplina_curso', {
                    'id_curso': id_curso,
                    'id_disciplina': id_disciplina,
                    'id_nivel': id_nivel
                }).then(response => {
                    console.log('DisciplinaCurso salva com sucesso!');

                    //Yanking the id of the recently added DisciplinaCurso
                    axios.get(my_base_url + 'get_id_disciplina_curso?id_nivel=' + id_nivel + '&id_disciplina=' + id_disciplina + '&id_curso=' + id_curso)
                        .then(response => {
                            id_disciplina_curso = response.data.id_disciplina_curso[0].id_disciplina_curso;

                            //Saving the Stream (Alocacao)
                            axios.post(my_base_url + 'save_turma', {
                                'id_disciplina_curso': id_disciplina_curso,
                                'id_regime': id_regime,
                                'id_docente': id_docente,
                                'carga_horaria': carga_horaria,
                                'semestre': semestre,
                                'ano': ano
                            }).then(response => {
                                console.log('Turma salva com sucesso!');
                                this.getCompleteStreams();

                                //Yanking the recently added id of Alocacao
                                axios.get(my_base_url + 'get_id_alocacao?id_disciplina_curso=' + id_disciplina_curso + '&id_docente=' + id_docente)
                                    .then(response => {
                                        let id_alocacao = response.data.id_alocacao[0].id_alocacao;

                                        let tds = document.getElementsByClassName('check');
                                        for (let i = 0; i < tds.length; i++) {
                                            if (tds[i].children[1].checked) {
                                                let id_data_historica = tds[i].children[0].value;
                                                axios.post(my_base_url + 'save_data_da_turma', {
                                                    'id_data_historica': id_data_historica,
                                                    'id_alocacao': id_alocacao,
                                                }).then(response => {
                                                });
                                            }
                                        }
                                        Vue.$toast.open({
                                            message: 'Turma salva com sucesso',
                                            type: 'success',
                                            position: 'top',
                                            duration: 3000,
                                            queue: false,
                                            dismissible: true
                                        });
                                        this.getCompleteStreams();
                                    });
                            });
                        });
                });
            },
            getCompleteStreams() {
                axios.get(my_base_url + 'get_turmas_completas?id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmas_completas = response.data.turmas_completas;
                    });
            },
            getDatas() {
                axios.get(my_base_url + 'get_datas')
                    .then(response => {
                        this.datas = response.data.datas;
                    });
            },
            getDatas2() {
                axios.get(my_base_url + 'get_datas_2')
                    .then(response => {
                        this.datas_2 = response.data.datas_2;
                    });
            },
            saveData() {
                let data = $('#data').val(),
                    descricao = $('#descricao').val();

                axios.post(my_base_url + 'save_data', {
                    'data': data,
                    'descricao': descricao,
                    'is_feriado': 0,
                }).then(response => {
                    Vue.$toast.open({
                        message: 'Data adicionada com sucesso',
                        type: 'success',
                        position: 'top',
                        duration: 3000,
                        queue: false,
                        dismissible: true
                    });
                    this.getDatas2();
                });
            },
            checkAll() {
                $('#check-all').click(function () {
                    $('input:checkbox').prop('checked', this.checked);
                });
            },
            showModal() {
                $('#modal').modal('show');
            },
            hideModal() {
                $('#modal').modal('hide');
            }
        },
        beforeMount() {
            if (localStorage.getItem('user_id') === 'null') {
                this.$router.push('/');
            }
            this.getCompleteStreams();
            this.getDatas();
        }
    }
</script>

<style scoped>
    #content {
        margin: 2% 1% auto 18%;
        padding-left: 1%;
    }

    .cards {
        display: flex;
        justify-content: space-between;
        margin-top: 5%;
        border: #cf99a9 1px dotted;
        background-color: white;
        padding-top: 1%;
        padding-bottom: 2%;
        flex-wrap: wrap;
    }

    .card-2 {
        padding-top: 2%;
    }

    .radio {
        border: #cf99a9 1px dotted;
        padding-left: 2%;
        padding-top: 1%;
        background-color: white;
    }

    .list {
        display: flex;
        margin-top: 5%;
        margin-bottom: 8%;
        justify-content: space-between;
        border: #cf99a9 1px dotted;
        background-color: white;
        padding-top: 1%;
        padding-bottom: 2%;
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

    .botao {
        margin-left: auto;
        margin-right: 2%;
    }

    .btn-add-data {
        padding: .2% 0 .2% 0;
        border: #2bbbad solid 1px;
        font-size: small;
    }

    .btn-add-data:hover {
        cursor: pointer;
        color: #2bbbad;
    }

    #modal {
        display: none;
    }
</style>