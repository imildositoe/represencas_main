<template>
    <BaseLayout>
        <FormArquivo slot="main-content"></FormArquivo>
    </BaseLayout>
</template>

<script>
    import FormArquivo from "../forms/FormArquivo";
    import BaseLayout from "./BaseLayout";
    export default {
        name: "Arquivo",
        components: {BaseLayout, FormArquivo}
    }
</script>

<style scoped>
    * {
        background-color: #eef5f9;
        height: 100%;
    }
</style>