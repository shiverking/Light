// miniprogram/pages/todo/todo.js
Component({
  data: {
    show: false,
    currentDate:new Date().getTime(),
    currentTime: "",
    minTime:new Date().getTime(),
     formatter(type, value) {
       if (type === 'hour') {
         return `${value}时`;
       } else if (type === 'minute') {
         return `${value}分`;
       }else if(type === 'month'){
         return `${value}月`
       }else if(type === 'day' ){
         return `${value}日`
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
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})