//index.js
//获取应用实例
const app = getApp()
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
		lastPages.setData({ carInfo: event.currentTarget.dataset.item })
		// wx.setStorageSync('car', event.currentTarget.dataset.item)
		this.setCarData(event.currentTarget.dataset.item)
	},
	setCarData: function (info) {
		var longtime = new Date().getTime()
		wx.request({
			url: app.globalData.url + 'car/addcar/',
			data: {
				'uid': '1237' + longtime,
				'carbrand': info.itemtitle,
				'cartype': info.itemtitle
			},
			success: datas => {
				console.log(datas.data)
				wx.showToast({
					title: datas.data.message,
				})
				if (datas.data.flag == "1" && datas.data.data == "1") {
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
			},
			fail: e => {
				console.log(e)
			}
		})
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
		wx.request({
			url: app.globalData.url +'public/loadcars',
			success:d=>{
				if(d.data.flag=='1' && d.data.data.length != 0){
					console.log(d.data.data)
					this.setData({ cardata: d.data.data })
				}else{
					wx.showToast({
						title: d.data.message,
					})
				}
			},
			fail:e=>{

			}
		})
	}
})
