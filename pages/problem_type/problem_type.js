// pages/index/problem_type.js
Page({
  data: {
    userRole: '', // 用户角色：'student', 'parent', 'teacher'
    selectedType: '', // 当前选中的问题类型
    problemTypes: {
      // 家长问题类型
      parenting: '亲子关系与孩子养育',
      marriage: '夫妻关系',
      
      // 学生问题类型
      relationship: '同学与师生关系',
      study: '学习问题',
      behave: '行为问题',

      // 教师问题类型
      colleague: '同事关系',
      education: '学生教育',
      career: '职业发展',
      
      // 共同问题类型
      mental: '其他情绪与心理问题'
    }
  },

  onLoad: function(options) {
    const { role } = options;
    this.setData({
      userRole: role || 'student'
    });
  },

  // 处理返回按钮点击
  handleBack: function() {
    wx.navigateBack({
      fail: () => {
        wx.showToast({
          title: '返回失败',
          icon: 'none'
        });
      }
    });
  },

  // 选择问题类型
  selectProblem: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: type
    });
  },

  // 开始咨询
  startChat() {
    if (!this.data.selectedType) {
      wx.showToast({
        title: '请选择问题类型',
        icon: 'none'
      });
      return;
    }

    // 将选择的问题类型保存到全局数据
    const app = getApp();
    app.globalData.selectedProblemType = {
      type: this.data.selectedType,
      name: this.data.problemTypes[this.data.selectedType]
    };

    // 导航到随机聊天页面
    wx.navigateTo({
      url: '/pages/random_chat/random_chat',
      fail: () => {
        wx.showToast({
          title: '导航失败',
          icon: 'none'
        });
      }
    });
  },

  // 下一步
  handleNext: function() {
    if (!this.data.selectedType) {
      wx.showToast({
        title: '请选择问题类型',
        icon: 'none'
      });
      return;
    }
    
    // 跳转到用户问题输入页面，传递用户角色和问题类型
    wx.navigateTo({
      url: `../user_question/user_question?role=${this.data.userRole}&type=${this.data.selectedType}`
    });
  },

  // 导航到知识页面
  goToKnowledge: function() {
    const { userRole } = this.data;
    let url = '../student_knowledge/student_knowledge';
    
    if (userRole === 'parent') {
      url = '../parents_knowledge/parents_knowledge';
    } else if (userRole === 'teacher') {
      url = '../teacher_knowledge/teacher_knowledge';
    }
    
    wx.navigateTo({ url });
  }
});