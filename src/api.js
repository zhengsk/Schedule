
let API = {
    // 0.登录接口
    login: './static/api/login.json',
    // login: 'http://27.154.54.186:7000/mobile/wdwf2/login.action?userName=liuzp&password=&appClientId=10002',

    // 1.项目列表
    projectList: './static/api/projectList.json',
    // projectList: 'http://27.154.54.186:7000/mobile/sch/projectList.action',

    // 2.责任人列表
    chargerList: './static/api/chargerList.json',
    // chargerList: 'http://27.154.54.186:7000/mobile/sch/adminPersonList'

    // 3.任务列表
    taskList: './static/api/taskList.json',
    // http://27.154.54.186:7000/mobile/sch/taskList

    // 4.任务详情
    taskDetails: './static/api/taskDetails.json',
    // http://27.154.54.186:7000/mobile/sch/taskDetails

    // 5.添加汇报
    addReport: './static/api/taskDetails.json',
    // http://27.154.54.186:7000/mobile/sch/taskProgressRpt

    // 6.汇报记录详情
    reportDetails: './static/api/reportDetails.json',
    // http://27.154.54.186:7000/mobile/sch/taskReportHisDetails

    // 7.评价类型下拉
    evaluateType: './static/api/evaluateType.json',
    // http://27.154.54.186:7000/mobile/sch/evaluateTypeList

    // 8.评价结果下拉
    evaluateResult: './static/api/evaluateResult.json',
    // http://27.154.54.186:7000/mobile/sch/evaluateResultList

    // 9.添加评价
    addEvaluate: './static/api/addEvaluate.json',
    // http://27.154.54.186:7000/mobile/sch/taskEvaluate

    // 10.任务评价详情
    evaluateDetails: './static/api/evaluateDetails.json'
    // http://27.154.54.186:7000/mobile/sch/taskEvaluateDetails
}

/*
let API = {
    // 0.登录接口
    // login: './static/api/login.json',
    login: 'http://27.154.54.186:7000/mobile/wdwf2/login.action?userName=liuzp&password=&appClientId=10002',

    // 1.项目列表
    // projectList: './static/api/projectList.json',
    projectList: 'http://27.154.54.186:7000/mobile/sch/projectList.action',

    // 2.责任人列表
    // chargerList: './static/api/chargerList.json',
    chargerList: 'http://27.154.54.186:7000/mobile/sch/adminPersonList',

    // 3.任务列表
    // taskList: './static/api/taskList.json',
    taskList: 'http://27.154.54.186:7000/mobile/sch/taskList',

    // 4.任务详情
    // taskDetails: './static/api/taskDetails.json',
    taskDetails: 'http://27.154.54.186:7000/mobile/sch/taskDetails',

    // 5.添加汇报
    // addReport: './static/api/taskDetails.json',
    addReport: 'http://27.154.54.186:7000/mobile/sch/taskProgressRpt',

    // 6.汇报记录详情
    // reportDetails: './static/api/reportDetails.json',
    reportDetails: 'http://27.154.54.186:7000/mobile/sch/taskReportHisDetails',

    // 7.评价类型下拉
    // evaluateType: './static/api/evaluateType.json',
    evaluateType: 'http://27.154.54.186:7000/mobile/sch/evaluateTypeList',

    // 8.评价结果下拉
    // evaluateResult: './static/api/evaluateResult.json',
    evaluateResult: 'http://27.154.54.186:7000/mobile/sch/evaluateResultList',

    // 9.添加评价
    // addEvaluate: './static/api/addEvaluate.json',
    addEvaluate: 'http://27.154.54.186:7000/mobile/sch/taskEvaluate',

    // 10.任务评价详情
    // evaluateDetails: './static/api/evaluateDetails.json'
    evaluateDetails: 'http://27.154.54.186:7000/mobile/sch/taskEvaluateDetails'
}
*/

window.API = API

export default API
