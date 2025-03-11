// pages/index/random_chat.js
Page({
  data: {
    messageList: [], // 消息列表
    inputValue: '', // 输入框的值
    scrollToMessage: '', // 要滚动到的消息ID
    isRefreshing: false, // 是否正在刷新
    currentPage: 1, // 当前页码
    pageSize: 20 // 每页消息数量
  },

  onLoad() {
    this.loadMessages();
  },

  // 加载消息
  loadMessages() {
    const { currentPage, pageSize, messageList } = this.data;
    
    // 这里模拟从服务器加载消息
    const newMessages = this.getMockMessages(currentPage, pageSize);
    
    this.setData({
      messageList: [...newMessages, ...messageList],
      isRefreshing: false
    }, () => {
      // 加载完成后滚动到底部
      this.scrollToBottom();
    });
  },

  // 模拟消息数据
  getMockMessages(page, size) {
    const messages = [];
    const startIndex = (page - 1) * size;
    
    for (let i = 0; i < size; i++) {
      const isSelf = Math.random() > 0.5;
      messages.push({
        id: `msg-${startIndex + i}`,
        content: `这是第${startIndex + i + 1}条消息`,
        timeStamp: this.formatTime(new Date()),
        showTimeStamp: i === 0 || Math.random() > 0.7,
        isSelf,
        avatar: isSelf ? '/assets/images/avatar.png' : '/assets/images/other-avatar.png',
        username: isSelf ? '我' : '咨询师',
        status: 'sent'
      });
    }
    
    return messages;
  },

  // 格式化时间
  formatTime(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${minute < 10 ? '0' + minute : minute}`;
  },

  // 输入框内容变化
  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  // 发送消息
  sendMessage(e) {
    const content = e.detail.value || this.data.inputValue;
    if (!content.trim()) return;

    const message = {
      id: `msg-${Date.now()}`,
      content,
      timeStamp: this.formatTime(new Date()),
      showTimeStamp: true,
      isSelf: true,
      avatar: '/assets/images/avatar.png',
      username: '我',
      status: 'sending'
    };

    this.addMessage(message);
    this.setData({ inputValue: '' });

    // 模拟发送延迟
    setTimeout(() => {
      this.updateMessageStatus(message.id, 'sent');
      // 模拟回复
      this.mockReply();
    }, 500);
  },

  // 添加消息到列表
  addMessage(message) {
    const { messageList } = this.data;
    messageList.push(message);
    this.setData({
      messageList,
      scrollToMessage: `msg-${message.id}`
    }, () => {
      // 发送后滚动到底部
      this.scrollToBottom();
    });
  },

  // 更新消息状态
  updateMessageStatus(messageId, status) {
    const { messageList } = this.data;
    const index = messageList.findIndex(msg => msg.id === messageId);
    if (index !== -1) {
      messageList[index].status = status;
      this.setData({ messageList });
    }
  },

  // 模拟回复
  mockReply() {
    setTimeout(() => {
      const replies = [
        '您好，我是您的咨询师，很高兴为您服务。',
        '请详细描述一下您的具体情况。',
        '我理解您的感受，让我们一起探讨解决方案。',
        '这确实是一个值得关注的问题，您可以从以下几个方面考虑...',
        '我建议您可以尝试...',
        '您说得对，还请继续。'
      ];
      const message = {
        id: `msg-${Date.now()}`,
        content: replies[Math.floor(Math.random() * replies.length)],
        timeStamp: this.formatTime(new Date()),
        showTimeStamp: true,
        isSelf: false,
        avatar: '/assets/images/other-avatar.png',
        username: '咨询师',
        status: 'sent'
      };
      this.addMessage(message);
    }, 1000);
  },

  // 重发消息
  resendMessage(e) {
    const { messageId } = e.currentTarget.dataset;
    this.updateMessageStatus(messageId, 'sending');
    setTimeout(() => {
      this.updateMessageStatus(messageId, 'sent');
      // 模拟回复
      this.mockReply();
    }, 500);
  },

  // 下拉刷新
  onScrollToUpper() {
    if (this.data.isRefreshing) return;
    
    this.setData({
      isRefreshing: true,
      currentPage: this.data.currentPage + 1
    });
    
    this.loadMessages();
  },

  // 滚动到底部
  scrollToBottom() {
    const query = wx.createSelectorQuery();
    query.select('.message-list').boundingClientRect();
    query.select('.chat-container').boundingClientRect();
    query.exec(res => {
      if (res[0] && res[1]) {
        const messageList = res[0];
        const container = res[1];
        const scrollTop = messageList.height - container.height;
        if (scrollTop > 0) {
          wx.pageScrollTo({
            scrollTop: scrollTop,
            duration: 300
          });
        }
      }
    });
  }
});