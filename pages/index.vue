<template>
    <div>
        <div class="links">
        <NuxtLink to="/signin">
            <p>Register</p>
        </NuxtLink>
        <NuxtLink to="/guild/0">
            <p>Пойти нахой</p>
        </NuxtLink>
        </div>
    </div>
</template>
<script setup>
    import {useUserStore} from "~/stores/userdata"
    import wrapper from "~/assets/wrapper/index.js";
    const router = useRouter()

    const userStore = useUserStore()
    if(!userStore.user.ws){
        router.replace("/signin")
    }
</script>
<style scoped>
    .links p{
        color:rgb(142, 242, 255);
        text-decoration: underline;
    }
</style>