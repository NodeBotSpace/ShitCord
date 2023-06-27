import { defineStore } from "pinia"

export const useUserStore = defineStore("userStore",{
    state:()=>({
        user: {
            username: "TestUser",
            password: "",
            ws: Object
        }
    })
})
