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
		wx.setStorageSync('car', event.currentTarget.dataset.item)
		wx.setStorage({
			key: 'car',
			data: event.currentTarget.dataset.item,
			success:data=>{
				wx.navigateBack()
			},
			fail:e=>{
				wx.showToast({
					title: '数据添加失败，请重试',
				})
			}
		})
	},
	onLoad: function () {
		var tempData = [
			{ id: 1, itemtitle: 'title1', itemicon: '../../imgs/icon.jpg' },
			{ id: 2, itemtitle: 'title2', itemicon: '../../imgs/icon.jpg' },
			{ id: 3, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 4, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 5, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 6, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 7, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 8, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 9, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 10, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 11, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 12, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 13, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 14, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 15, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 16, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 17, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 18, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 19, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 20, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 21, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 22, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 23, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 24, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 25, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 26, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 27, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 28, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 29, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 30, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 31, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 32, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' },
			{ id: 33, itemtitle: 'title3', itemicon: '../../imgs/icon.jpg' },
			{ id: 34, itemtitle: '12131231', itemicon: '../../imgs/icon.jpg' },
			{ id: 35, itemtitle: 'title5', itemicon: '../../imgs/icon.jpg' }]
		this.setData({ cardata: tempData })

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
	}
})
