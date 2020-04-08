const app = getApp();
const db = wx.cloud.database();
var bar = null;
Component({
  data: {
    percentage:0,//百分比
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
    bardata:[
      {
        tag:"我的",
        value: 1,    
      },
      {
        tag:"生活",
        value: 2,    
      },
      {
        tag:"运动",
        value: 1,    
      },
      {
        tag:"学习",
        value: 4,    
      }
    ],
  },
  attached: function() {
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
    navigateToTimeline: function () {
      wx.navigateTo({
        url: '../me/timeline/timeline'
      })
    },
    setting:function(){
      wx.showToast({
        title: '正在开发中！',
        image: '/images/onprogramming.png',
      })
    },
  },
  pageLifetimes:{
    show() {
      let finished = app.globalData.sum_finished;
      let sum = app.globalData.gftem.length + app.globalData.gtem.length;
      var tmp_percentage = finished / sum
      tmp_percentage = tmp_percentage.toFixed(3);
      tmp_percentage *=100;
      //console.log(tmp_percentage);
      this.setData({
        ongoing_number: app.globalData.gtem.length,
        finished: app.globalData.sum_finished,
        insisted:app.globalData.sum_insisted,
        'bardata[0].value': app.globalData.tag1,
        'bardata[1].value': app.globalData.tag2,
        'bardata[2].value': app.globalData.tag3,
        'bardata[3].value': app.globalData.tag4,
         percentage:tmp_percentage
      })
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
      // 组件生命周期函数，在组件实例进入页面节点树时执行。
      var id = "runCanvas"
      var c = this.data.percentage
      const ctx2 = wx.createCanvasContext(id);
      wx.createSelectorQuery().select('#' + id).boundingClientRect(function (rect) { //监听canvas的宽高
        var w = parseInt(rect.width / 2); //获取canvas宽的的一半
        var h = parseInt(rect.height / 2); //获取canvas高的一半
        let that = this;
        var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
        //圆环的绘制
        ctx2.arc(w, h, w - 8, -0.5 * Math.PI, num); //绘制的动作
        ctx2.setStrokeStyle("#1E90FF"); //圆环线条的颜色
        ctx2.setLineWidth("16");	//圆环的粗细
        ctx2.setLineCap("butt");	//圆环结束断点的样式  butt为平直边缘 round为圆形线帽  square为正方形线帽
        ctx2.stroke();
        //开始绘制百分比数字
        ctx2.beginPath();
        ctx2.setFontSize(40); // 字体大小 注意不要加引号
        ctx2.setFillStyle("#00BFFF");	 // 字体颜色
        ctx2.setTextAlign("center");	 // 字体位置
        ctx2.setTextBaseline("middle");	 // 字体对齐方式
        ctx2.fillText(c + "%", w, h);	 // 文字内容和文字坐标
        ctx2.draw();
      }).exec();

      let Bar = require('../../utils/bar.js');
      bar = new Bar();
      bar.draw({
        renderTo: "tagRateCanvas",
        series: this.data.bardata,
        setCanvasSize: o => this.setData({ ctxHeight: o.height }),
        onTouch: (e) => {
          let serie = e.serie
          this.renderRecords(serie.items)
        }
      })

      this.setData({
        ongoing_number: app.globalData.gtem.length,
        finished: app.globalData.sum_finished,
        insisted:app.globalData.sum_insisted,
      })
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
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
              },
              fail: err => {
                console.error('[数据库] [新增记录] 失败：', err)
              }
            })
          }
        },
        fail: err => {
          // wx.showToast({
          //   icon: 'none',
          //   title: '查询记录失败'
          // })
          //调试用语句
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }    
  }
});