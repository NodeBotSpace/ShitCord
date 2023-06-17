<template>
    <div>
        <p>{{ item }}</p>
    </div>
</template>
<script setup>
    const props = defineProps({
        ws:{
            type: Object,
            default: null
        }//     >3(
    })
    let div = []
    props.ws.session.onmessage = event => {
        console.log(event.data)
        div.push(event.data)
    }
</script>
<style scoped>
    div {
        position: fixed;
        bottom: 1em;
        right:1em;
        border-radius: 1em;
        display: flex;
        flex-direction: column-reverse;
        width: 28vw;
        height: 28vh;
        padding: 1em;
        align-items: flex-start;
        background-color: #383c41;
        z-index: -1;
    }
    .wsMsg {
        margin: 0.1em;
        border-radius: 0.25em;
        padding: 0.5em;
        background-color: #2b2e32;
    }
</style>