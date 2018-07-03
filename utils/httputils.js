// function netRequest(url, method, params, suc) {
//     wx.showLoading({
//         title: '加载中',
//     })
//     console.log("url -> "+url)
//     wx.request({
//         url: url,
//         data: params,
//         method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
//         // header: {}, // 设置请求的 header
//         success: function (res) {
//             wx.hideLoading()
//             console.log(res.data)
//             if (res.data.flag == '1') {
//                 suc(res.data)
//             } else {
//                 wx.showToast({
//                     'title':res.data.message
//                 })
//             }
//         },
//         fail: function (res) {
//             wx.hideLoading()
//             wx.showToast({
//                 'title':res.data.message
//             })
//         }
//     })
// }

function HttpNet(){}

HttpNet.prototype={
    setUrl:function(url){
        this.url = getApp().globalData.url+url;
        return this;
    },
    setMethod:function(method){
        this.method = method.length==0|| method==undefined|| method==null?'get':method;
        return this;
    },
    setParams:function(params){
        this.params = params;
        return this;
    },
    setTitle:function(title){
        this.titile = title;
        return this;
    },
    success:function(func){
        this.success = func;
        return this;
    },
    fail:function(fail){
         this.fail=fail;
         return this;
    },
    build:function(){
        var that = this;
        wx.showLoading({
            title:  that.title == null || that.title== undefined?'加载中':title,
        });
        if(getApp().globalData.debug)
        console.log("当前请求对象 -> "+JSON.stringify(that))
        wx.request({
            url: that.url,
            data: that.params,
            method: that.method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {"Content-Type": "application/x-www-form-urlencoded"}, // 设置请求的 header
            success: function (res) {
                if(getApp().globalData.debug)
                console.log("当前返回数据 -> "+JSON.stringify(res.data));
                wx.hideLoading();
                if (res.data.flag == '1') {
                    that.success(res.data);
                } else {
                    that.fail(res.data.message);
                }
            },
            fail: function (res) {
                wx.hideLoading();
                wx.showToast({
                    'title':res.errMsg
                })
            }
        })
    }
}

function httpRequest(){
    return new HttpNet();
}


// const getRequest = (url, params, suc) => {
//     netRequest(getApp().globalData.url + url, 'GET', params, suc)
// }

// const postRequest = (url, params, suc) => {
//     netRequest(getApp().globalData.url + url, 'POST', params, suc)
// }

module.exports = {
    // getRequest: getRequest,
    // postRequest: postRequest,
    httpRequest :httpRequest
}