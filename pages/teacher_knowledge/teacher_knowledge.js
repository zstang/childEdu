// pages/teacher_knowledge/teacher_knowledge.js
Page({

  /**
   * Page initial data
   */
  data: {
    navBarHeight: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function() {
    // 获取状态栏高度
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight;
    const navBarHeight = statusBarHeight + 44; // 44 is the default navigation bar height
    
    this.setData({
      navBarHeight: navBarHeight
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  /**
   * Back button handler for page navigation
   */
  handleBack: function() {
    wx.navigateBack({
      delta: 1
    });
  }
})