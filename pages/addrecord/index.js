const app = getApp()

const wxutil = require('../../utils/util.js')
const utils = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '',
		currentDate: '',
		index: 0,
		oilarray: [],
		oiltype: ""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			oiltype: this.data.oilarray[this.data.index],
			currentDate: utils.formatTimeYMD(),
			date:utils.formatTimeYMD()
		})
		this.requstOilType()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
	//保存记录
	saverecord: function () {

	},
	//输入当前油量
	inputoil: function (text) {

	},
	//输入当前油价
	inputoilmoney: function (text) {

	},
	//输入当前金额
	inputmoney: function (text) {

	},
	bindDateChange: function (date) {
		this.setData({
			date: date.detail.value
		})
	},

	inputlicheng: function (text) {

	},
	bindPickerChange: function (oiltype) {
		this.setData({
			index: oiltype.detail.value
		})
	},
	inputmessage: function (text) {

	},
	submitdata: function (formdata) {
		wx.request({
			url: app.globalData.url + '/record/addRecord',
			data:{
				'uid':'test',
				'date': formdata.detail.value.date,
				'alllicheng': formdata.detail.value.currentlicheng,
				'oilvalue': formdata.detail.value.oilvalue,
				'currentmoney': formdata.detail.value.currentmoney,
				'allmoney': formdata.detail.value.allmoney,
				'about': formdata.detail.value.about,
				'oiltype': formdata.detail.value.oiltype
			},
			success:d=>{
				wx.showToast({
					title: d.data.message
				})
			},
			fail:e=>{

			}
		})
	},
	requstOilType:function(){
		wx.request({
			url: app.globalData.url +'/public/getoiltype',
			success:d=>{
				var array = new Array()
				for(var index in d.data.data){
					var oilname = d.data.data[index].oilname
					array.push(oilname)	
				}
				this.setData({
					oilarray: array
				})
			},
			fail:e=>{

			}
		})
	}
})