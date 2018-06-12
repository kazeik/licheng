//index.js
//获取应用实例
const app = getApp()
var timer;
Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		hideAd: false,
		adInfo:"今日油价:92# 7.32元/升，95# 8元/升 0# 6.8元/升 97# 8.5元/升"
	},
	//事件处理函数
	bindViewTap: function () {
		// wx.navigateTo({
		// 	url: '../logs/logs'
		// })
		// console.log(this.data.itemdata)

	},
	onReady: function (ex) {
		this.checkDatadb()
	},
	onLoad: function () {
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
	//检查是否设置过车辆
	checkDatadb: function (dbdata) {
		var car = wx.getStorageSync("car")
		if (!car) {
			wx.showModal({
				title: '提示',
				content: '您当前没有设置车辆，请设置您的爱车',
				success: event => {
					if (event.confirm) {
						wx.navigateTo({
							url: '../car/car',
						})
					}
				}
			})
		} else {
			app.globalData.car = car
		}
	},
	//记录数据
	addrecord: function (data) {
		wx.navigateTo({
			'url':"../addrecord/index"			
		})
	},
	//定时更改广告内容
	changeAdInfo:function(){
		timer = setTimeout(()=>{

		},2000);
	}
})
