<template>
    <a
        id="social-button"
        :href="url"
        target="_blank"
    >
        <i :class="icon"></i>
    </a>
</template>

<script>
    export default {
        data: () => {
            return {}
        },
        props: {
            icon: String,
            url: String
        }
    }
</script>
