<template>
    <div class="container box card col-lg-4 col-md-4">
        <form>
            <img src="../assets/img/logo_icon.png" class="img" alt="Logo">
            <p class="h6 text-center mb-4 texto">Represenças</p>
            <div class="grey-text form">
                <input type="email" placeholder="Email" class="form-control" id="email"> <br>
                <input type="password" placeholder="Password" class="form-control" id="senha"><br>
            </div>
            <btn class="col-lg-12 col-md-12 login" @click="this.logon">Entrar</btn>
            <br><br>
            <p>Esqueceu a senha? <a href="#" onclick="alert('As credenciais sao: email institucional e a senha');">Clique aqui</a></p>
        </form>
    </div>
</template>

<script>
    import {Btn, Column} from 'mdbvue';
    import axios from "axios";

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
                    senha = $('#senha').val();

                axios.get("http://127.0.0.1:8000/api/get_docente?email='" + email + "'&senha=" + senha)
                    .then(response => {
                        this.docente = response.data.docente;
                        console.log(this.docente);
                        if (this.docente.length > 0) {
                            this.$router.push('inicio');
                            localStorage.setItem('logged', this.docente);
                        }
                    });
            }
        },
        beforeMount() {
        }
    }
</script>

<style scoped>
    .texto {
        font-size: 10pt;
    }

    .box {
        padding-top: 3%;
        padding-bottom: 4%;
    }

    .form {
        margin-top: 15%;
    }

    .login {
        margin-left: -0.5%;
    }
</style>