import http from './axios'
export default {
    async download(obj) {
        console.log("inquireSubtask")
        const res = await http(`http://scdn.gongyi.qq.com/quiz/Exam-Template.xlsx`, null, "GET",obj)
        return res
    },
    async getYiYan(obj) {
        console.log("inquireSubtask")
        const res = await http(`https://v.api.aa1.cn/api/yiyan/index.php`, null, "GET",obj)
        return res
    },
}