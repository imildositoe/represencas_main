<template>
    <div class="container box card col-lg-4 col-md-4">
        <div>
            <img src="../assets/img/represencas_logo_2.png" class="img" alt="Logo" style="width: 18%; height: 18%">
            <p class="h6 text-center mb-4 texto">Represenças</p>
            <div class="grey-text form">
                <input type="email" placeholder="Email Institucional" class="form-control" id="email"> <br>
                <input type="password" placeholder="Senha" class="form-control" id="senha"><br>
            </div>
            <btn class="btn-md col-lg-12 login" @click="this.logon">Entrar</btn>
            <br><br>
            <h6 style="font-size: small">Problema com as credenciais?
                <a href="#" onclick="alert('Use o seu email institucional e a senha correspondente para poder logar no sistema. As credenciais sao as mesmas usadas no SIGA');">
                    Clique aqui
                </a>
            </h6>
        </div>
    </div>
</template>

<script>
    import {Btn, Column} from 'mdbvue';
    import axios from "axios";
    import Vue from "vue";
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-default.css'
    import {my_base_url} from "../recycler/global";

    Vue.use(VueToast);

    export default {
        name: "Login",
        components: {Btn, Column},
        data() {
            return {
                docente: []
            }
        },
        methods: {
            logon() {
                let
                    email = $('#email').val(),
                    password = $('#senha').val().toString();

                axios.get(my_base_url + "get_docente?email='" + email + "'&senha='" + password + "'")
                    .then(response => {
                        this.docente = response.data.docente;

                        if (!(Array.isArray(this.docente) && this.docente.length)) {
                            Vue.$toast.open({
                                message: 'Credenciais Invalidas, Tente Novamente!',
                                type: 'error',
                                position: 'top',
                                duration: 3000,
                                queue: false,
                                dismissible: true
                            });
                        } else {
                            this.$router.push('home');
                            localStorage.setItem('user_id', this.docente[0].id_docente);
                            localStorage.setItem('user_name', this.docente[0].nome);
                            localStorage.setItem('user_email', this.docente[0].email);
                        }
                    });
            }
        },
        beforeMount() {
            localStorage.setItem('user_id', 'null');
            localStorage.setItem('user_name', 'null');
            localStorage.setItem('user_email', 'null');
        }
    }
</script>

<style scoped>
    .texto {
        font-size: 11pt;
        font-weight: bold;
        text-decoration: underline;
    }

    .box {
        padding-top: 3%;
        padding-bottom: 4%;
    }

    .form {
        margin-top: 15%;
    }

    .login {
        margin-left: -0.1%;
    }
</style>