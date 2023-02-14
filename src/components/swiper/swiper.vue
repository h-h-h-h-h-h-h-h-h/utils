<template>
    <div class="swiper_wrap" style="height: 100%">
        <swiper ref="mySwiper" :options="swiperOptions" style="height:100%;">
            <swiper-slide
                class="swiper_slide"
                v-for="(item, index) in swiperList"
                :key="item + index"
            >
                {{ item.name }}
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
    watch: {
        swiperList: {
            handler(newVal, oldVal) {
                console.log(newVal, oldVal);
            },
            deep: true,
        },
    },
    directives: {
        swiper: directive,
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    name: "pictureCom",
    props: {
        swiperList: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },
    data() {
        return {
            onSongSrc: "",
            audioSrc: "",
            voiceList: [],
            swiperOptions: {
                // 展示第几个
                slidesPerView: 1,
                // 居中展示
                centeredSlides: true,
                // 间距
                spaceBetween: 30,
                // 首位不间断展示
                loop: true,
                // 分页器
                pagination: {
                    el: ".swiper-pagination",
                },
                // Some Swiper option/callback...
            },
        };
    },
    created() {
        console.log("created", this.swiperList);
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper;
        },
    },
};
</script>
<style lang="scss" scoped>
.playStateIMG {
    width: 0.19rem;
    height: 0.16rem;
    position: absolute;
    top: 0.05rem;
    right: 0.05rem;
}
</style>
<style lang="scss">
.swiper-slide {
    text-align: center;
    font-size: 0.18rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 500ms;
    transform: scale(0.8) !important;
    position: relative;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, #00aeff, #62e4ff);
    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    .corrage_State {
        position: absolute;
        top: 0;
        font-size: 0.12rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        padding: 0.12rem 0.3rem;
        border-radius: 0.06rem;
        margin-left: 0.1rem;
        z-index: 9;
    }
    .playBtn {
        width: 0.21rem;
        height: 0.18rem;
        position: absolute;
        bottom: 0.1rem;
        right: 0.1rem;
    }
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
    transform: scale(1) !important;
    opacity: 1 !important;
}
.swiper-pagination-bullet-active {
    background-color: #000;
}
.pswp__counter {
    display: none;
}
</style>
