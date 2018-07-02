function netRequest(url, method, params, suc) {
    wx.showLoading({
        title: '加载中',
    })
    wx.request({
        url: url,
        data: params,
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
			wx.hideLoading()
            if (res.data.flag == '1') {
                suc(res.data)
            } else {
                wx.showToast(res.data.message)
            }
        },
        fail: function (res) {
            wx.hideLoading()
            wx.showToast(res.data.message)
        }
    })
}

const getRequest = (url, params, suc) => {
    netRequest(getApp().globalData.url + url, 'GET', params, suc)
}

const postRequest = (url, params, suc) => {
    netRequest(getApp().globalData.url + url, 'POST', params, suc)
}

module.exports = {
    getRequest: getRequest,
    postRequest: postRequest
}