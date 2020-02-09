<template>
    <BaseLayout>
        <FormEstatisticas slot="main-content"></FormEstatisticas>
    </BaseLayout>
</template>

<script>
    import BaseLayout from "./BaseLayout";
    import FormEstatisticas from "../forms/FormEstatisticas";
    export default {
        name: "Estatisticas",
        components: {FormEstatisticas, BaseLayout}
    }
</script>

<style scoped>
    * {
        background-color: #eef5f9;
        height: 100%;
    }
</style>