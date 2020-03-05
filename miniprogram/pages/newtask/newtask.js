// miniprogram/pages/newtask/newtask.js
Page({
  data: {
    show: true,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({ close: false });
  },
  

  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  }
});