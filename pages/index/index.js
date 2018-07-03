//index.js
//获取应用实例
var utils = require("../../utils/util.js");
var httpNet = require("../../utils/httputils.js")

const app = getApp()

var timer;
Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		hideAd: true,
		adInfo: null,
		carInfoText:'',
		carInfo: {},
		oilValue: "123L",
		moneyValue: "123元",
		pjlc: '',
		ljlc: ''
	},
	//事件处理函数
	bindViewTap: function () {
		// wx.navigateTo({
		// 	url: '../logs/logs'
		// })
		// console.log(this.data.itemdata)

	},

	onShow: function (ex) {
		// this.checkDatadb()

	},

	// onShow:function(){

	// },

	onLoad: function (option) {
		console.log(app.globalData.userInfo)
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
		this.checkDatadb()
		// this.changeAdInfo()
		this.requestAdInfo()
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
			this.setData({
				carInfo: car
			})
			this.requestMainData()
		}
	},
	requestMainData: function () {
		var that = this
		var params = { 'uid': '1213' }
		httpNet.httpRequest().setUrl('user/gethomedata').
		setParams(params).success(function (res) {
			that.setData({
				oilValue: res.data.alloilvalue + "L",
				moneyValue: res.data.allmoney + "元",
				pjlc: res.data.pingjun + "L",
				ljlc: res.data.alllicheng + "公里",
				carInfo: res.data.car,
				carInfoText: res.data.car.carbrand + " "+res.data.car.cartype
			})
		}).fail(function (message) {
			wx.showToast({
				'title': message
			})
		}).build()
	},
	//记录数据
	addrecord: function (data) {
		wx.navigateTo({
			'url': "../addrecord/index"
		})
	},
	//定时更改广告内容
	changeAdInfo: function () {
		timer = setTimeout(() => {
			this.setData({
				adInfo: "今日油价:92# 7.32元/升，95# 8元/升 0# 6.8元/升 97# 8.5元/升",
				hideAd: false
			})
		}, 2000);
	},
	requestAdInfo: function () {
		var that = this
		var params = {"date": utils.formatTimeYMD()}
		httpNet.httpRequest().setUrl('public/getoilprice/').setParams(params).success(function(res){}).build()
	},
	carchoice:function(){
		wx.navigateTo({
			url: '../car/car',
		})
	}
})
