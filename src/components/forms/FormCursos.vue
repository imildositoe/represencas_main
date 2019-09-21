<template>
    <div id="content">
        <h3 class="text-left">Cursos Alocados Neste Semestre</h3>

        <div class="cards">
            <card color="info-color" class="text-center col-lg-3 card">
                <card-body>
                    <h4>Informatica</h4>
                    <h6>2º Ano</h6>
                </card-body>
            </card>

            <card color="brown" class="text-center col-lg-3" id="card-add">
                <card-body>
                    <h1><i class="fa fa-folder-plus"></i></h1>
                </card-body>
            </card>
        </div>


        <!--Modal-->
        <btn color="primary" @click.native="showModal16 = true">Open modal</btn>
        <modal v-if="showModal16" @close="showModal16 = false">
            <modal-header>
                <modal-title>New message</modal-title>
            </modal-header>
            <modal-body>
<!--                <md-input type="text" :label="mailAddress"/>-->
                <md-textarea label="Message"/>
            </modal-body>
            <modal-footer>
                <btn color="secondary" @click.native="showModal16 = false">Close</btn>
                <btn color="primary">Send message</btn>
            </modal-footer>
        </modal>

    </div>
</template>

<script>
    import {Card, CardBody, Btn, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, MdTextarea} from 'mdbvue';
    export default {
        name: "FormCursos",
        components: {Card, CardBody, Btn, ModalTitle, ModalFooter, ModalBody, ModalHeader, Modal, MdTextarea},
        data() {
            return {
                showModal16: false,
            }
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
        background-color: #ccc8ff!important;
    }

    .card {
        cursor: pointer;
    }
</style>