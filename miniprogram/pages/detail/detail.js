// miniprogram/pages/detail/detail.js
Page({

  /**
   * Page initial data
   */
  data: {
    receiver: "朱欣欣",
    dest: "陕西省 西安市",
    carrier: "一米阳光",
    carrierWebsite: "https://yimiex.com",
    orderNumber: "YMYG12175376",
    infoLink: "https://yimiex.com/SelectOrder.aspx?OrderNum=YMYG12175376"
  },

  copyOrderNumber: function() {
    let that = this;
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '请使用浏览器打开物流查询链接',
      success (res) {
        wx.setClipboardData({
          data: that.data.infoLink,
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
      console.log("detail show")
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})