/*
let API = {
    // 0.登录接口
    login: '/static/api/login.json',

    // 获取微信签名数据
    WXSign: '../sch/getJsSdkSign.action',

    // 1.项目列表
    projectList: '/static/api/projectList.json',

    // 2.责任人列表
    chargerList: '/static/api/chargerList.json',

    // 3.任务列表
    taskList: '/static/api/taskList.json',

    // 4.任务详情
    taskDetails: '/static/api/taskDetails.json',

    // 5.添加汇报
    addReport: '/static/api/taskDetails.json',

    // 6.汇报记录详情
    reportDetails: '/static/api/reportDetails.json',

    // 7.评价类型下拉
    evaluateType: '/static/api/evaluateType.json',

    // 8.评价结果下拉
    evaluateResult: '/static/api/evaluateResult.json',

    // 9.添加评价
    addEvaluate: '/static/api/addEvaluate.json',

    // 10.任务评价详情
    evaluateDetails: '/static/api/evaluateDetails.json',

    // 12.任务类型
    taskTypeList: '/static/api/taskTypeList.json'
}
*/

let API = {
    // 0.登录接口
    login: 'http://27.154.54.186:7000/mobile/wdwf2/login.action?userName=liuzp&password=&appClientId=10002',

    // 获取微信签名数据
    WXSign: '../sch/getJsSdkSign.action',

    // 1.项目列表
    projectList: '/mobile/sch/projectList.action',

    // 2.责任人列表
    chargerList: '/mobile/sch/adminPersonList',

    // 3.任务列表
    taskList: '/mobile/sch/taskList',

    // 4.任务详情
    taskDetails: '/mobile/sch/taskDetails',

    // 5.添加汇报
    addReport: '/mobile/sch/taskProgressRpt',

    // 6.汇报记录详情
    reportDetails: '/mobile/sch/taskReportHisDetails',

    // 7.评价类型下拉
    evaluateType: '/mobile/sch/evaluateTypeList',

    // 8.评价结果下拉
    evaluateResult: '/mobile/sch/evaluateResultList',

    // 9.添加评价
    addEvaluate: '/mobile/sch/taskEvaluate',

    // 10.任务评价详情
    evaluateDetails: '/mobile/sch/taskEvaluateDetails',

    // 12.任务类型
    taskTypeList: '/mobile/sch/taskTypeList'
}

window.API = API

export default API
