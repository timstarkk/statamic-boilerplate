<template>
    <p>Hello from Home.vue</p>
</template>

<script>
export default {
    // data() {
    //   return {
    //     string: "",
    //   }
    // },
    
    props: {
        items: {
            type: Array,
            default: null
        }
    },
    mounted: function () {

        console.log(this);
    },

    // methods: {
    // }
}
</script>

<style scoped lang="scss">
    
</style>