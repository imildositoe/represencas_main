<template>
    <div id="content">
        <h3 class="text-left title">Inicio</h3>

        <div class="cards">
            <card class="col-lg-5">
                <card-body class="mdb">
                    <card-title tag="h5">Cursos Activos</card-title>
                    <card-text> <h1>3</h1> </card-text>
                </card-body>
                <card-footer small muted> 2º Semestre 2019 </card-footer>
            </card>

            <card class="col-lg-5" style="margin-left: 2%;">
                <card-body>
                    <card-title tag="h5">Turmas Activas</card-title>
                    <card-text> <h1>4</h1> </card-text>
                </card-body>
                <card-footer small muted> 2º Semestre 2019 </card-footer>
            </card>
        </div>

    </div>
</template>

<script>
    import {Card, CardTitle, CardText, CardFooter, CardBody, CardHeader, CardGroup, Row} from 'mdbvue';

    export default {
        name: "Start",
        components: {
            Card, CardTitle, CardText, CardFooter, CardBody, CardHeader, CardGroup, Row
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
</style>