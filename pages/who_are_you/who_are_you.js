// pages/index/who_are_you.js
Page({

  /**
   * Page initial data
   */
  data: {
    selectedRole: '' // 当前选中的角色：'student', 'parent', 'teacher'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

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

  // 选择角色
  selectRole(e) {
    const role = e.currentTarget.dataset.role;
    this.setData({
      selectedRole: role
    });
  },

  // 直接开始聊天
  startDirectChat() {
    wx.navigateTo({
      url: '/pages/random_chat/random_chat',
      fail(err) {
        console.error('导航失败：', err);
        wx.showToast({
          title: '导航失败',
          icon: 'none'
        });
      }
    });
  },

  // 开始咨询
  startConsultation() {
    if (!this.data.selectedRole) {
      wx.showToast({
        title: '请先选择您的角色',
        icon: 'none'
      });
      return;
    }

    // 保存角色选择到全局数据
    const app = getApp();
    if (app.globalData) {
      app.globalData.userRole = this.data.selectedRole;
    }

    // 导航到问题类型选择页面
    wx.navigateTo({
      url: '/pages/problem_type/problem_type',
      success: () => {
        console.log('导航成功：/pages/index/problem_type');
      },
      fail(err) {
        console.error('导航失败：', err);
        wx.showToast({
          title: '导航失败',
          icon: 'none'
        });
      }
    });
  }
})