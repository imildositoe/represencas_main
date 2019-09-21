<template>
    <BaseLayout>
        <FormMarcacao slot="main-content"></FormMarcacao>
    </BaseLayout>
</template>

<script>
    import BaseLayout from "./BaseLayout";
    import FormMarcacao from "../forms/FormMarcacao";
    export default {
        name: "Marcacao",
        components: {FormMarcacao, BaseLayout}
    }
</script>

<style scoped>
    * {
        background-color: #eef5f9;
        height: 100%;
    }
</style>