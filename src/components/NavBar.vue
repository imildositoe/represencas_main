<template>
    <container id="nav-container">
        <!--Navbar-->
        <navbar id="fixed-nav" position="top" dark style="background-color: #ffffff;margin-left: 18.5%"
                class="col-lg-10" scrolling>
            <navbar-collapse>
                <navbar-nav>
                    <i class="fa fa-align-justify fa-large" style="margin-left: -1800%"/>
                </navbar-nav>

                <navbar-nav right>
                    <dropdown tag="li" class="nav-item">
                        <dropdown-toggle slot="toggle" tag="a" navLink waves-fixed><span style="color: #688696;"
                                                                                         @click="showModal"><i
                                class="fas fa-user"/>&nbsp;&nbsp;{{ user_name }} </span>
                        </dropdown-toggle>
                    </dropdown>
                </navbar-nav>
            </navbar-collapse>
        </navbar>

        <!--Modal-->
        <modal size="md" id="modalUser">
            <modal-header>
                <modal-title>Dados do Utilizador</modal-title>
            </modal-header>
            <modal-body>
                <section>
                    <div class="text-left">
                        <h6 class="font-weight-bold" style="font-size: 10pt">Nome</h6>
                        <h6 style="font-size: 10pt">{{ user_name }}</h6>
                        <hr>
                        <h6 class="font-weight-bold" style="font-size: 10pt">Email</h6>
                        <h6 style="font-size: 10pt">{{ user_email }}</h6>
                    </div>
                </section>
            </modal-body>
            <modal-footer>
                <btn outline="default" darkWaves id="btn-cancel" @click="modalActions" class="btn-sm">Cancelar</btn>
                <btn id="btn-sair" class="btn-sm" color="danger" @click="logout">Sair do Sistema</btn>
            </modal-footer>
        </modal>
    </container>
</template>

<script>
    import {
        Navbar,
        NavbarItem,
        NavbarNav,
        NavbarCollapse,
        Container,
        Btn,
        Dropdown,
        DropdownItem,
        DropdownMenu,
        DropdownToggle,
        mdbNavbarBrand,
        Modal,
        ModalHeader,
        ModalTitle,
        ModalBody,
        ModalFooter
    } from 'mdbvue';

    export default {
        name: 'NavbarPage',
        components: {
            Navbar,
            NavbarItem,
            NavbarNav,
            Btn,
            NavbarCollapse,
            Container,
            Dropdown,
            DropdownItem,
            DropdownMenu,
            DropdownToggle,
            mdbNavbarBrand,
            Modal,
            ModalHeader,
            ModalTitle,
            ModalBody,
            ModalFooter
        },
        data() {
            return {
                user_name: window.localStorage.getItem('user_name'),
                user_email: window.localStorage.getItem('user_email')
            }
        },
        methods: {
            logout() {
                $('#modalUser').modal('hide');
                this.$router.push('/');
            },
            modalActions() {
                $('#modalUser').modal('hide');
            },
            showModal() {
                $('#modalUser').modal('show');
            }
        }
    }
</script>

<style scoped>

    #fixed-nav {
        /*z-index: 1;*/
        padding-left: 20%;
    }

    #nav-container {
        z-index: 1;
    }

    #modalUser {
        display: none;
    }
</style>
