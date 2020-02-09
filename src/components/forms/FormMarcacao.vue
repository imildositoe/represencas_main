<template>
    <div id="content">
        <h3 class="text-left">Marcação</h3><br>

        <section>
            <h6 class="text-left">Selecione a Turma</h6>
            <h6 class="text-left">
                <select class="browser-default custom-select col-lg-5" name="turmas" @change="this.getValueOfTurma">
                    <option v-for="t in turmas" :value="t.id_regime+''+t.id_disciplina_curso+''+t.id_curso ">{{
                        t.disciplina }} {{ t.ano }} {{ t.regime }}
                    </option>
                </select>
            </h6>
        </section>
        <br><br>

        <div class="timer-table col-lg-12">
            <div class="start-timer col-lg-4">
                <div class="start container">
                    <h1 class="text-left finger"><i class="fa fa-fingerprint" style="color: #f749a8"/></h1>
                    <div>
                        <h6 class="text-left font-weight-bold">{{date}}</h6>
                        <h6 class="text-left">
                            <btn class="btn-md">Activar Sessão</btn>
                        </h6>
                    </div>
                </div>
                <br><br>
                <div class="timer col-lg-10">
                    <div>
                        <h6 class="text-center"><i class="fa fa-stopwatch"/>&nbsp;<span class="font-weight-bold">Temporizador</span></h6>
                        <h6 class="text-center">
                            00 : 00 : 00
                        </h6>
                    </div>
                </div>
            </div>

            <div class="col-lg-8">
                <table class="tabela col-lg-12">
                    <thead style="background-color: #f749a8;color: white;">
                    <tr>
                        <th>Numero do Estudante</th>
                        <th>Nome</th>
                        <th>Presença</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="linha">
                        <td>20163540</td>
                        <td>Imildo André Sitoe</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>
                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    <tr class="linha">
                        <td>20163541</td>
                        <td>Ramsey Bolton</td>
                        <td><input type="checkbox" class="custom-checkbox"></td>
                    </tr>

                    </tbody>
                </table>
                <br>
                <h6 class="text-right">
                    <btn class="btn-md">Selar Sessão</btn>
                </h6>
            </div>
        </div>


    </div>
</template>

<script>
    import {Btn, Tbl, TblBody, TblHead} from 'mdbvue';
    import axios from "axios";


    export default {
        name: "FormMarcacao",
        components: {Btn, Tbl, TblBody, TblHead},
        data() {
            return {
                date: new Date().getUTCDate() + ' / ' + (new Date().getMonth().valueOf() + 1) + ' / ' + new Date().getUTCFullYear(),
                turmas: [],
                id_docente: 1,
            }
        },
        methods: {
            getStreams() {
                axios.get('http://127.0.0.1:8000/api/get_turmas?id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmas = response.data.turmas;
                    });
            },
            getValueOfTurma: function () {
                let selected = $('select[name=turmas]').val();

                this.value_turmas.id_regime = selected[0];
                this.value_turmas.id_disciplina_curso = selected[1];
                this.value_turmas.id_curso = selected[2];
                this.id_course = selected[2];
            }
        },
        beforeMount() {
            this.getStreams();
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

    .start-timer {

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
    }
</style>