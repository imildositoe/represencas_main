<template>
    <div id="content">
        <h3 class="text-left">Cursos Alocados Neste Semestre</h3>

        <div class="cards">
            <card v-for="c in cursos" color="info-color" class="text-center col-lg-3 card"
                  @click.native="showModal16 = true" :key="0">
                <card-body>
                    <h4>{{ c.curso }}</h4>
                    <h6>{{ c.nivel }}º Ano</h6>
                </card-body>
            </card>

            <card color="brown" class="text-center col-lg-3" id="card-add" @click.native="showModal16 = true">
                <card-body>
                    <h1><i class="fa fa-folder-plus"/></h1>
                </card-body>
            </card>
        </div>


        <!--Modal-->
        <modal v-if="showModal16" @close="showModal16 = false">
            <modal-header>
                <modal-title>Disciplinas</modal-title>
            </modal-header>
            <modal-body>
                <!--                <md-input type="text" :label="mailAddress"/>-->
                <md-textarea label="Message"/>
            </modal-body>
            <modal-footer>
                <btn color="secondary" @click.native="showModal16 = false">Fechar</btn>
                <btn color="primary">Salvar</btn>
            </modal-footer>
        </modal>

    </div>
</template>

<script>
    import {Card, CardBody, Btn, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, MdTextarea} from 'mdbvue';
    import axios from "axios";
    import {my_base_url} from "../../recycler/global";

    export default {
        name: "FormCursos",
        components: {Card, CardBody, Btn, ModalTitle, ModalFooter, ModalBody, ModalHeader, Modal, MdTextarea},
        data() {
            return {
                showModal16: false,
                cursos: [],
            }
        },
        methods: {
            getCursos() {
                let mes = new Date().getMonth().valueOf() + 1, semestre = '';
                semestre = (mes <= 6) ? 1 : 2;
                axios.get(my_base_url + 'get_cursos?semestre=' + semestre + '&id_docente=' + 1)
                    .then(response => {
                        this.cursos = response.data.cursos;
                    });
            }
        },
        beforeMount() {
            if (localStorage.getItem('user_id') === 'null') {
                this.$router.push('/');
            }
            this.getCursos();
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
        margin-top: 2%;
    }

    #card-add {
        margin-left: 2%;
        background-color: #ccc8ff !important;
    }

    .card {
        cursor: pointer;
    }
</style>