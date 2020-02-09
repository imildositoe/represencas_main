<template>
    <container id="nav-container">
        <!--Navbar-->
        <navbar id="fixed-nav" position="top" dark style="background-color: #ffffff;margin-left: 18.5%" class="col-lg-10" scrolling>
            <navbar-collapse>
                <navbar-nav>
<!--                    <navbar-item href="#" waves-fixed><span style="color: #688696;">Features</span></navbar-item>-->
<!--                    &lt;!&ndash; Dropdown &ndash;&gt;-->
<!--                    <dropdown tag="li" class="nav-item">-->
<!--                        <dropdown-toggle slot="toggle" tag="a" navLink waves-fixed><span style="color: #688696;">Dropdown</span>-->
<!--                        </dropdown-toggle>-->
<!--                        <dropdown-menu>-->
<!--                            <dropdown-item>Action</dropdown-item>-->
<!--                            <dropdown-item>Another action</dropdown-item>-->
<!--                            <dropdown-item>Something else here</dropdown-item>-->
<!--                        </dropdown-menu>-->
<!--                    </dropdown>-->
                    <i class="fa fa-align-justify fa-large" style="margin-left: -1800%"/>
                </navbar-nav>

                <navbar-nav right>
                    <dropdown tag="li" class="nav-item">
                        <dropdown-toggle slot="toggle" tag="a" navLink waves-fixed><span style="color: #688696;"><i
                                class="fas fa-user"/>&nbsp;&nbsp;Ermínio Jasse </span></dropdown-toggle>
                            <!--<dropdown-menu>-->
                            <!--<dropdown-item>Logout</dropdown-item>-->
                            <!--<dropdown-item>Sair</dropdown-item>-->
                            <!--</dropdown-menu>-->
                    </dropdown>
                </navbar-nav>
                    <!-- Search form -->
                    <!--<form>-->
                    <!--<md-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves waves-fixed/>-->
                    <!--</form>-->
            </navbar-collapse>
        </navbar>
        <!--/.Navbar-->
    </container>
</template>

<script>
    import {
        Navbar,
        NavbarItem,
        NavbarNav,
        NavbarCollapse,
        Container,
        Dropdown,
        DropdownItem,
        DropdownMenu,
        DropdownToggle,
        mdbNavbarBrand
    } from 'mdbvue';

    export default {
        name: 'NavbarPage',
        components: {
            Navbar,
            NavbarItem,
            NavbarNav,
            NavbarCollapse,
            Container,
            Dropdown,
            DropdownItem,
            DropdownMenu,
            DropdownToggle,
            mdbNavbarBrand
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #fixed-nav {
        /*z-index: 1;*/
        padding-left: 20%;
    }

    #nav-container {
        z-index: 1;
    }
</style>
