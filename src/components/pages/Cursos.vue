<template>
    <BaseLayout>
        <FormCursos slot="main-content"></FormCursos>
    </BaseLayout>
</template>

<script>
    import BaseLayout from "./BaseLayout";
    import FormCursos from "../forms/FormCursos";
    export default {
        name: "Cursos",
        components: {FormCursos, BaseLayout}
    }
</script>

<style scoped>
    * {
        background-color: #eef5f9;
        height: 100%;
    }
</style>