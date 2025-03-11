// pages/user_question/user_question.js
Page({

  /**
   * Page initial data
   */
  data: {
    questionContent: '',
    currentLength: 0,
    userRole: '',
    problemType: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    // 获取上一页传递的参数
    const { role, type } = options;
    this.setData({
      userRole: role,
      problemType: type
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

  handleBack: function() {
    wx.navigateBack();
  },

  handleInput: function(e) {
    const value = e.detail.value;
    this.setData({
      questionContent: value,
      currentLength: value.length
    });
  },

  handleNext: function() {
    if (!this.data.questionContent) {
      wx.showToast({
        title: '请输入您的问题',
        icon: 'none'
      });
      return;
    }

    // 这里可以添加下一步的逻辑，比如跳转到聊天页面
    wx.navigateTo({
      url: `../chat/chat?role=${this.data.userRole}&type=${this.data.problemType}&question=${encodeURIComponent(this.data.questionContent)}`
    });
  }
})