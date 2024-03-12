<template>
    <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(["currentUser"])
    },
    created() {
        if (this.currentUser) {
            this.$store.dispatch('signoutUser')
        }
    }
}
</script>
<style scoped>

</style>