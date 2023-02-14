<template>
    <div style="color:#fff;" contenteditable="true" @keydown="showInfo" ref="divInput"></div>
</template>

<script>
import { eventBus } from './eventBus'
export default {
    data () {
        return {
            msg:''
        }
    },
    mounted() {
        eventBus.$on("addnum", (msg) => {
            console.log(msg)
            this.msg = msg
        });
    },
    computed: {},
    watch: {},
    methods: {
        showInfo(e){
            console.log('key',e.key,'keycode',e.keyCode)
            if(e.keyCode == 13 || e.keyCode == 32){
                e.preventDefault();
            }
        //     let reg = /\<.[^<>]*\>/
        //     let str = e.target.innerText.replace(reg,'').replace(1,'').replace(reg,'')
        //     this.$refs.divInput.innerHTML = str
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
