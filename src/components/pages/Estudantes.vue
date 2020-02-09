<template>
    <BaseLayout>
        <FormEstudantes slot="main-content"></FormEstudantes>
    </BaseLayout>
</template>

<script>
    import BaseLayout from "./BaseLayout";
    import FormEstudantes from "../forms/FormEstudantes";
    export default {
        name: "Estudantes",
        components: {FormEstudantes, BaseLayout}
    }
</script>

<style scoped>
    * {
        background-color: #eef5f9;
        height: 100%;
    }
</style>