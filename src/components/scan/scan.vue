<template>
    <!-- <div class="v-body" style="background-color:#333;height:100vh;width:100vw;overflow:hidden;display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;">
        <video ref="video" id="video" style="width: 100%;height: 50%;"></video>
        <van-button
            style="position: fixed;
    bottom: 0;"
            v-if="videoInputDevicesArray.length > 0"
            @click="changeCamera"
            block
            type="info"
            >切换摄像头</van-button
        >
    </div> -->
    <div>
        <v-zxing :success="success" showDefaultInput></v-zxing>
        <div style="color:#fff;">
            123456
        </div>
        <!-- <video src=""></video> -->
    </div>
</template>
<script>
import { BrowserMultiFormatReader } from "@zxing/library";
export default {
    name: "VueBarcodeTest",
    methods: {
        success(codeText) {
            alert(codeText)
            console.log(codeText);
        },
    },
    // data: () => ({
    //     codeReader: null,
    //     videoInputDevicesArray: [],
    //     selectedIndex: -1,
    //     textContent: undefined,
    // }),
    // created() {
    //     this.codeReader = new BrowserMultiFormatReader();
    //     console.log(this.codeReader)
    //     setTimeout(() => {
    //         this.init();
    //     }, 500);
    // },
    // destroyed() {
    //     this.codeReader.reset();
    // },
    // methods: {
    //     changeCamera() {
    //         this.selectedIndex = this.selectedIndex + 1;
    //         if (this.selectedIndex >= this.videoInputDevicesArray.length) {
    //             this.selectedIndex = 0;
    //         }
    //         this.decodeFromInputVideo();
    //     },
    //     init() {
    //         this.codeReader
    //             .listVideoInputDevices()
    //             .then((videoInputDevices) => {
    //                 this.videoInputDevicesArray = videoInputDevices;
    //                 this.decodeFromInputVideo();
    //             })
    //             .catch((err) => console.error(err));
    //     },
    //     decodeFromInputVideo() {
    //         if (this.videoInputDevicesArray.length == 0) {
    //             this.textContent = "没有检测到可用的摄像头,即将返回上一页";
    //             console.log(this.textContent);
    //             document.getElementById("video").style.display = "none";
    //             let that = this
    //             setTimeout(()=>{
    //                 that.$router.go(-1)
    //             },2000)
    //             return;
    //         }
    //         if (this.selectedIndex >= this.videoInputDevicesArray.length) {
    //             this.selectedIndex = 0;
    //         }
    //         let selectedDeviceId;
    //         if (this.selectedIndex == -1) {
    //             selectedDeviceId = undefined;
    //         } else {
    //             selectedDeviceId =
    //                 this.videoInputDevicesArray[this.selectedIndex].deviceId;
    //             this.codeReader.reset();
    //         }
    //         this.codeReader.decodeFromInputVideoDeviceContinuously(
    //             selectedDeviceId,
    //             "video",
    //             (result, err) => {
    //                 if (result) {
    //                     alert(result)
    //                     console.log(result);
    //                 }
    //                 if (err && !err) {
    //                     console.error(err);
    //                 }
    //             }
    //         );
    //     },
    // },
};
</script>