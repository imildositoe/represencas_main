<template>
    <div id="content">
        <h3 class="text-left">Turmas Alocadas Neste Semestre</h3>

        <div class="cards">
            <div class="col-lg-5">
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

                <h5 class="text-right">
                    <btn class="btn-create btn-md" @click="saveTurma">Criar</btn>
                </h5>
            </div>

            <div class="card col-lg-5 card-2">
                <strong style="background-color: #f749a8;color: white;padding: 3% 0 3% 0;">Turmas Criadas</strong><br>
                <tbl>
                    <tbl-body>
                        <tr scope="row" v-for="t in turmas">
                            <td>{{ t.disciplina }} {{ t.ano }} {{ t.regime }}</td>
                        </tr>
                    </tbl-body>
                </tbl>
            </div>
        </div>

    </div>
</template>

<script>
    import {NumericInput, Btn, Card, CardBody, CardTitle, CardText, Tbl, TblBody, TblHead} from 'mdbvue'
    import axios from "axios";

    export default {
        name: "FormTurmas",
        components: {NumericInput, Btn, Card, CardBody, CardTitle, CardText, Tbl, TblBody, TblHead},
        data() {
            return {
                disciplinas: [],
                turmas: [],
                id_docente: 1
            }
        },
        methods: {
            getDisciplinas() {
                let
                    id_nivel = $('select[name=nivel]').val(),
                    id_curso = $('select[name=curso]').val();
                axios.get('http://127.0.0.1:8000/api/get_disciplinas?id_nivel=' + id_nivel + '&id_curso=' + id_curso)
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
                    ano = new Date().getUTCFullYear(),
                    id_disciplina_curso = '';

                //Saving DisciplinaCurso
                axios.post('http://127.0.0.1:8000/api/save_disciplina_curso', {
                    'id_curso': id_curso,
                    'id_disciplina': id_disciplina,
                    'id_nivel': id_nivel
                }).then(response => {
                    console.log('DisciplinaCurso salva com sucesso!');

                    //Yanking the id of the recently added DisciplinaCurso
                    axios.get('http://127.0.0.1:8000/api/get_id_disciplina_curso?id_nivel=' + id_nivel + '&id_disciplina=' + id_disciplina + '&id_curso=' + id_curso)
                        .then(response => {
                            id_disciplina_curso = response.data.id_disciplina_curso[0].id_disciplina_curso;

                            //Saving the Stream (Alocacao)
                            axios.post('http://127.0.0.1:8000/api/save_turma', {
                                'id_disciplina_curso': id_disciplina_curso,
                                'id_regime': id_regime,
                                'id_docente': id_docente,
                                'carga_horaria': carga_horaria,
                                'semestre': semestre,
                                'ano': ano
                            }).then(response => {
                                console.log('Turma salva com sucesso!');
                                this.getStreams();
                            });
                        });
                });
            },
            getStreams() {
                axios.get('http://127.0.0.1:8000/api/get_turmas?id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmas = response.data.turmas;
                    });
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

    .cards {
        display: flex;
        justify-content: space-between;
        margin-top: 5%;
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
</style>