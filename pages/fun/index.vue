<template>
    <div>
        <label>Select page</label>
        <br />
            <select placeholder="index" name="funpages" v-model="funpage" @change="">
                <option v-for="dir in fun" :value="dir">{{ dir }}</option>
            </select>
            <br />
            <NuxtLink :to="('fun/' + funpage)">Go to selected {{ funpage }}</NuxtLink>
    </div>
</template>
<script setup>
let fun = ["phasmocode", "song"]
let funpage = "phasmocode"
</script>