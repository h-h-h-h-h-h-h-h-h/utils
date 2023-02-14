<template>
    <div class="aside_wrap">
        <div class="aside_top">
            <img src="../../assets/icon/search.png" alt="" />
            <input
                type="text"
                placeholder="请输入搜索内容"
                v-model="inputValue"
                :class="[
                    inputValue ? 'aside_top_ipt_act' : '',
                    'aside_top_ipt',
                ]"
            />
        </div>
        <div class="aside_con">
            <div v-for="item in asideList" :key="item.id" @click="toPage(item)" class="aside_con_list">
                <div>{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import asideList from "./asideTab";
export default {
    data() {
        return {
            asideList: "",
            inputValue: "",
        };
    },
    watch:{
        inputValue(n,o){
            this.filterList(n)
        }
    },
    methods: {
        toPage(item) {
            console.log(item)
            this.$router.push(
                {
                    path:'/home',
                    query:{
                        com:item.id
                    }
                }
            );
        },
        filterList(n){
            this.asideList = asideList.filter((item)=>{
                return item.name.indexOf(n)>=0
            })
            console.log(this.asideList)
        }
    },
    created() {
        this.asideList = asideList;
    },
};
</script>
<style lang="scss" scoped>
.aside_wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.1rem;
    box-sizing: border-box;
    .aside_top {
        width: 90%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 00.1rem;
        overflow: hidden;
        background-color: #f8c531;
        img {
            width: 0.3rem;
        }
        .aside_top_ipt {
            width: 80%;
            height: 0.4rem;
            outline: none;
            border: none;
            line-height: 0.4rem;
            padding-top: 0.05rem;
            background-color: #f8c531;
        }
        .aside_top_ipt_act {
            padding-top: 0;
            font-size: 0.2rem;
            color: #666;
            font-weight: bold;
            font-family: cursive;
        }
        ::-ms-input-placeholder {
            font-size: 0.2rem;
            color: #666;
            font-weight: bold;
            font-family: cursive;
        }
        ::-webkit-input-placeholder {
            font-size: 0.2rem;
            color: #666;
            font-weight: bold;
            font-family: cursive;
        }
    }
    .aside_con {
        width: 90%;
        height: calc(100% - 0.6rem);
        padding-top: 00.1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: auto;
        .aside_con_list{
            flex-shrink: 0;
            background-color: #666;
            width: 100%;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 0.1rem;
            border-radius: 00.1rem;
            background-image: url('/src/assets/img/bgimg3.jpg');
            background-position: center bottom;
            background-size: cover;
            background: -webkit-linear-gradient(left top, #ccc, #666);
            /*  Safari 5.1 到 6.0 */
            background: -o-linear-gradient(bottom right, #ccc, #666);
            /*  Opera 11.6 到 12.0 */
            background: -moz-linear-gradient(bottom right, #ccc, #666);
            /*  Fx 3.6 到 15 */
            // background: linear-gradient(to bottom right,#00aeff, #62e4ff);
            background: linear-gradient(to bottom right,#f9a300, #f7e764);
            /* 标准语法（必须是最后一个） */
            div{
                font-family: cursive;
                font-size: 0.3rem;
                font-weight: bolder;
                margin-left: 00.5rem;
            }
        }
    }
}
</style>