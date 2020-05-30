<template>
    <div id="content">
        <h3 class="text-left title">Inicio</h3><br>

        <h6 class="text-left semestre col-lg-3">1º Semestre</h6>
        <div class="cards" style="margin-bottom: 5%;">
            <card class="col-lg-4" style="background-color: #46BFBD;color: white;">
                <card-body class="mdb">
                    <card-title tag="h5">Cursos </card-title>
                    <card-text><h1 class="text-white">{{ cursosPrimSemestre }}</h1></card-text>
                </card-body>
                <card-footer small muted> 1º Semestre {{year}}</card-footer>
            </card>

            <card class="col-lg-4" style="margin-left: 6%;background-color: #46BFBD;color: white;">
                <card-body>
                    <card-title tag="h5">Turmas </card-title>
                    <card-text><h1 class="text-white">{{ turmasPrimSemestre }}</h1></card-text>
                </card-body>
                <card-footer small muted> 1º Semestre {{year}}</card-footer>
            </card>
        </div>

        <hr>
        <br>

        <h6 class="text-left semestre col-lg-3">2º Semestre</h6>
        <div class="cards" style="margin-bottom: 5%">
            <card class="col-lg-4" style="background-color: #46BFBD;color: white;">
                <card-body class="mdb">
                    <card-title tag="h5">Cursos </card-title>
                    <card-text><h1 class="text-white">{{ cursosSegSemestre }}</h1></card-text>
                </card-body>
                <card-footer small muted> 2º Semestre {{year}}</card-footer>
            </card>

            <card class="col-lg-4" style="margin-left: 6%;background-color: #46BFBD;color: white;">
                <card-body>
                    <card-title tag="h5">Turmas </card-title>
                    <card-text><h1 class="text-white">{{ turmasSegSemestre }}</h1></card-text>
                </card-body>
                <card-footer small muted> 2º Semestre {{year}}</card-footer>
            </card>
        </div>
    </div>
</template>

<script>
    import {Card, CardTitle, CardText, CardFooter, CardBody, CardHeader, CardGroup, Row} from 'mdbvue';
    import axios from 'axios'
    import {my_base_url} from "../../recycler/global";

    export default {
        name: "Start",
        components: {
            Card, CardTitle, CardText, CardFooter, CardBody, CardHeader, CardGroup, Row
        },
        data: function () {
            return {
                config: {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Accept': 'application/json'
                    }
                },
                cursosPrimSemestre: 0,
                cursosSegSemestre: 0,
                turmasPrimSemestre: 0,
                turmasSegSemestre: 0,
                year: new Date().getUTCFullYear(),
                id_docente: localStorage.getItem('user_id')
            }
        },
        methods: {
            getCountCursosPrimSem() {
                axios.get(my_base_url + 'get_count_cursos?semestre=1&id_docente=' + this.id_docente)
                    .then(response => {
                        this.cursosPrimSemestre = response.data.cursos[0].cursos;
                    });
            },
            getCountCursosSegSem() {
                axios.get(my_base_url + 'get_count_cursos?semestre=2&id_docente=' + this.id_docente)
                    .then(response => {
                        this.cursosSegSemestre = response.data.cursos[0].cursos;
                    });
            },
            getCountTurmasPrimSem() {
                axios.get(my_base_url + 'get_count_turmas?semestre=1&id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmasPrimSemestre = response.data.turmas[0].turmas;
                    });
            },
            getCountTurmasSegSem() {
                axios.get(my_base_url + 'get_count_turmas?semestre=2&id_docente=' + this.id_docente)
                    .then(response => {
                        this.turmasSegSemestre = response.data.turmas[0].turmas;
                    });
            }
        },
        beforeMount() {
            if (localStorage.getItem('user_id') === 'null') {
                this.$router.push('/');
            }
            this.getCountTurmasPrimSem();
            this.getCountTurmasSegSem();
            this.getCountCursosPrimSem();
            this.getCountCursosSegSem();

            const openRoutes = ['/home', '/cursos', '/turmas', '/estudantes', '/marcacao', '/estatisticas', '/arquivo'];
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
        margin-top: 3%;
    }

    .semestre {
        margin-bottom: -2%;
        background-color: #f749a8;
        color: white;
    }
</style>