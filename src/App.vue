<template>
    <div id="app">
        <!-- <Aside /> -->
		<router-view></router-view>
    </div>
</template>

<script>
import Aside from "@/components/indexCom/aside.vue";
export default {
    components: { Aside },
    data() {
        return {};
    },
    methods: {
        
    },
    created(){
        this.$apis.getYiYan().then((res)=>{
            if(res.status == 200){
                this.$store.commit("cConfidenceText",res.data)
            }
        })
    }
};
</script>

<style lang="scss">
* {
    font-size: 0.16rem;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100vw;
    height: 100vh;
	background-color: #333;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
