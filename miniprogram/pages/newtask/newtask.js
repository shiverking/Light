// miniprogram/pages/newtask/newtask.js
Component({
  data: {
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png'
    }
  },
  methods:{
    onClickLeft() {
      wx.showToast({ title: '点击返回', icon: 'none' });
    },
    showdialog: function () {
      this.setData({
        show: true
      })
    },
    onInput(event) {
      this.setData({
        currentDate: event.detail
      });
    },
    onClose() {
      this.setData({ close: false });
    }, 
    getUserInfo(event) {
      console.log(event.detail);
    },
    onChange(event) {
      this.setData({ active: event.detail });
    },
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  }
});