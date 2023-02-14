<template>
    <div class="index">
        <div class="index_top">
            <swiperDom :swiperList="swiperList" v-if="comType=='swiper'"/>
            <scan v-if="comType=='scan'"></scan>
            <wxScan v-if="comType=='wxScan'"></wxScan>
            <recorder v-if="comType=='recorder'"></recorder>
            <excel v-if="comType=='excel'"></excel>
            <test v-if="comType=='test'"></test>
            <calendar v-if="comType=='calendar'"></calendar>
        </div>
        <div class="index_bottom"></div>
    </div>
</template>
<script>
import test from "../components/test/test.vue";
import scan from "../components/scan/scan.vue";
import swiperDom from "../components/swiper/swiper.vue";
import wxScan from "../components/wxScan/wxScan.vue";
import recorder from "../components/recorder/recorder.vue";
import Excel from '@/components/excel/excel.vue';
import calendar from '@/components/calendar/calendar.vue';
export default {
    components: { swiperDom, scan, wxScan,recorder, Excel, test, calendar },
    data() {
        return {
            swiperList: [
                {
                    name: 111,
                },
                {
                    name: 222,
                },
                {
                    name: 333,
                },
                {
                    name: 444,
                },
                {
                    name: 555,
                },
            ],
            comType: "",
        };
    },
    mounted() {},
    methods: {},
    created() {
        this.comType = this.$route.query.com;
        console.log(this.$route.query);
    },
};
</script>
<style lang='scss' scoped>
.index {
    height: 100%;
    .index_top {
        height: 100%;
    }
}
</style>