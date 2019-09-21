<template>
    <BaseLayout>
        <FormTurmas slot="main-content"></FormTurmas>
    </BaseLayout>
</template>

<script>
    import BaseLayout from "./BaseLayout";
    import FormTurmas from "../forms/FormTurmas";
    export default {
        name: "Turmas",
        components: {FormTurmas, BaseLayout}
    }
</script>

<style scoped>
    * {
        background-color: #eef5f9;
        height: 100%;
    }
</style>