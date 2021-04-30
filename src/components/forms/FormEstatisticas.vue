<template>
    <div class="content">
        <h3 class="text-left">Estatisticas</h3><br>

        <div class="main-visao-estudante">
            <h6 class="label text-left font-weight-bold deep-blue-gradient">Estudantes</h6>
            <div class="col-lg-6">
                <h6 class="text-left">Selecione a Turma</h6>
                <select class="browser-default custom-select" name="turmas" @change="this.getValueOfTurma">
                    <option v-for="t in turmas"
                            :value="t.id_regime+'-'+t.id_disciplina_curso+'-'+t.id_curso+'-'+t.id_alocacao">{{
                        t.disciplina }} {{ t.ano }} {{ t.regime }}
                    </option>
                </select>
            </div>

            <br><br>

            <div class="visao-estudante">
                <div class="table col-lg-6">
                    <table class="table-hover table-of-contents white" id="table-estudantes">
                        <tr>
                            <div style="width: 400px"/>
                        </tr>
                        <tr v-for="(item, index) in estudantes_resolver" @click="clickedLines">
                            <input type="hidden" :value="index+'-'+item.id_inscricao+'-'+item.faltas">
                            <td>
                                <div style="display: flex; cursor: default;margin-top: -10px;margin-bottom: -18px;"
                                     onselectstart="return false">
                                    <div style="margin-left: -10px;">
                                        <avatar :username="item.nome[0]"
                                                :size="35"
                                                :lighten="100"
                                                :background-color="random_color[Math.floor(Math.random() * random_color.length)]"
                                                color="#FFF"/>
                                    </div>
                                    <div style="margin-left: 10px;">
                                        <h3 style="font-size: 10pt;font-weight: bold;" class="text-left">
                                            {{ item.nome }} {{ item.apelido }}
                                        </h3>
                                        <h6 style="font-size: 8pt;" class="text-left">{{ (item.is_excluido === 1) ?
                                            'Excluido' : 'Participante' }}</h6>
                                    </div>

                                    <div style="margin-left: auto;">
                                        <h5 style="font-size: 8pt;" class="text-left">{{ item.faltas }} Faltas</h5>
                                        <h5 style="font-size: 8pt;" class="text-left">{{ ((item.faltas * 100) /
                                            item.carga_horaria).toFixed(1) }} %</h5>
                                    </div>
                                    <div v-if="((item.faltas * 100) / item.carga_horaria) >= 20"
                                         @click="showModal"
                                         style="background-color: #ff1048;width: 5px;height: 34px;border-radius: 4px;margin-left: 1px"/>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="details col-lg-6">
                    <div style="display: flex;">
                        <div>
                            <!--                            <avatar username="I"-->
                            <!--                                    :size="100"-->
                            <!--                                    :lighten="100"-->
                            <!--                                    :background-color="random_color_details[Math.floor(Math.random() * random_color.length)]"-->
                            <!--                                    color="#FFF"-->
                            <!--                                    :rounded="false"/>-->
                        </div>
                        <div style="margin-left: 10px;">
                            <h5 class="text-left font-weight-bold">{{ this.estudante_selecionado.nome }} {{
                                this.estudante_selecionado.apelido }}</h5>
                            <h6 class="text-left" style="font-size: 10pt;">{{ this.estudante_selecionado.nr_estudante
                                }}</h6>
                            <h6 class="text-left" style="font-size: 10pt;">{{ (this.estudante_selecionado.is_excluido
                                === 1) ? 'Excluido' : 'Participante' }}</h6>
                        </div>
                    </div>

                    <div style="margin-top: 8%;">
                        <div>
                            <faltas-doughnut-chart v-if="loadedPie" :chartdata="this.pieChartData"
                                                   :options="this.pieChartOptions" :width="400" :height="200"/>
                        </div>
                        <div style="margin-right: 10px;margin-top: 5%;">
                            <h6 class="text-left" style="font-size: 10pt;">{{ carga_horaria_reduzida }}
                                &nbsp;&nbsp;&nbsp;Aulas Total</h6>
                            <h6 class="text-left" style="font-size: 10pt;">{{ faltas_cometidas }} &nbsp;&nbsp;&nbsp;Faltas
                                Cometidas</h6>
                            <h6 class="text-left" style="font-size: 10pt;">{{ carga_horaria_reduzida - faltas_cometidas
                                }} &nbsp;&nbsp;&nbsp;Faltas Remanescentes</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>

        <div class="visao-turmas">
            <h6 class="label text-left font-weight-bold deep-blue-gradient">Turmas</h6>

            <div style="margin-top: 5%; display: flex">
                <div> <!-- 400, 200-->
                    <turmas-bar-chart v-if="loaded" :chartdata="this.chartdata" :options="options"/>
                </div>
                <div class="col-lg-4" style="margin: 6.5%0010%">
                    <h5 v-for="item in view_bar_array" style="font-size: medium" class="text-left">
                        <tbl>
                            <tr>
                                <td><span class="text-left">{{ item.label }}</span></td>
                                <td><span class="text-left">{{ item.nr_faltas }} Faltas</span></td>
                            </tr>
                        </tbl>
                    </h5>
                </div>
            </div>
        </div>

        <hr>

        <div class="visao-aulas">
            <h6 class="label text-left font-weight-bold deep-blue-gradient">Aulas</h6>
            <div style="display: flex">
                <div class="col-lg-7" id="chart">
                    <apex-chart type="bar" height="430" :options="chartOptions" :series="series"/>
                </div>
                <div class="col-lg-4" style="margin: 6.5%005%">
                    <h5 style="font-size: medium" class="text-left">
                        <tbl>
                            <thead>
                            <th><span class="font-weight-bold">Turma</span></th>
                            <th><span class="font-weight-bold">Teorica</span></th>
                            <th><span class="font-weight-bold">Pratica</span></th>
                            </thead>
                            <tr v-for="item in view_bar_array">
                                <td><span class="text-left">{{ item.label }}</span></td>
                                <td><span class="text-left">{{ item.nr_faltas }} Faltas</span></td>
                                <td><span class="text-left">{{ item.nr_faltas }} Faltas</span></td>
                            </tr>
                        </tbl>
                    </h5>
                </div>
            </div>
        </div>

        <hr>

        <div class="visao-geral">
            <h6 class="label text-left font-weight-bold deep-blue-gradient">Geral</h6>
            <div>
                <div class="col-lg-10">
                    <div class="col-lg-6">
                        <h6 class="text-left font-small">Selecione a Turma</h6>
                        <select class="browser-default custom-select font-small" name="turmas_geral"
                                @change="this.geral">
                            <option v-for="t in turmas"
                                    :value="t.id_regime+'-'+t.id_disciplina_curso+'-'+t.id_curso+'-'+t.id_alocacao">
                                {{
                                t.disciplina }} {{ t.ano }} {{ t.regime }}
                            </option>
                        </select>
                    </div>

                    <br><br>

                    <div class="dados-numericos col-lg-12">
                        <div>
                            <h6 class="text-left font-small">{{ nr_excluidos }} Excluidos por Faltas</h6>
                            <h6 class="text-left font-small">{{ ((nr_excluidos * 100) / nr_estudantes).toFixed(1) }}% do
                                Total dos
                                Estudantes</h6>
                        </div>
                        <div>
                            <div class="text-left radio" style="border: #cf99a9 1px dotted;padding: 2%0%0%2%">
                                <input type="radio" name="genero" id="masc" value="M" checked>
                                <label for="masc" class="font-small" @click="getMasc">&nbsp;Homens</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio" name="genero" id="fem" value="F">
                                <label for="fem" class="font-small" @click="getFem">&nbsp;Mulheres</label>
                            </div>
                            <br>
                            <h6 class="text-left font-small">{{ nr_excluidos_por_genero }} {{ this.genero[1] }}
                                Excluidos por Faltas</h6>
                            <h6 class="text-left font-small">{{ ((nr_excluidos_por_genero * 100) / nr_genero).toFixed(1)
                                }}% do
                                Total dos {{ this.genero[1] }}</h6>
                        </div>
                        <div>
                            <select class="browser-default custom-select font-small" name="faixa" @change="geralFaixa">
                                <option value="15-20">15 - 20 anos</option>
                                <option value="21-30">21 - 30 anos</option>
                                <option value="31-50">31 - 50 anos</option>
                                <option value="51-200">51 + anos</option>
                            </select>
                            <br>
                            <br>
                            <h6 class="text-left font-small">{{ nr_excluidos_faixa }} Excluidos por Faltas</h6>
                            <h6 class="text-left font-small">{{ ((nr_excluidos_faixa * 100) / nr_faixa).toFixed(1) }}%
                                do Total dos
                                Estudantes</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Modal-->
        <modal size="md" id="modal">
            <modal-header>
                <modal-title danger>Deseja Mesmo Excluir Esse Estudante?</modal-title>
            </modal-header>
            <modal-footer>
                <btn outline="danger" darkWaves id="btn-cancel" class="btn-sm" @click="hideModal">
                    Cancelar
                </btn>
                <btn id="btn-confirm" class="btn-sm" color="danger" @click="excluirEstudante">Excluir</btn>
            </modal-footer>
        </modal>
    </div>
</template>

<script>
    import {
        DoughnutChart,
        Tbl,
        TblBody,
        Modal,
        ModalHeader,
        ModalTitle,
        ModalBody,
        ModalFooter,
        Btn
    } from 'mdbvue';
    import TurmasBarChart from "@/components/charts/TurmasBarChart";
    import FaltasDoughnutChart from "@/components/charts/FaltasDoughnutChart";
    import axios from "axios";
    import ApexChart from 'vue-apexcharts'
    import {my_base_url} from "../../recycler/global";
    import Avatar from 'vue-avatar'
    import Vue from "vue";

    export default {
        name: "FormEstatisticas",
        components: {
            DoughnutChart,
            Tbl,
            Btn,
            TblBody,
            TurmasBarChart,
            ApexChart,
            FaltasDoughnutChart,
            Modal,
            ModalHeader,
            ModalTitle,
            ModalBody,
            ModalFooter,
            Avatar
        },
        data: () => ({
            estudantes: [],
            turmas: [],
            value_turmas: {
                id_regime: '',
                id_disciplina_curso: '',
                id_curso: ''
            },
            id_docente: localStorage.getItem('user_id'),
            ano: new Date().getFullYear(),
            estudante_selecionado: [],
            turmas_estatisticas: [],
            string_labels: [],
            chartdata: null,
            options: null,
            loaded: false,
            nr_estudantes: 1,
            nr_excluidos: 0,
            nr_genero: 1,
            nr_excluidos_por_genero: 0,
            nr_faixa: 1,
            nr_excluidos_faixa: 0,
            genero: ['M', 'Homens'],
            doughnut_chart_faltas: [],
            id_inscricao: '',
            pieChartData: null,
            pieChartOptions: null,
            loadedPie: false,
            estudantes_resolver: [],
            marcacoes: [],
            carga_horaria_reduzida: 0,
            faltas_cometidas: 0,
            labels_bar: [],
            faltas_bar: [],
            faltas_bar_1: [],
            faltas_bar_2: [],
            view_bar_array: [],
            random_color: ["#f749a8", "#46BFBD", "#a3bf66", "#8b7bbf", "#9d97bf", "#ff9e41", "#ffa7b7", "#ffd471", "#3ebf8e", "#ff9ae7"],
            // Grouped Bar Chart
            series: [{
                name: 'Teorica',
                data: [16, 6, 0]
            }, {
                name: 'Pratica',
                data: [42, 2, 0]
            }],
            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 430
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: 'top',
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                        fontSize: '12px',
                        colors: ['#fff'],
                    }
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ['#fff']
                },
                xaxis: {
                    categories: ['II 2020 Lab', 'GA 2020 Lab', 'II 2020 PL'],
                }
            }
        }),
        async mounted() {
            this.fillBarChart();
        },
        methods: {
            async fillDoughnutChart() {
                let self = this;
                self.loadedPie = false;
                let cometidas = parseInt(self.faltas_cometidas),
                    remanescente = parseInt(self.carga_horaria_reduzida) - cometidas;

                await new Promise(function (resolve) {
                    resolve('I Love You, Baby!');
                }).then(function () {
                    self.loadedPie = true;
                    self.pieChartData = {
                        labels: ["Faltas Cometidas", "Faltas Remanescentes"],
                        datasets: [{
                            data: [cometidas, remanescente],
                            backgroundColor: ["#f749a8", "#46BFBD", "#a3bf66", "#8b7bbf", "#46BFBD", "#bfa44e", "#bf7fb6"],
                            hoverBackgroundColor: ["#f749a8", "#46BFBD", "#a3bf66", "#8b7bbf", "#46BFBD", "#bfa44e", "#bf7fb6"],
                        }]
                    };

                    self.pieChartOptions = {
                        responsive: false,
                        maintainAspectRatio: false,
                        legend: {
                            position: 'bottom'
                        }
                    };
                });
            },
            async fillBarChart() {
                let self = this;
                self.loaded = false;

                await new Promise(function (resolve) {
                    resolve('Lets go, Bitch!')
                }).then(function () {

                    axios.get(my_base_url + 'get_faltas_bar_1?id_docente=' + self.id_docente)
                        .then(response => {
                            self.faltas_bar_1 = response.data.faltas_bar_1;

                            axios.get(my_base_url + 'get_faltas_bar_2?id_docente=' + self.id_docente)
                                .then(response => {
                                    self.faltas_bar_2 = response.data.faltas_bar_2;

                                    for (let i = 0; i < self.faltas_bar_1.length; i++) {
                                        for (let j = 0; j < self.faltas_bar_2.length; j++) {
                                            if (self.faltas_bar_1[i].id_alocacao === self.faltas_bar_2[j].id_alocacao) {
                                                self.faltas_bar_1[i].nr_faltas = self.faltas_bar_2[j].nr_faltas;
                                            }
                                        }
                                    }

                                    for (let i = 0; i < self.faltas_bar_1.length; i++) {
                                        let text = self.faltas_bar_1[i].disciplina + ' ' + self.faltas_bar_1[i].ano +
                                            ' ' + self.faltas_bar_1[i].regime;
                                        self.labels_bar.push(text);
                                        self.faltas_bar.push(self.faltas_bar_1[i].nr_faltas);

                                        self.view_bar_array.push({
                                            'label': text,
                                            'nr_faltas': self.faltas_bar_1[i].nr_faltas
                                        });
                                    }

                                    self.loaded = true;
                                    self.chartdata = {
                                        labels: self.labels_bar,
                                        datasets: [{
                                            label: "",
                                            data: self.faltas_bar,
                                            backgroundColor: [
                                                "rgb(247,73,168)",
                                                "rgb(70,191,189)",
                                            ],
                                            borderColor: [
                                                "rgb(247,73,168)",
                                                "rgb(70,191,189)",
                                            ],
                                            borderWidth: 1
                                        }]
                                    };

                                    self.options = {
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        },
                                        maintainAspectRatio: false,
                                        title: {
                                            display: true,
                                            text: " FALTAS COMETIDAS EM CADA TURMA"
                                        }
                                    }
                                });
                        });
                });
            },
            async fillGroupedChart() {
                let self = this;

                await new Promise(function (resolve) {
                    resolve('Love you, bitch!')
                }).then(function () {

                });
            },
            clickedLines() {
                let self = this;
                $('table tr').click(function () {
                    let tableData = $(this).children("input").map(function () {
                        return $(this).val();
                    }).get();
                    let index = tableData[0].split('-')[0];
                    self.estudante_selecionado = self.estudantes[index];
                    self.id_inscricao = tableData[0].split('-')[1];
                    self.faltas_cometidas = tableData[0].split('-')[2];
                    self.fillDoughnutChart();
                });
            }
            ,
            getStudents() {
                axios.get(my_base_url + 'get_estudantes?id_disciplina_curso=' + this.value_turmas.id_disciplina_curso + '&id_regime=' + this.value_turmas.id_regime + '&ano=' + this.ano)
                    .then(response => {
                        this.estudantes = response.data.estudantes;

                        axios.get(my_base_url + 'get_marcacoes')
                            .then(response => {
                                this.marcacoes = response.data.marcacoes;
                                this.estudantes_resolver = this.estudantes;

                                for (let i = 0; i < this.estudantes.length; i++) {
                                    for (let j = 0; j < this.marcacoes.length; j++) {
                                        if (this.estudantes[i].id_inscricao === this.marcacoes[j].id_inscricao) {
                                            this.estudantes_resolver[i].faltas = this.marcacoes[j].faltas;
                                        }
                                    }
                                }
                                for (let i = 0; i < this.estudantes.length; i++) {
                                    if (isNaN(this.estudantes[i].faltas)) {
                                        this.estudantes_resolver[i].faltas = 0;
                                    }
                                }
                            });
                    });
            },
            getStreams() {
                axios.get(my_base_url + 'get_turmas?id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmas = response.data.turmas;

                        // Filling students initially
                        this.value_turmas.id_regime = this.turmas[0].id_regime;
                        this.value_turmas.id_disciplina_curso = this.turmas[0].id_disciplina_curso;
                        this.value_turmas.id_curso = this.turmas[0].id_curso;
                        axios.get(my_base_url + 'get_estudantes?id_disciplina_curso=' + this.value_turmas.id_disciplina_curso + '&id_regime=' + this.value_turmas.id_regime + '&ano=' + this.ano)
                            .then(response => {
                                this.estudantes = response.data.estudantes;
                                this.estudantes_resolver = response.data.estudantes;
                            });
                    });
            },
            getValueOfTurma: function () {
                let selected = $('select[name=turmas]').val().split('-');

                this.value_turmas.id_regime = selected[0];
                this.value_turmas.id_disciplina_curso = selected[1];
                this.value_turmas.id_curso = selected[2];
                this.getStudents();
                this.getCargaHorariaReduzida();
            }
            ,
            getTurmasEstatisticas() {
                axios.get(my_base_url + 'get_turmas_estatisticas?id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmas_estatisticas = response.data.turmas_estatisticas;
                    });
            },
            groupedChart() {
                const newData = this.series[0].data.map(() => {
                    return {name: 'Teorica', data: [10, 8]},
                        {name: 'Pratica', data: [16, 3]}
                });

                const array = [{name: 'Teorica', data: [10, 8]}, {name: 'Pratica', data: [16, 3]}];
                let newData2 = this.series.map((e, i) => {
                    let temp = array.find(element => element.name === e.id)
                    if (temp.array) {
                        e.array = temp.array
                    }
                    return e;
                });

                const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

                // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
                this.chartOptions = {
                    colors: [colors[Math.floor(Math.random() * colors.length)]]
                };
                // In the same way, update the series option
                this.series = [{
                    data: newData2
                }]
            }
            ,
            geral() {
                let id_alocacao = $('select[name=turmas_geral]').val().split('-')[3];

                axios.get(my_base_url + 'get_nr_estudantes?id_alocacao=' + id_alocacao)
                    .then(response => {
                        this.nr_estudantes = response.data.nr_estudantes[0].nr_estudantes;
                    });

                axios.get(my_base_url + 'get_nr_excluidos?id_alocacao=' + id_alocacao)
                    .then(response => {
                        this.nr_excluidos = response.data.nr_excluidos[0].nr_excluidos;
                    });
            }
            ,
            geralGenero() {
                let id_alocacao = $('select[name=turmas_geral]').val().split('-')[3],
                    genero = this.genero[0];

                axios.get(my_base_url + 'get_nr_genero?id_alocacao=' + id_alocacao + '&genero=' + genero)
                    .then(response => {
                        this.nr_genero = response.data.nr_genero[0].nr_genero;
                    });

                axios.get(my_base_url + 'get_nr_excluidos_por_genero?id_alocacao=' + id_alocacao + '&genero=' + genero)
                    .then(response => {
                        this.nr_excluidos_por_genero = response.data.nr_excluidos_por_genero[0].nr_excluidos_por_genero;
                    });
            }
            ,
            geralFaixa() {
                let id_alocacao = $('select[name=turmas_geral]').val().split('-')[3],
                    minimo = $('select[name=faixa]').val().split('-')[0],
                    maximo = $('select[name=faixa]').val().split('-')[1];

                axios.get(my_base_url + 'get_nr_excluidos_faixa?id_alocacao=' + id_alocacao + '&minimo=' + minimo + '&maximo=' + maximo)
                    .then(response => {
                        this.nr_excluidos_faixa = response.data.nr_excluidos_faixa[0].nr_excluidos_faixa;
                    });

                axios.get(my_base_url + 'get_nr_faixa?id_alocacao=' + id_alocacao + '&minimo=' + minimo + '&maximo=' + maximo)
                    .then(response => {
                        this.nr_faixa = response.data.nr_faixa[0].nr_faixa;
                    });
            }
            ,
            getMasc() {
                this.genero = ['M', 'Homens'];
                this.geralGenero();
            }
            ,
            getFem() {
                this.genero = ['F', 'Mulheres'];
                this.geralGenero();
            }
            ,
            doughnutChartFaltas() {
                let id_alocacao = $('select[name=turmas]').val().split('-')[3],
                    id_inscricao = this.id_inscricao;
                axios.get(my_base_url + 'doughnut_chart_faltas?id_alocacao=' + id_alocacao + '&id_inscricao=' + id_inscricao)
                    .then(response => {
                        this.doughnut_chart_faltas = response.data.doughnut_chart_faltas[0];
                    });
            }
            ,
            excluirEstudante() {
                axios.post(my_base_url + 'excluir_estudante', {
                    'id_inscricao': this.id_inscricao
                }).then(response => {
                    this.hideModal();
                    Vue.$toast.open({
                        message: 'Estudante excluido com sucesso!',
                        type: 'success',
                        position: 'top',
                        duration: 3000,
                        queue: false,
                        dismissible: true
                    });
                    this.getStudents();
                });
            }
            ,
            getCargaHorariaReduzida() {
                let id_alocacao = $('select[name=turmas]').val().split('-')[3];
                axios.get(my_base_url + 'get_carga_horaria_reduzida?id_alocacao=' + id_alocacao)
                    .then(response => {
                        this.carga_horaria_reduzida = response.data.carga_horaria_reduzida[0].carga_horaria;
                    });
            }
            ,
            showModal() {
                $('#modal').modal('show');
            }
            ,
            hideModal() {
                $('#modal').modal('hide');
            }
        },
        beforeMount() {
            if (localStorage.getItem('user_id') === 'null') {
                this.$router.push('/');
            }
            this.getStreams();
            this.getTurmasEstatisticas();
        }
    }
</script>

<style scoped>
    .content {
        margin: 2% 1% 2% 18%;
        padding-left: 1%;
    }

    .main-visao-estudante, .visao-turmas, .visao-aulas, .visao-geral {
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

    .dados-numericos {
        display: flex;
        justify-content: space-between;
    }

    #modal {
        display: none;
    }

    /*.div-image, .div-nome, .div-perc {*/
    /*    display: inline-block;*/
    /*}*/
</style>