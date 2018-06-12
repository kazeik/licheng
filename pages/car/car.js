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

	itemevent:function(event){
		console.log(event.currentTarget.dataset.item)
	},

	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},


	onLoad: function () {
		var tempData = [
			{ id: 1, itemtitle: 'title1' ,itemicon:'../imgs/icon.jpg'},
			{ id: 2, itemtitle: 'title2' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'}, 
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'},
			{ id: 3, itemtitle: 'title3' ,itemicon:'../imgs/icon.jpg'},
			{ id: 4, itemtitle: '12131231' ,itemicon:'../imgs/icon.jpg'},
			{ id: 5, itemtitle: 'title5' ,itemicon:'../imgs/icon.jpg'}]
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
