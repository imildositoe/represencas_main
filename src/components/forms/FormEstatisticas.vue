<template>
    <div class="content">
        <h3 class="text-left">Estatisticas</h3><br>

        <div class="main-visao-estudante">
            <h6 class="label text-left font-weight-bold deep-blue-gradient">Estudantes</h6>
            <div class="col-lg-6">
                <h6 class="text-left">Selecione a Turma</h6>
                <select class="browser-default custom-select" name="turmas" @change="this.getValueOfTurma">
                    <option v-for="t in turmas" :value="t.id_regime+'-'+t.id_disciplina_curso+'-'+t.id_curso ">{{
                        t.disciplina }} {{ t.ano }} {{ t.regime }}
                    </option>
                </select>
            </div>

            <br><br>

            <div class="visao-estudante">
                <div class="table col-lg-6">
                    <table class="table-hover table-of-contents white">
                        <tr>
                            <select name="pagination" style="width: 400px;">
                                <option value="">1 - 10</option>
                                <option value="">11 - 20</option>
                                <option value="">21 - 30</option>
                                <option value="">31 - 40</option>
                                <option value="">41 - 50</option>
                                <option value="">51 - 60</option>
                                <option value="">61 - 70</option>
                                <option value="">71 - 80</option>
                                <option value="">81 - 90</option>
                                <option value="">91 - 100</option>
                            </select>
                        </tr>
                        <tr v-for="(item, index) in estudantes" @click="clickedLines">
                            <input type="hidden" :value="index">
                            <td>
                                <div style="display: flex; cursor: default;margin-top: -10px;margin-bottom: -18px;"
                                     onselectstart="return false">
                                    <div style="margin-left: -10px;">
                                        <img src="../../assets/img/avatar.png" class="img-table responsive-img"
                                             alt="image">
                                    </div>
                                    <div style="margin-left: 10px;">
                                        <h3 style="font-size: 10pt;font-weight: bold;" class="text-left">
                                            {{ item.nome }} {{ item.apelido }}
                                        </h3>
                                        <h6 style="font-size: 8pt;" class="text-left">Situacao</h6>
                                    </div>

                                    <div style="margin-left: auto;">
                                        <h5 style="font-size: 8pt;" class="text-left">0 Faltas</h5>
                                        <h5 style="font-size: 8pt;" class="text-left">0 %</h5>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="details col-lg-6">
                    <div style="display: flex;">
                        <div>
                            <img src="../../assets/img/avatar.png" alt="image" class="img-details">
                        </div>
                        <div style="margin-left: 10px;">
                            <h5 class="text-left font-weight-bold">{{ this.estudante_selecionado.nome }} {{
                                this.estudante_selecionado.apelido }}</h5>
                            <h6 class="text-left" style="font-size: 10pt;">{{ this.estudante_selecionado.nr_estudante
                                }}</h6>
                            <h6 class="text-left" style="font-size: 10pt;">Situacao</h6>
                        </div>
                    </div>

                    <div style="margin-top: 8%;">
                        <div>
                            <doughnut-chart :options="pieChartOptions" :data="pieChartData" :width="400" :height="200"/>
                        </div>
                        <div style="margin-right: 10px;margin-top: 5%;">
                            <h6 class="text-left" style="font-size: 10pt;">0 &nbsp;&nbsp;&nbsp;Aulas Total</h6>
                            <h6 class="text-left" style="font-size: 10pt;">0 &nbsp;&nbsp;&nbsp;Faltas Cometidas</h6>
                            <h6 class="text-left" style="font-size: 10pt;">0 &nbsp;&nbsp;&nbsp;Faltas Remanescentes</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>

        <div class="visao-turmas">
            <h6 class="label text-left font-weight-bold deep-blue-gradient">Turmas</h6>

            <div style="margin-top: 5%;">
                <div class="col-lg-7">
                    <bar-chart :data="barChartData" :options="barChartOptions" :width="400" :height="300"/>
                </div>
                <div>

                </div>
            </div>
        </div>

        <hr>

        <div class="visao-aulas">
            <h6 class="label text-left font-weight-bold deep-blue-gradient">Aulas</h6>

            <div class="col-lg-6" style="margin-top: 3%;margin-bottom: 4%;">
                <h6 class="text-left">Selecione a Turma</h6>
                <select class="browser-default custom-select" name="turmas" @change="">
                    <option v-for="t in turmas" :value="t.id_regime+'-'+t.id_disciplina_curso+'-'+t.id_curso ">{{
                        t.disciplina }} {{ t.ano }} {{ t.regime }}
                    </option>
                </select>
            </div>

            <div>
                <div class="col-lg-7">

                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {DoughnutChart, BarChart, LineChart} from 'mdbvue'
    import axios from "axios";

    export default {
        name: "FormEstatisticas",
        components: {
            DoughnutChart, BarChart, LineChart
        },
        data() {
            return {
                estudantes: [],
                turmas: [],
                value_turmas: {
                    id_regime: '',
                    id_disciplina_curso: '',
                    id_curso: ''
                },
                id_docente: 1,
                ano: new Date().getUTCFullYear(),
                estudante_selecionado: [],
                turmas_estatisticas: [],
                string_labels: [],

                //Doughnut Chart
                pieChartData: {
                    labels: ["Faltas Cometidas", "Faltas Remanescentes"],
                    datasets: [
                        {
                            data: [80, 20],
                            backgroundColor: ["#f749a8", "#46BFBD"],
                            hoverBackgroundColor: ["#f749a8", "#5AD3D1"]
                        }
                    ]
                },
                pieChartOptions: {
                    responsive: false,
                    maintainAspectRatio: false,
                    legend: {
                        position: 'bottom'
                    }
                },
                //Bar Chart
                barChartData: {
                    labels: ['A', 'B'],
                    datasets: [{
                        label: 'Número de Faltas',
                        data: [19, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255,78,174)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    }]
                },
                barChartOptions: {
                    responsive: false,
                    maintainAspectRatio: false,
                }
            }
        },
        methods: {
            clickedLines() {
                $('table tr').click(function () {
                    let tableData = $(this).children("input").map(function () {
                        return $(this).val();
                    }).get();
                    let index = tableData[0];

                    let estudantes = JSON.parse(localStorage.getItem('estudantes'));
                    localStorage.setItem('estudante_selecionado', JSON.stringify(estudantes[index]));
                });
                this.estudante_selecionado = JSON.parse(localStorage.getItem('estudante_selecionado'));
            },
            getStudents() {
                axios.get('http://127.0.0.1:8000/api/get_estudantes?id_disciplina_curso=' + this.value_turmas.id_disciplina_curso + '&id_regime=' + this.value_turmas.id_regime + '&ano=' + this.ano)
                    .then(response => {
                        this.estudantes = response.data.estudantes;
                        localStorage.setItem('estudantes', JSON.stringify(this.estudantes));
                    });
            },
            getStreams() {
                axios.get('http://127.0.0.1:8000/api/get_turmas?id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmas = response.data.turmas;
                    });
            },
            getValueOfTurma: function () {
                let selected = $('select[name=turmas]').val().split('-');

                this.value_turmas.id_regime = selected[0];
                this.value_turmas.id_disciplina_curso = selected[1];
                this.value_turmas.id_curso = selected[2];
                this.getStudents();
            },
            getTurmasEstatisticas() {
                axios.get('http://127.0.0.1:8000/api/get_turmas_estatisticas?id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmas_estatisticas = response.data.turmas_estatisticas;

                        for (let i = 0; i < this.turmas_estatisticas.length; i++) {
                            let array = this.turmas_estatisticas[i];
                            let turma = array.disciplina + " " + array.regime + " " + array.ano;
                            this.string_labels.push(turma);
                        }
                        this.labels = this.string_labels;
                    });
            }
        },
        beforeMount() {
            this.getStreams();
            this.getTurmasEstatisticas();
        }
    }
</script>

<style scoped>
    .content {
        margin: 2% 1% auto 18%;
        padding-left: 1%;
    }

    .main-visao-estudante, .visao-turmas, .visao-aulas {
        box-shadow: 0 0 1px 0 #887f84;
        border: 1px #d1c8c3 solid;
        padding-bottom: 2%;
        background-color: white;
    }

    .visao-estudante {
        display: flex;
    }

    tr {
        border-bottom: 1px #d1c8c3 solid;
        border-left: 1px #d1c8c3 solid;
        border-right: 1px #d1c8c3 solid;
    }

    td {
        padding-top: -100px;
    }

    .img-table {
        width: 40px;
        height: 35px;
    }

    .img-details {
        width: 100px;
        height: 100px;
    }

    .details {
        margin-left: -8%;
    }

    .label {
        width: 20%;
        margin-bottom: 3%;
        border-top: 1px #d1c8c3 solid;
        border-left: 1px #d1c8c3 solid;
    }

    tr:hover {
        background-color: rgba(209, 200, 195, 0.47);
    }

    /*.div-image, .div-nome, .div-perc {*/
    /*    display: inline-block;*/
    /*}*/
</style>