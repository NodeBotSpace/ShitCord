// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // import styles
    css: [],
    // enable takeover mode
    typescript: { shim: false },
    build: {},
    modules: [
        // pinia
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    ssr: false,
    app: {
        head: {
            title: "Ахухеть",
            // titleTemplate: "%s | AniShip",
            link: [
            ],
            meta: []
        },
    },
});