<template>
    <div id="content">
        <h3 class="text-left">Estudantes</h3><br>

        <section class="row">
            <div class="col-md-5">
                <h6 class="text-left">Selecione a Turma</h6>
                <select class="browser-default custom-select" name="turmas" @change="this.getValueOfTurma">
                    <option v-for="t in turmas" :value="t.id_regime+'-'+t.id_disciplina_curso+'-'+t.id_curso ">{{ t.disciplina }} {{ t.ano }} {{ t.regime }}</option>
                </select>
            </div>

            <div class="col-md-3" style="margin-left: 33%;">
                <h6 class="text-left">Primeira Linha da Lista</h6>
                <input type="number" class="form-control" id="first_line">
            </div>
        </section>
        <br><br>
        <div>
            <table class="col-lg-12 tabela">
                <thead style="background-color: #f749a8;color: white;">
                    <tr>
                        <th>Numero do Estudante</th>
                        <th>Apelido</th>
                        <th>Outros Nomes</th>
                        <th>Acção</th>
                    </tr>
                </thead>
                <tbody>
                    <tr scope="row" v-for="e in estudantes" class="linha">
                        <td>{{ e.nr_estudante }}</td>
                        <td>{{ e.apelido }}</td>
                        <td>{{ e.nome }}</td>
                        <td><a href="#" class="action"><i class="fa fa-edit"/>Editar</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" class="action"><i class="fa fa-times-circle"/>Eliminar</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <input type="file" id="excel"/>
        <label for="excel" class="btn-upload">
            <i class="fa fa-file-excel"/>
            Upload .xlsx
        </label>
        <hr>
        <hr>

        <div class="create col-lg-5">
            <br>

            <h6 class="text-left">Numero do Estudante</h6>
            <input type="text" class="form-control" id="nr_estudante"> <br>

            <h6 class="text-left">Apelido</h6>
            <input type="text" class="form-control" id="apelido"> <br>

            <h6 class="text-left">Outros Nomes</h6>
            <input type="text" class="form-control" id="nome"><br>

            <btn class="btn-salvar btn-md" @click="saveStudent">Salvar</btn>
        </div>
    </div>
</template>

<script>
    import {Btn, NumericInput, Tbl, TblBody, TblHead} from 'mdbvue';
    import XLSX from 'xlsx';
    import axios from 'axios'

    export default {
        name: "FormEstudantes",
        components: {Tbl, TblBody, TblHead, Btn, NumericInput},
        data() {
            return {
                value_turmas: {
                    id_regime: '',
                    id_disciplina_curso: '',
                    id_curso: ''
                },
                estudantes: [],
                id_docente: 1,
                turmas: [],
                ano: new Date().getUTCFullYear()
            }
        },
        methods: {
            handleFile(e) {
                let files = e.target.files, f = files[0];
                let reader = new FileReader();
                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, {type: 'array'});

                    //convert from workbook to array of arrays
                    let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    let dataArray = XLSX.utils.sheet_to_json(first_worksheet, {header: 1});

                    //Running into dataArray to persist into database API
                    let first_line = parseInt($('#first_line').val());
                    for (let i = first_line - 1; i < dataArray.length; i++) {
                        let
                            nr_estudante = dataArray[i][0],
                            apelido = dataArray[i][1],
                            nome = dataArray[i][2];

                        //Getting the first name to formule the email
                        let array = nome.split(' '), first;
                        if (array.length > 1) {
                            first = array[0];
                        } else {
                            first = nome;
                        }

                        // Setting the ID values of the streams
                        let selected = $('select[name=turmas]').val().split('-');
                        this.id_regime = selected[0];
                        this.id_disciplina_curso = selected[1];
                        this.id_curso = selected[2];

                        let
                            email = first + '.' + apelido + '@uem.ac.mz',
                            senha = 123,
                            id_curso = this.id_curso;

                        axios.post('http://127.0.0.1:8000/api/save_students', {
                            'apelido': apelido,
                            'nome': nome,
                            'nr_estudante': nr_estudante,
                            'email': email,
                            'senha': senha,
                            'id_curso': id_curso
                        }).then(response => {
                            console.log('Estudante salvo com sucesso!');

                            //yanking the id of the recently added student
                            let id_estudante;
                            axios.get('http://127.0.0.1:8000/api/get_id_estudante?nr_estudante=' + nr_estudante)
                                .then(response => {
                                    id_estudante = response.data.id_estudante[0].id_estudante;

                                    //Saving the enrollment of the recently added student
                                    axios.post('http://127.0.0.1:8000/api/save_enrollments', {
                                        'ano': new Date().getFullYear(),
                                        'id_estudante': id_estudante,
                                        'id_regime': this.id_regime,
                                        'id_disciplina_curso': this.id_disciplina_curso
                                    }).then(response => {
                                        console.log('Inscricao feita com sucesso!');
                                        this.getStudents();
                                    });
                                    // this.getStudents();
                                });
                            // this.getStudents();
                        });
                        // this.getStudents();
                    }
                };
                reader.readAsArrayBuffer(f);
            },
            saveStudentsExcel() {
                document.getElementById('excel').addEventListener('change', this.handleFile, false);
            },
            saveStudent() {
                let
                    apelido = $('#apelido').val(),
                    nome = $('#nome').val(),
                    nr_estudante = $('#nr_estudante').val();

                //Getting the first name to formule the email
                let array = nome.split(' '), first;
                if (array.length > 1) {
                    first = array[0];
                } else {
                    first = nome;
                }

                // Setting the ID values of the streams
                let selected = $('select[name=turmas]').val().split('-');
                this.id_regime = selected[0];
                this.id_disciplina_curso = selected[1];
                this.id_curso = selected[2];

                console.log(selected);
                console.log('this.id_curso: ' +this.id_curso);

                let
                    email = first + '.' + apelido + '@uem.ac.mz',
                    senha = 123,
                    id_curso = this.id_curso;

                console.log('id_curso: ' +this.id_curso);

                axios.post('http://127.0.0.1:8000/api/save_students', {
                    'apelido': apelido,
                    'nome': nome,
                    'nr_estudante': nr_estudante,
                    'email': email,
                    'senha': senha,
                    'id_curso': id_curso
                }).then(response => {
                    console.log('Estudante salvo com sucesso!');

                    //yanking the id of the recently added student
                    let id_estudante;
                    axios.get('http://127.0.0.1:8000/api/get_id_estudante?nr_estudante=' + nr_estudante)
                        .then(response => {
                            id_estudante = response.data.id_estudante[0].id_estudante;

                            //Saving the enrollment of the recently added student
                            axios.post('http://127.0.0.1:8000/api/save_enrollments', {
                                'ano': new Date().getFullYear(),
                                'id_estudante': id_estudante,
                                'id_regime': this.id_regime,
                                'id_disciplina_curso': this.id_disciplina_curso
                            }).then(response => {
                                console.log('Inscricao feita com sucesso!');
                                this.getStudents();
                            });
                            this.getStudents();
                        });
                    this.getStudents();
                });
                this.getStudents();
            },
            getStudents() {
                axios.get('http://127.0.0.1:8000/api/get_estudantes?id_disciplina_curso=' + this.value_turmas.id_disciplina_curso + '&id_regime=' + this.value_turmas.id_regime + '&ano=' + this.ano)
                    .then(response => {
                        this.estudantes = response.data.estudantes;
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
            }
        },
        beforeMount() {
            this.getStreams();
        },
        mounted() {
            this.saveStudentsExcel();
        }
    }
</script>

<style scoped>
    #content {
        margin: 2% 1% auto 18%;
        padding-left: 1%;
    }

    .btn-salvar {
        margin-left: 75%;
    }

    .btn-upload {
        margin-top: 1%;
        margin-left: 85%;
        border-radius: 3px;
    }

    .create {
        margin-top: 5%;
    }

    input[type="file"] {
        display: none;
    }

    label {
        color: #dfffff;
        height: 40px;
        cursor: pointer;
        background-color: #2bbbad;
        padding: 1% 2% 3% 2%;
        margin-right: -2%;
        font-size: small;
    }

    .tabela {
        border: #cfc6c1 1px dotted;
    }

    .linha {
        border-top: rgba(230, 221, 226, 0.77) 1px solid;
    }

    .linha:hover {
        background-color: #e5dae0;
        transition-duration: 0.1s
    }

    .action {
        color: #2c3e50;
    }

    .action:hover {
        text-decoration: underline;
    }
</style>