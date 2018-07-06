
const app = getApp()
var wxCharts = require('../../utils/wxcharts.js')
var httpNet = require("../../utils/httputils.js")
var lineCharts = null
var oilLineCharts = null;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		categories: [],		//曲线底部的标签
		l_series_oil: [],	//加油量
		l_series_price: [],	//单价
		cSeriesData: []
	},
	oilTouchHandler: function (e) {
		var index = oilLineCharts.getCurrentDataIndex(e);
		// oilLineCharts.showToolTip(e, {
		// 	format: function (item, category) {
		// 		return category + ' ' + item.name + ':' + item.data
		// 	}
		// });
	},
	touchHandler: function (e) {
		// console.log(lineChart.getCurrentDataIndex(e));
		lineChart.showToolTip(e, {
			// background: '#7cb5ec',
			format: function (item, category) {
				// return category + ' ' + item.name + ':' + item.data
				return item.name + ':' + item.data
			}
		});
	},
	colOil: function () {
		var windowWidth = this.windowWidth();
		var simulationData = this.createSimulationData();
		this.setData({
			categories: simulationData.categories,
			cSeriesData: simulationData.data
		})
		oilLineCharts = new wxCharts({
			canvasId: 'lineOil',
			type: 'column',//column
			categories: this.data.categories,
			animation: true,
			//   background: '#f5f5f5',
			series: [{
				name: '百公里油耗',
				data: this.data.cSeriesData,
				format: function (val, name) {
					return val.toFixed(2) + 'L';
				}
			}],
			xAxis: {
				disableGrid: true
			},
			yAxis: {
				title: '平均油耗趋势 (百公里/升)',
				format: function (val) {
					return val.toFixed(2);
				},
				min: 0
			},
			width: windowWidth,
			height: 180,
			dataLabel: true,
			dataPointShape: true,
			extra: {
				lineStyle: 'curve'
			}
		});
	},
	windowWidth: function () {
		var windowWidth = 320;
		try {
			var res = wx.getSystemInfoSync();
			windowWidth = res.windowWidth;
		} catch (e) {
			console.error('getSystemInfoSync failed!');
		}
		return windowWidth
	},
	oilPriceAndOilValue: function () {
		var windowWidth = this.windowWidth();
		// var simulationData = this.createSimulationData();
		// this.setData({
		// 	categories: simulationData.categories,
		// 	l_series_oil: simulationData.data,
		// 	l_series_price: [2, 4, 6, 3, 6, 4, 9, 6, 2, 5]
		// })
		lineChart = new wxCharts({
			canvasId: 'lineCanvas',
			type: 'line',
			categories: this.data.categories,
			animation: true,
			//   background: '#f5f5f5',
			series: [{
				name: '加油量',
				data: this.data.l_series_oil,
				format: function (val, name) {
					return val + 'L';
				}
			}, {
				name: '每升油价',
				data: this.data.l_series_price,
				format: function (val, name) {
					return val + '元/L';//.toFixed(2)
				}
			}],
			xAxis: {
				disableGrid: false
			},
			yAxis: {
				title: '油量数据',
				format: function (val) {
					return val.toFixed(2);
				},
				min: 0
			},
			width: windowWidth,
			height: 200,
			dataLabel: true,
			dataPointShape: true,
			extra: {
				lineStyle: 'curve'
			}
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// this.oilPriceAndOilValue()
		// this.colOil()
	},

	createSimulationData: function () {
		var categories = [];
		var data = [];
		for (var i = 0; i < 10; i++) {
			categories.push("2018-" + (i + 1));
			data.push(Math.random() * (20 - 10) + 10);
		}
		// data[4] = null;
		return {
			categories: categories,
			data: data
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.getDataByNet()
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

	getDataByNet: function () {
		var that= this
		var params={"uid": "1213"}
		httpNet.httpRequest().setUrl('record/getallrecordbyuser').setParams(params).success(function(res){
			var tempCategories = new Array()
			var oilmass = new Array()
			var oilPrice = new Array()
			for (var index in res.data) {
				var item = res.data[index]
				oilmass.push(item.oilmass)
				oilPrice.push(item.oilmoney)
				tempCategories.push(item.date)
				that.setData({
					categories: tempCategories,
					l_series_oil: oilmass,
					l_series_price: oilPrice
				})
			}

			that.oilPriceAndOilValue()
			that.colOil()
		}).build()
	}
})