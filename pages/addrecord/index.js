const app = getApp()

const wxutil = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '2016-09-01',
		currentDate:null,
		index: 0,
		oilarray: ['92#汽油', '95#汽油', '97#汽油', '0#柴油', 'E92#乙醇汽油', 'E95#乙醇汽油', 'E97#乙醇汽油']
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(this.formatTimeYMD(new Date()))
		this.setData({
			currentDate: wxutil.formatTime(new Date())
		})
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
	saverecord:function(){

	},
	//输入当前油量
	inputoil:function(text){

	},
	//输入当前油价
	inputoilmoney:function(text){

	},
	//输入当前金额
	inputmoney:function(text){

	},
	bindDateChange:function(date){
		this.setData({
			date: date.detail.value
		})
	},
	formatTimeYMD:function(date){
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		return year + "-" + month + "-" + day
	},
	inputlicheng:function(text){

	},
	oiltypeselect:function(type){

	},
	inputmessage:function(text){

	},
	submitdata:function(formdata){
		console.log("-->  "+JSON.stringify(formdata.detail.value))
	}
})