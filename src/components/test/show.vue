<template>
    <div>
        <input type="text" v-model="msg" @input="addNum">
    </div>
</template>

<script>
import { eventBus } from './eventBus'
export default {
    data () {
        return {
            msg:''
        }
    },
    computed: {},
    watch: {},
    methods: {
        addNum(){
            eventBus.$emit('addnum',this.msg)
        }
    },
    beforeCreate () {
    },
    created () {
    },
    beforeDestroy () {
    },
}
</script> 
<style lang='scss' scoped>

</style>
