<template>
    <div class="main">
        <p>All rights reserved by "KotIsOff"</p>
    </div>
</template>
<script setup>
    const props = defineProps({
    item: {
        type: String,
        default: null
    }
});
</script>
<style scoped>
    .main{
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    }
    p{
        font-size: 1em;
        font-family: mc;
        padding: 0;
        margin: 0.5em;
        color: #373a3e;
    }
</style>