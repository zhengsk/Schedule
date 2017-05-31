/*
let API = {
    // 0.登录接口
    login: './static/api/login.json',
    // login: 'http://27.154.54.186:7000/mobile/wdwf2/login.action?userName=liuzp&password=&appClientId=10002',

    // 获取微信签名数据
    WXSign: '../sch/getJsSdkSign.action',

    // 1.项目列表
    projectList: './static/api/projectList.json',
    // projectList: './projectList.action',

    // 2.责任人列表
    chargerList: './static/api/chargerList.json',
    // chargerList: './adminPersonList'

    // 3.任务列表
    taskList: './static/api/taskList.json',
    // ./taskList

    // 4.任务详情
    taskDetails: './static/api/taskDetails.json',
    // ./taskDetails

    // 5.添加汇报
    addReport: './static/api/taskDetails.json',
    // ./taskProgressRpt

    // 6.汇报记录详情
    reportDetails: './static/api/reportDetails.json',
    // ./taskReportHisDetails

    // 7.评价类型下拉
    evaluateType: './static/api/evaluateType.json',
    // ./evaluateTypeList

    // 8.评价结果下拉
    evaluateResult: './static/api/evaluateResult.json',
    // ./evaluateResultList

    // 9.添加评价
    addEvaluate: './static/api/addEvaluate.json',
    // ./taskEvaluate

    // 10.任务评价详情
    evaluateDetails: './static/api/evaluateDetails.json'
    // ./taskEvaluateDetails
}
*/

let API = {
    // 0.登录接口
    // login: './static/api/login.json',
    login: 'http://27.154.54.186:7000/mobile/wdwf2/login.action?userName=liuzp&password=&appClientId=10002',

    // 获取微信签名数据
    WXSign: '../sch/getJsSdkSign.action',

    // 1.项目列表
    // projectList: './static/api/projectList.json',
    projectList: './projectList.action',

    // 2.责任人列表
    // chargerList: './static/api/chargerList.json',
    chargerList: './adminPersonList',

    // 3.任务列表
    // taskList: './static/api/taskList.json',
    taskList: './taskList',

    // 4.任务详情
    // taskDetails: './static/api/taskDetails.json',
    taskDetails: './taskDetails',

    // 5.添加汇报
    // addReport: './static/api/taskDetails.json',
    addReport: './taskProgressRpt',

    // 6.汇报记录详情
    // reportDetails: './static/api/reportDetails.json',
    reportDetails: './taskReportHisDetails',

    // 7.评价类型下拉
    // evaluateType: './static/api/evaluateType.json',
    evaluateType: './evaluateTypeList',

    // 8.评价结果下拉
    // evaluateResult: './static/api/evaluateResult.json',
    evaluateResult: './evaluateResultList',

    // 9.添加评价
    // addEvaluate: './static/api/addEvaluate.json',
    addEvaluate: './taskEvaluate',

    // 10.任务评价详情
    // evaluateDetails: './static/api/evaluateDetails.json'
    evaluateDetails: './taskEvaluateDetails'
}

window.API = API

export default API
