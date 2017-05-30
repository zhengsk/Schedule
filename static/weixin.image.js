var wx = window.wx

window.wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxd11123da30d1131d', // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: data.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
    signature: data.data.signature, // 必填，签名，见附录1
    jsApiList: [
        'openEnterpriseChat',
        'openEnterpriseContact',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'closeWindow'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
})

function selectImg () {
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            addElementImg(localIds[0])
            doUpload(localIds)
        }
    })
}

wx.error(function (res) {
    alert(' 注 册失败：' + res.errMsg)
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
})

wx.ready(function () {

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
})

var imgId
// 上传图片
function doUpload (localIds) {
    wx.uploadImage({
        localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
           imgId = res.serverId // 返回图片的服务器端ID
        }
    })
}

// 下载图片
function doDownload () {
    wx.downloadImage({
        serverId: imgId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            var localId = res.localId // 返回图片下载后的本地ID
            addElementImg(localId)
        }
    })
}

function addElementImg (serverId) {
    var ul = document.getElementById('imgul') // 添加 li
    var li = document.createElement('li') // 添加 img
    var img = document.createElement('img') // 设置 img 属性，如 id
    img.setAttribute('id', 'newImg') // 设置 img 图片地址
    img.src = serverId
    li.appendChild(img)
    ul.appendChild(li)
}

