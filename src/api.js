let API = {
    // 登录接口
    login: './static/api/login.json',
    // login: 'http://27.154.54.186:7000/mobile/wdwf2/login.action?userName=liuzp&password=&appClientId=10002',

    // 项目列表
    projectList: './static/api/projectList.json',
    // projectList: 'http://27.154.54.186:7000/mobile/sch/projectList.action',

    // 责任人列表
    chargerList: './static/api/chargerList.json',
    // chargerList: 'http://27.154.54.186:7000/mobile/sch/adminPersonList'

    // 任务列表
    taskList: './static/api/taskList.json',
    // http://27.154.54.186:7000/mobile/sch/taskList

    // 任务详情
    taskDetails: './static/api/taskDetails.json',
    // http://27.154.54.186:7000/mobile/sch/taskDetails

    // 添加汇报
    addReport: './static/api/taskDetails.json',
    // http://27.154.54.186:7000/mobile/sch/taskProgressRpt

    // 评价类型下拉
    evaluateType: './static/api/evaluateType.json',
    // http://27.154.54.186:7000/mobile/sch/evaluateTypeList

    // 评价结果下拉
    evaluateResult: './static/api/evaluateResult.json'
    // http://27.154.54.186:7000/mobile/sch/evaluateResultList
}

window.API = API

export default API
