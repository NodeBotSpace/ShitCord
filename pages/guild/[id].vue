<template>
    <div>
        <p>{{ id }}</p>
    </div>
</template>
<script setup>
    const route = useRoute();
    const id = route.params.id ?? null;
    console.log(id);
</script>