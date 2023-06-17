<template>
    <div>
        <slot />
        <popup :ws=client />
        <rights />
    </div>
</template>
<script setup>
import wrapper from "~/assets/wrapper/index.js";
const client = new wrapper({ nickname: "aboba", ip: "ws://26.173.166.125:8080" });
client.session.onopen = () => {
    client.auth.signin()
    client.message.send("Hello world!")
}
</script>
<style>
@font-face {
    font-family: mc;
    src: local("Minecraft Rus Regular");
}

html {
    font-family: mc;
    background-color: #2C2F33;
    color: #FFFFFF;
}
</style>