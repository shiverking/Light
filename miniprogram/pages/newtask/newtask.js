// miniprogram/pages/newtask/newtask.js
const db = wx.cloud.database();
Component({
  data: {
    showimage:false,
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
    my_tags:[], //用来存储用户自定义的打卡项目
  },
  methods:{
    navigateToDefined: function () {
      wx.navigateTo({
        url: '../newtask/defined/defined'
      })
    },
    onClickLeft() {
      wx.showToast({
        title:'继续努力！',
        image:'/images/need-efforts1.png',
      })
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
    createNew(event){
      wx.navigateTo({
        url: 'createtodo/createtodo?tag=' + event.target.id,
      })
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      db.collection('tag').where({ //
        _openid: this.data.openid
      }).get({
        success: res => {
          if (res.data.length >= 1) {
            //console.log('[数据库] [查询记录] 成功: ', res.data)
            var temptags = new Array();
            for (var i = 0; i < res.data.length; i++) {
              temptags.push(res.data[i]);//将所有的tagname添加到tags里
            }
            this.setData({
              my_tags: temptags
            })
          }
        },
        fail: err => {
          //调试用语句
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
  }
});