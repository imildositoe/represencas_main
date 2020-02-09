<template>
    <BaseLayout>
        <Start slot="main-content"></Start>
    </BaseLayout>
</template>

<script>
    import Start from "../forms/Start";
    import BaseLayout from "./BaseLayout";

    export default {
        name: "Index",
        components: {BaseLayout, Start}
    }
</script>

<style scoped>
    * {
        background-color: #eef5f9;
        height: 100%;
    }
</style>