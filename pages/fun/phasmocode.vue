<template>
    <div>
        <p>Код для фазмоёбани:</p>
        <p style="color:#F00">{{ code }}</p>
    </div>
</template>
<script setup>
    const code="Нет"
</script>
<style scoped>
    p{
        font-size: 100px;
        margin: 0;
        padding-right: 30px;
    }
    div{
        position: fixed;
        display: flex;
        flex-direction: row;
    }
</style>