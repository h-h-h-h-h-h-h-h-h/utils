<template>
    <div
        style="
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        "
    >
        <div class="box_wrap">
            <div
                :class="['box', index == 6 ? 'blueBox' : 'redBox']"
                v-for="(item, index) in 7"
                :key="index"
            >
                {{ resList[index] }}
            </div>
        </div>
        <el-button @click="creatRandom" type="primary">{{
            resList.length ? "再买一张" : "买一张"
        }}</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            numberList: [],
            resList: [],
            timer: null,
        };
    },
    computed: {},
    watch: {},
    methods: {
        creatRandom() {
            (this.resList = []), (this.numberList = []);
            for (let i = 1; i < 34; i++) {
                this.numberList.push(i);
            }
            let that = this;
            this.timer = setInterval(() => {
                let num = Math.floor(
                    Math.random() * this.numberList.length + 1
                );
                if (that.resList.length < 6) {
                    that.resList.push(that.numberList[num-1]);
                    that.numberList.splice(num-1, 1);
                } else if ((that.resList.length = 6)) {
                    that.resList.push(Math.floor(Math.random() * 16 + 1));
                    clearInterval(that.timer);
                }
            }, 300);
        },
    },
    beforeCreate() {},
    created() {},
    beforeDestroy() {},
};
</script> 
<style lang='scss' scoped>
.box_wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.box {
    width: 38px;
    height: 38px;
    line-height: 38px;
    vertical-align: middle;
    font-size: 20px;
    text-align: center;
    border-radius: 50%;
}
.redBox {
    color: #ff4b4b;
    border: 2px solid #ff4b4b;
}
.blueBox {
    color: #33a1ff;
    border: 2px solid #33a1ff;
}
</style>
