const app = getApp();
const db = wx.cloud.database();
Component({
  data: {
    test:2,
    logged: false,
    avatarUrl: '/images/unkown.png',
    userInfo: {},
    show:false,//弹出层是否展示,默认为false
    ongoing_number:'',//进行中任务数量
    finished:'',//完成任务总的数量
    insisted:'',//坚持的总天数
    gradientColor: {//渐变色
      '0%': '#4facfe',
      '100%': '#00f2fe'
    },
    linedata: [
      {
        value: 23,    //数字
        txt: '02-08'  //比如是日期
      },
      {
        value: 24,    //数字
        txt: '02-09'  //比如是日期
      },
      {
        value: 25,    //数字
        txt: '02-10'  //比如是日期
      },
      {
        value: 26,    //数字
        txt: '02-11'  //比如是日期
      }
    ]
  },
  methods:{
    //展示弹出层
    showPopup() {
      this.setData({ show: true });
    },
    //关闭弹出层
    onClosePopup() {
      this.setData({ show: false });
    },
   //对返回按钮的响应
   onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
   },
   //获取用户的信息
   onGetUserInfo: function (e) {
      if (!this.data.logged && e.detail.userInfo) {
        //app.globalData.openid = res.result.openid
        app.globalData.logged = true;
        app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo
        })
      }
    },
    //调用云函数获取openid
    onGetOpenid: function () {
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          //下面这行调试用
          console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.openid = res.result.openid
          // wx.navigateTo({
          //   url: '../userConsole/userConsole',
          // })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          // wx.navigateTo({
          //   url: '../deployFunctions/deployFunctions',
          // })
        }
      })
    },
    //查询数据库
    onQuery: function () {
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('userlist').where({
        _openid: this.data.openid
      }).get({
        success: res => {
          if (res.data.length == 1) {
            console.log('[数据库] [查询记录] 成功: ', res.data.length)
          } else {
            console.log('[数据库] [查询记录] 失败: ', res.data.length)
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          //调试用语句
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    },
    //往数据库里添加一条数据
    onAdd: function () {
      const db = wx.cloud.database()
      db.collection('userlist').add({
        data: {},
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    },
    navigateToFAQ: function(){
      wx.navigateTo({
        url:'../me/FAQ/faq'
      })
    },
    navigateToVersion:function(){
      wx.navigateTo({
        url: '../me/Version/version'
      })
    },
    navigateToTimeline: function () {
      wx.navigateTo({
        url: '../me/timeline/timeline'
      })
    },
  },
  pageLifetimes: {
    show() {
      let Line = require('utils/line.js');
      let line = new Line();
      line.draw({
        renderTo: 'lineCanvas',
        series: this.data.linedata, //data 数据结构见下文
        pagePadding: 12, //页面左右padding的像素值
        setCanvasSize: o => this.setData({ lineCtxHeight: o.height }), 
        onTouch: e => this.setData({ oneDayData: e.serie }) 
      })

      this.setData({
        ongoing_number: app.globalData.gtem.length,
        finished: app.globalData.sum_finished,
        insisted:app.globalData.sum_insisted,
      })
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
      //判断是否登录如果已经登陆就直接获取信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              lang:"zh_CN",
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                })
              }
            })
          }
        }
      })
      // 查询当前用户是否在用户列表中
      db.collection('userlist').where({
        _openid: this.data.openid
      }).get({
        success: res => {
          if (res.data.length == 1) {
            //该用户在数据库中
          } else {
            //该用户不在数据库中，则进行添加
            console.log('[数据库] [查询记录] 失败: ', res.data.length)
            db.collection('userlist').add({
              data: {},
              success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                // wx.showToast({
                //   title: '新增记录成功',
                // })
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
              },
              fail: err => {
                // wx.showToast({
                //   icon: 'none',
                //   title: '新增记录失败'
                // })
                console.error('[数据库] [新增记录] 失败：', err)
              }
            })
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          //调试用语句
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }    
  }
});