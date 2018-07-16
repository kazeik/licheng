//index.js
//获取应用实例
const app = getApp()
var httpNet = require("../../utils/httputils.js")
Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		cardata: null,
	},

	itemevent: function (event) {
		var pages = getCurrentPages()
		var currentPages = pages[pages.length - 1]
		var lastPages = pages[pages.length - 2]
		console.log(JSON.stringify(event))
		lastPages.setData({ carInfo: event.currentTarget.dataset.item })
		// wx.setStorageSync('car', event.currentTarget.dataset.item)
		this.setCarData(event.currentTarget.dataset.item)
	},
	setCarData: function (info) {
		var params = {
			'nickname':'苏泽',
			'uid': '1213',
			'carbrand': info.carbrand,
			'cartype': info.cartype
		}
		httpNet.httpRequest().setUrl("car/addcar").setParams(params).success(function(res){
			console.log(res)
			wx.showToast({
				title: res.message,
			})
			if (res.flag == "1" && res.data == "1") {
				wx.setStorage({
					key: 'car',
					data: info,
					success: data => {
						wx.navigateBack()
					},
					fail: e => {
						wx.showToast({
							title: '数据添加失败，请重试',
						})
					}
				})
			}
		}).build()
	},
	onLoad: function () {
		this.loadcarsData();

		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	loadcarsData:function(){
		var that = this
		httpNet.httpRequest().setUrl("public/loadcars").success(function(res){
			if(res.flag=='1' && res.data.length != 0){
				that.setData({ cardata: res.data })
			}else{
				wx.showToast({
					title: res.message,
				})
			}
		}).build()
	}
})
