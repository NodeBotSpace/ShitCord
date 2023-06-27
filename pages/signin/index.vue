<template>
    <div>
        <h1 v-if="e">Error: {{ err.data }}</h1>
        <div class="register">
            <h3>Register</h3>
            <form method="post" @submit.prevent="submit">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Your username" required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Your password" required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import Wrapper from '~/assets/wrapper/index';
import { useUserStore } from "~/stores/userdata"
const userStore = useUserStore()
let client = null, err = { show:false,data:"Unhandled" }
const e = true
const submit = (event) => {
    if(!client){
        client = new Wrapper({ ip: "ws://26.173.166.125:8080" })
        client.session.onopen = () => {
            client.auth.register(event.srcElement[0].value,event.srcElement[1].value)
        }
        client.session.onclose = (event) => {
            client = null
            err.show = true
            err.data = event.reason
        }
    }else{
        err.show = true
        err.data = "Client already connected!"
    }
}
</script>