<template>
    <div style="height: 100vh;overflow:hidden;background:#fff;" ref="calendarWrap">
        <el-calendar>
            <template slot="dateCell" slot-scope="{ date, data }">
                <div :class="data.isSelected ? 'is-selected' : ''" @click="handleDate(data)">
                    <div>{{ data.day.slice(8, 10) }}</div>
                    <div>{{ lunar2solar(data) }}</div>
                </div>
            </template>
        </el-calendar>
        <div style="background:#fff" class="showCon_wrap">
            <div style="width:0.5rem;display:flex;align-items:start;justify-content: center;">
                <!-- <div style="width:0.2rem;word-wrap: break-word;">天行健&nbsp;君子以自强不息</div> -->
                <div style="width:0.2rem;word-wrap: break-word;" @click='calendarWabei'>
                    现在是
                    <span style="font-size:0.2rem;">
                        {{ dayCon.slice(0, 4) }}
                    </span>
                    |
                    <span style="font-size:0.2rem;">
                        {{ dayCon.slice(5, 7) }}
                    </span>
                    |
                    <span style="font-size:0.2rem;">
                        {{ dayCon.slice(8, 10) }}
                    </span>
                </div>
            </div>
            <div style="width:calc(100% - 1rem)">
                <van-notice-bar style="margin-bottom:0.1rem;" scrollable
                    :text='$store.state.confidenceText.slice(3, $store.state.confidenceText.length).slice(0, $store.state.confidenceText.length - 7)' />
                <div v-for="(item, index) in showData" :key="index" class="showDataDomWrap">
                    <div @click='copyValue' class="showDataDom" v-if="item.num">
                        <span>距离</span>
                        <span style="color:red">{{ item.festival }}</span>
                        <span>还有</span>
                        <span style="color:red">{{ item.num }}</span>
                        <span>天</span>
                    </div>
                    <div class="showDataDom_isFestival" v-else>
                        <span style="color:red" v-if="item.festival == '发工资'">今天发工资啦！嗨起来！！！</span>
                        <span style="color:red" v-else>{{ item.festival }}快乐</span>
                    </div>
                    <el-divider></el-divider>
                </div>
            </div>
            <div style="width:0.5rem;display:flex;align-items:start;justify-content: center;">
                <div style="width:0.2rem;word-wrap: break-word;" v-if="timeCon">
                    <span>还有</span>
                    <span style="font-size:0.2rem;">
                        {{ timeCon?timeCon.slice(0, 2):'' }}时
                    </span>
                    <span style="font-size:0.2rem;">
                        {{ timeCon?timeCon.slice(3, 5):'' }}分
                    </span>
                    <span style="font-size:0.2rem;">
                        {{ timeCon?timeCon.slice(6, 8):'' }}秒下班
                    </span>
                </div>
                <div style="width:0.2rem;word-wrap: break-word;color:red" v-else>
                    不会真有人还在加班吧&nbsp;不会吧&nbsp;不会吧
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let dayjs = require('dayjs')
let calendar = require('../../assets/calendar')
import html2canvas from 'html2canvas'
calendar = calendar.calendar
export default {
    data() {
        return {
            isWabei:false,
            value: new Date(),
            showData: [],
            dayCon: '',
            timeCon: 0,
            dateList: [
                {
                    name: '元旦',
                    date: '1.1',
                    isLunar: false
                },
                {
                    name: '春节',
                    date: '1.1',
                    isLunar: true
                },
                {
                    name: '劳动节',
                    date: '5.1',
                    isLunar: false
                },
                {
                    name: '端午节',
                    date: '5.5',
                    isLunar: true
                },
                {
                    name: '中秋节',
                    date: '8.15',
                    isLunar: true
                },
                {
                    name: '国庆节',
                    date: '10.1',
                    isLunar: false
                },
                {
                    name: '发工资',
                    date: '0.15',
                    isLunar: false
                },
            ],
        }
    },
    computed: {},
    watch: {},
    methods: {
        judge(){
            let copyValue = `现在是
                        {{ dayCon.slice(0, 4) }}:{{ dayCon.slice(5, 7) }}:{{ dayCon.slice(8, 10) }}
                        `
            const input = document.createElement("input");
            document.body.appendChild(input);
            input.setAttribute("value", copyValue);
            input.select();
            if (document.execCommand("copy")) {
                document.execCommand("copy");
                this.$toast("已复制到剪切板");
            }
            document.body.removeChild(input);
        },
        async clipboardImg(url) {
            console.log(url)
                try {
                    const data = await fetch(url);
                    const blob = await data.blob();
                    await navigator.clipboard.write([
                        new window.ClipboardItem({
                        [blob.type]: blob
                        })
                    ]);
                    console.log('复制成功')
                } 
                catch (err) {
                    console.log('复制失败',err,url)
                    let copyValue = url
                    const input = document.createElement("input");
                    document.body.appendChild(input);
                    input.setAttribute("value", copyValue);
                    input.select();
                    if (document.execCommand("copy")) {
                        document.execCommand("copy");
                        this.$toast("已复制到剪切板");
                    }
                    document.body.removeChild(input);
                }
            },
        // 截图
        calendarWabei(){
            let that = this
            this.isWabei = true
            setTimeout(()=>{
                html2canvas(that.$refs.calendarWrap,{}).then((canvasdata) => {
                    canvasdata.toBlob((blob) => { 
                        var canvas = document.createElement('canvas')
                        console.log(blob)
                        let image = new Image()
                        image.setAttribute("crossOrigin", 'Anonymous') //可能会有跨越问题
                        image.src = URL.createObjectURL(blob)
                        image.onload = () => {  // img加载完成事件
                            canvas.width = image.width  //设置画板宽度
                            canvas.height = image.height //设置画板高度
                            canvas.getContext('2d').drawImage(image, 0, 0); //加载img到画板
                            let url = canvas.toDataURL("image/png") // 转换图片为dataURL，格式为png
                            this.clipboardImg(url) // 调用复制方法
                        }
                    })
                })
            },10)
        },
        // 一键复制描述
        copyValue() {
            let arr = document.querySelectorAll('.showDataDom')
            // copyValue = this.$store.state.token
            //     const input = document.createElement("input");
            //     document.body.appendChild(input);
            //     input.setAttribute("value", copyValue);
            //     input.select();
            //     if (document.execCommand("copy")) {
            //         document.execCommand("copy");
            //         this.$toast("已复制到剪切板");
            //     }
            //     document.body.removeChild(input);
        },
        // 农历转公历
        lunar2solar(data) {
            let date = calendar.solar2lunar(data.day.slice(0, 4), data.day.slice(5, 7), data.day.slice(8, 10))
            if (date.festival || date.lunarFestival) {
                return date.festival || date.lunarFestival
            }
            if (date.IDayCn == '初一') {
                return date.IMonthCn
            }
            return date.IDayCn
        },
        // 时间处理
        handleDate(data) {
            console.log(calendar.solar2lunar(data.day.slice(0, 4), data.day.slice(5, 7), data.day.slice(8, 10)))
            this.showData = []
            let date = data.day;//所选日公历
            let ly = date.slice(0, 4) - 0;
            let lm 
            let ld
            this.dateList.forEach((item, index) => {
                let dateStr
                ld = item.date.slice(item.date.indexOf('.') + 1, item.date.length)
                lm = item.date.slice(0, item.date.indexOf('.'))
                if(lm == 0){
                  lm = (date.slice(8, 10) - 0 > ld?data.day.slice(5, 7) - 0 + 1:data.day.slice(5, 7))
                  lm == 13?lm=1:''
                  console.log('lm==============>',lm)
                }
                console.log(lm)
                if (item.isLunar) {
                    dateStr = dayjs(calendar.lunar2solar(ly, lm, ld).date).format('YYYY-MM-DD')
                } else {
                    dateStr = this.formatDate(ly + '-' + lm + '-' + ld)
                    console.log(item.name,dateStr)
                }
                let timeDiff = this.getDiff(dateStr, date)
                if (timeDiff >= 0) {
                    this.pushShowData(item.name, timeDiff)
                } else {
                    if (item.isLunar) {
                        dateStr = dayjs(calendar.lunar2solar(ly + 1, lm, ld).date).format('YYYY-MM-DD')
                    } else {
                        dateStr = this.formatDate(ly + 1 + '-' + lm + '-' + ld)
                    }
                    this.pushShowData(item.name, this.getDiff(dateStr, date))
                }
            });
        },
        // 获取时间差
        getDiff(str1, str2) {
            // 日期1.diff(日期2, 'day') // 差几天
            const date1 = dayjs(str1)
            const date2 = dayjs(str2)
            return date1.diff(date2, 'day')
        },
        // 插入计算结果并排序
        pushShowData(str, num) {
            this.showData.push({
                festival: str,
                num: num
            })
            this.showData = this.showData.sort(this.sortFun)
        },
        // 时间格式补零 转为 'YYYY-MM-DD' 格式
        formatDate(str) {
            // console.log(str)
            return str.split("-")
                .map((item) => {
                    if (item < 10 && item[0] !=0) {
                        return "0" + item;
                    }
                    return item;
                }).join("-");
        },
        // 排序计算方法
        sortFun(a, b) {
            if (a.num > b.num) {
                return 1
            } else if (a.num < b.num) {
                return -1
            } else {
                return 0
            }
        },
        // 计算是否到理想下班时间
        getTimeCon() {
            let num = new Date(dayjs().format('YYYY-MM-DD 18:30:00')).getTime() - new Date()
            num < 0 ? this.timeCon = 0 : this.timeCon = this.formatSeconds(num/1000)
        },
        //秒数转化为时分秒
        formatSeconds(value) {
            var secondTime = parseInt(value);// 秒
            var minuteTime = 0;// 分
            var hourTime = 0;// 小时
            if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
                //获取分钟，除以60取整数，得到整数分钟
                minuteTime = parseInt(secondTime / 60);
                //获取秒数，秒数取余，得到整数秒数
                secondTime = parseInt(secondTime % 60);
                //如果分钟大于60，将分钟转换成小时
                if(minuteTime > 60) {
                    //获取小时，获取分钟除以60，得到整数小时
                    hourTime = parseInt(minuteTime / 60);
                    //获取小时后取余的分，获取分钟除以60取余的分
                    minuteTime = parseInt(minuteTime % 60);
                }
            }
            var result = "" + parseInt(secondTime);

            if(minuteTime > 0) {
            result = "" + parseInt(minuteTime) + "-" + result;
            }
            if(hourTime > 0) {
            result = "" + parseInt(hourTime) + "-" + result;
            }
            return this.formatDate(result);
        }

    },
    created() {
        // this.audioObj = new Audio()
        // let that = this
        // this.audioObj.addEventListener('error',(()=>{
        //     console.log('出错了')
        //     that.audioObj.pause()
        //     this.toNext()
        // }))
        this.dayCon = dayjs().format('YYYY-MM-DD')
        if (new Date().getDay() > 5) {
            this.timeCon = 0
        } else {
            setInterval(()=>{
                this.getTimeCon()
            },1000)
        }
        this.handleDate({
            day: dayjs().format('YYYY-MM-DD')
        })
        this.copyValue()
    },
    // beforeDestroy() {
    //     this.audioObj.pause()
    // }
}
</script> 
<style lang='scss'>
.showCon_wrap {
    width: 100%;
    display: flex;
}

.showDataDom {
    width: 1.9rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span {
        width: 0.4rem;
    }

    span:nth-of-type(2) {
        width: 0.5rem;
    }

    span:nth-of-type(4) {
        width: 0.2rem;
    }
}

.showDataDom_isFestival {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        width: 100%;
    }
}

.el-calendar-day>div>div {
    font-size: 0.12rem;
}

.el-calendar-day>div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
}

.el-calendar-day {
    padding: 0 !important;
    height: 50px !important;
}

.el-divider--horizontal {
    margin: 0.1rem 0 !important;
}
</style>