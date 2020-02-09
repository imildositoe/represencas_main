<template>
    <div>
        <div style="display: flex">
            <SideBar></SideBar>

            <div class="col-lg-12 col-md-12">
                <NavBar></NavBar>

                <slot name="main-content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../NavBar";
    import SideBar from "../SideBar";

    export default {
        name: "BaseLayout",
        components: {SideBar, NavBar}
    }
</script>

<style scoped>
</style>