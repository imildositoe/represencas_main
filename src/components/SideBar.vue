<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" style="cursor: default;">
            <div class="sidebar-header" onselectstart="return false">
                <h5 style="margin-left: -30%">
                    <img src="../assets/img/represencas_logo_2.png" class="" alt="Logo" style="width: 35px;height: 35px;">&nbsp; Represenças &nbsp;
                </h5>
            </div>

            <ul id="menu" class="list-unstyled components">
                <li class="active" id="inicio">
                    <router-link to="/">
                        <i class="fas fa-home"></i>
                        Início
                    </router-link>
                </li>
<!--                <li id="cursos">-->
<!--                    <router-link to="/cursos">-->
<!--                        <i class="fas fa-briefcase"></i>-->
<!--                        Cursos-->
<!--                    </router-link>-->
<!--                </li>-->
                <li id="turmas">
                    <router-link to="/turmas">
                        <i class="fas fa-pencil-ruler"></i>
                        Turmas
                    </router-link>
                </li>
                <li id="estudantes">
                    <router-link to="/estudantes">
                        <i class="fas fa-user-ninja"></i>
                        Estudantes
                    </router-link>
                </li>
                <li id="marcacao">
                    <router-link to="/marcacao" class="link">
                        <i class="fas fa-fingerprint"></i>
                        Marcação
                    </router-link>
                </li>
                <li id="estatisticas">
                    <router-link to="/estatisticas" class="link">
                        <i class="fas fa-chart-pie"></i>
                        Estatísticas
                    </router-link>
                </li>
                <li id="arquivo">
                    <router-link to="/arquivo" class="link">
                        <i class="fas fa-file-archive"></i>
                        Arquivo
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>


<script>
    export default {
        name: "SideBar", $,
        beforeMount() {
            $(document).ready(function () {

                $('#menu li').on('click', function () {
                    let a = $('#menu li');
                    for (let i = 0; i < a.length; i++) {
                        a[i].removeAttribute('class');
                    }

                    this.setAttribute('class', 'active');
                });
            });
        }
    }

    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });
</script>

<style scoped="">

    @import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

    body {
        font-family: 'Poppins', sans-serif;
    }

    a,
    a:hover,
    a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }

    i,
    span {
        display: inline-block;
    }

    /* ---------------------------------------------------
        SIDEBAR STYLE
    ----------------------------------------------------- */

    .wrapper {
        display: flex;
        align-items: stretch;
    }

    #sidebar {
        min-width: 250px;
        max-width: 250px;
        height: 100%;
        background: #222f3c;
        color: #91a6bb;
        transition: all 0.3s;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 9pt;
    }

    #sidebar.active {
        min-width: 80px;
        max-width: 80px;
        text-align: center;
    }

    #sidebar.active .sidebar-header h3,
    #sidebar.active {
        display: none;
    }

    #sidebar.active .sidebar-header strong {
        display: block;
    }

    #sidebar ul li a {
        text-align: left;
    }

    #sidebar.active ul li a {
        padding: 20px 10px;
        text-align: center;
        font-size: 0.85em;
    }

    #sidebar.active ul li a i {
        margin-right: 0;
        display: block;
        font-size: 1.8em;
        margin-bottom: 5px;
    }

    #sidebar.active ul ul a {
        /*padding: 10px !important;*/
    }

    #sidebar.active .dropdown-toggle::after {
        top: auto;
        bottom: 10px;
        right: 50%;
        -webkit-transform: translateX(50%);
        -ms-transform: translateX(50%);
        transform: translateX(50%);
    }

    #sidebar .sidebar-header {
        padding: 6% 20px 5% 20px;
        background: #1c2732;
    }

    #sidebar .sidebar-header strong {
        display: none;
        font-size: 1.8em;
    }

    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
    }

    #sidebar ul li a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }

    #sidebar ul li a:hover {
        color: #ffffff;
        background: #1c2732;
    }

    #sidebar ul li a i {
        margin-right: 10px;
    }

    .active {
        color: #fff;
        background: #1c2732;
        border-left: solid 3px #ec4f7a;
    }

    a[data-toggle="collapse"] {
        position: relative;
    }

    .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }

    ul ul a {
        font-size: 0.9em !important;
        padding-left: 30px !important;
        background: #1c2732;
    }

    ul {
        padding: 20px;
    }

    ul.CTAs a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
    }

    /* ---------------------------------------------------
        MEDIAQUERIES
    ----------------------------------------------------- */

    @media (max-width: 768px) {
        #sidebar {
            min-width: 80px;
            max-width: 80px;
            text-align: center;
            margin-left: -80px !important;
        }

        .dropdown-toggle::after {
            top: auto;
            bottom: 10px;
            right: 50%;
            -webkit-transform: translateX(50%);
            -ms-transform: translateX(50%);
            transform: translateX(50%);
        }

        #sidebar.active {
            margin-left: 0 !important;
        }

        #sidebar .sidebar-header h3,
        #sidebar {
            display: none;
        }

        #sidebar .sidebar-header strong {
            display: block;
        }

        #sidebar ul li a {
            padding: 20px 10px;
        }

        #sidebar ul li a span {
            font-size: 0.85em;
        }

        #sidebar ul li a i {
            margin-right: 0;
            display: block;
        }

        #sidebar ul ul a {
            padding: 10px !important;
        }

        #sidebar ul li a i {
            font-size: 1.3em;
        }

        #sidebar {
            margin-left: 0;
        }

        #sidebarCollapse span {
            display: none;
        }
    }
</style>