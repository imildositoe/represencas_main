<template>
    <div id="content">
        <h3 class="text-left">Arquivo</h3><br>

        <div class="search col-lg-6 text-left">
            <input type="number" style="margin-top: 1.2%;margin-left: -3%" class="form-control" id="year"
                   :max="new Date().getFullYear()-1" min="1" placeholder="Pesquise o ano">
            <btn class="btn-md" id="btn-year" @click="fillTurmas"><i class="fa fa-search"/></btn>
        </div>
        <br>
        <br>

        <div style="background-color: #f749a8;color: white;">
            <h6>{{ ano }}</h6>
        </div>
        <br>

        <div class="panel">
            <div class="turmas" id="streams"></div>
            <br>
            <br>

            <div class="col-lg-12" style="display: flex; justify-content: space-between">
                <table class="col-lg-5 tabela" style="margin-left: -1%">
                    <thead style="background-color: rgba(222,219,222,0.82);">
                    <tr>
                        <th>Total de Aulas</th>
                        <th>Total de Faltas Cometidas</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr scope="row" class="linha">
                        <td>{{ carga_horaria_reduzida }}</td>
                        <td>{{ total_faltas }}</td>
                    </tr>
                    </tbody>
                </table>

                <table class="col-lg-7 tabela" style="margin-right: -1%">
                    <thead style="background-color: rgba(222,219,222,0.82);">
                    <tr>
                        <th>Estudantes Sem Faltas</th>
                        <th>Estudantes Com Faltas</th>
                        <th>Estudantes Excluidos por Faltas</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr scope="row" class="linha">
                        <td>{{sem_faltas}}</td>
                        <td>{{com_faltas}}</td>
                        <td>{{nr_excluidos}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <br><br>

            <div>
                <table class="col-lg-12 tabela">
                    <thead style="background-color: rgba(222,219,222,0.82);">
                    <tr>
                        <th>Numero de Estudante</th>
                        <th>Nome</th>
                        <th>Faltas</th>
                        <th>Excluido por Faltas</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr scope="row" v-for="e in estudantes" class="linha">
                        <td>{{ e.nr_estudante }}</td>
                        <td>{{ e.nome }} {{ e.apelido }}</td>
                        <td>{{ e.faltas }}</td>
                        <td>
                            <span v-if="e.is_excluido">Sim</span>
                            <span v-if="!e.is_excluido">Nao</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <br><br>
        </div>
    </div>
</template>

<script>
    import {Btn} from 'mdbvue';
    import axios from "axios";
    import {my_base_url} from "../../recycler/global";

    export default {
        name: "FormArquivo",
        components: {Btn},
        data() {
            return {
                estudantes: [],
                id_docente: localStorage.getItem('user_id'),
                turmas: [],
                carga_horaria_reduzida: 0,
                total_faltas: 0,
                id_alocacao: '',
                ano: 'ano',
                sem_faltas: 0,
                com_faltas: 0,
                nr_excluidos: 0
            }
        },
        methods: {
            fillTurmas() {
                let self = this;
                let section = document.getElementById('streams');
                this.ano = document.getElementById('year').value;

                for (let i = 0; i < section.children.length; i++) {
                    section.removeChild(section.children[i]);
                }

                //Get the Turmas and fill it in the tabs
                axios.get(my_base_url + 'get_turmas_arquivo?id_docente=' + self.id_docente + '&ano=' + this.ano)
                    .then(response => {
                        self.turmas = response.data.turmas_arquivo;

                        for (let i = 0; i < section.children.length - 1; i++) {
                            section.removeChild(section.children[i]);
                        }

                        //Filling the Turmas in the tab_line (screen)
                        for (let i = 0; i < self.turmas.length; i++) {
                            let section = document.getElementById('streams');
                            let div = document.createElement('div');
                            div.classList.add('lbl-add');
                            div.innerText = ' ' + self.turmas[i].disciplina_sigla + ' ' + self.turmas[i].ano + ' ' +
                                self.turmas[i].regime_sigla + ' ';
                            div.setAttribute('onselectstart', 'return false');
                            div.style.cursor = 'pointer';
                            div.style.marginRight = '1%';
                            div.addEventListener('click', function () {
                                for (let i = 0; i < self.turmas.length; i++) {
                                    section.children[i].style.backgroundColor = 'whitesmoke';
                                    section.children[i].style.color = 'black';
                                }
                                this.style.backgroundColor = '#2bbbad';
                                this.style.color = '#ffffff';
                                this.style.padding = '.5%1%.5%1%';
                                this.style.transitionDuration = '.2s';

                                self.id_alocacao = this.children[0].value;

                                axios.get(my_base_url + 'get_carga_horaria_reduzida?id_alocacao=' + self.id_alocacao)
                                    .then(response => {
                                        self.carga_horaria_reduzida = response.data.carga_horaria_reduzida[0].carga_horaria;
                                    });

                                axios.get(my_base_url + 'get_total_faltas_arquivo?id_alocacao=' + self.id_alocacao)
                                    .then(response => {
                                        self.total_faltas = response.data.total_faltas[0].total_faltas;
                                    });

                                axios.get(my_base_url + 'get_estudantes_arquivo?id_alocacao=' + self.id_alocacao)
                                    .then(response => {
                                        self.estudantes = response.data.estudantes;
                                    });

                                axios.get(my_base_url + 'get_estudantes_faltas?id_alocacao=' + self.id_alocacao)
                                    .then(response => {
                                        self.com_faltas = response.data.estudantes_faltas[0].estudantes_com_faltas;
                                        self.sem_faltas = response.data.estudantes_faltas[0].estudantes_sem_faltas;
                                    });

                                axios.get(my_base_url + 'get_nr_excluidos_arquivo?id_alocacao=' + self.id_alocacao)
                                    .then(response => {
                                        self.nr_excluidos = response.data.nr_excluidos[0].nr_excluidos;
                                    });
                            });
                            let input = document.createElement('input');
                            input.setAttribute('type', 'hidden');
                            input.value = self.turmas[i].id_alocacao;
                            div.appendChild(input);

                            section.appendChild(div);
                        }
                    });
            }
        },
        beforeMount() {
            if (localStorage.getItem('user_id') === 'null') {
                this.$router.push('/');
            }
        }
        // ,
        // mounted() {
        //     $("#flip").click(function () {
        //         $("#panel").slideToggle("fast");
        //     });
        // }
    }
</script>

<style scoped>
    #content {
        margin: 2% 1% auto 18%;
        padding-left: 1%;
    }

    #flip {
        padding: 5px;
        background-color: white;
        border: solid 1px #c3c3c3;
        cursor: pointer;
    }

    #panel {
        padding: 5px;
        background-color: white;
        border: solid 1px #c3c3c3;
        display: none;
    }

    .panel {
        border: #cf99a9 1px dotted;
        background-color: white;
    }

    .turmas {
        display: flex;
        border-bottom: #cf99a9 1px dotted;
        font-size: 10pt;
        background-color: whitesmoke !important;
    }

    .linha {
        border-top: rgba(230, 221, 226, 0.77) 1px solid;
    }

    .linha td, th {
        border-left: #cf99a9 1px dotted;
    }

    .tabela {
        border: #cfc6c1 1px dotted;
        margin-bottom: 3%;
    }

    .search {
        display: flex;
    }
</style>