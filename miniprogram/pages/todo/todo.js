// miniprogram/pages/todo/todo.js
const app = getApp();
Component({
  data: {
    finish_icon: "/images/finish.png",
    normal_icon: "/images/circle.png",
    timeout_icon: "/images/timeout.png",
    openid:"",
    todos: [],
    todo: {
      todoid: "",
      name: "",
      time: ""
    },
    ftodos: [],
    uftodos: [],
    tftodos: [], //日期选定后该日期完成的任务
    tuftodos: [], //选定日期已过期任务集合
    uflength: "",
    length: "",
    tflength: "",
    flength: "",
    tuflength: "", //选定日期已过期任务数量
    id: [],
    show: false,
    today_finished_task: { //今日完成任务情况
      last_day: '', //上一个被记录的日期
      current_day: '', //维护一个日期变量
      today_finished_sum: '', //今日完成任务总数
      if_add: false //是否坚持天数加一
    },
    calendar_day: "", //日历显示的日期，首次打开时今日
    show_calender: false, //设置日历是否显示
    minDate: new Date(2020, 3, 1).getTime(), //日历最小显示范围 
    radio_finish: "0", //未完成的单选框选择
    radio_finished: "0", //已完成的单选框选择
    radio_expired: "0", //已过期的单选框选择

    tag1:0,
    tag2:0,
    tag3:0,
    tag4:0,
    tips_show: false,
  },
  methods: {
    onTips() {
      this.setData({
        tips_show: true,
      })
    },
    //未完成单选框选择
    onChangeFinish(event) {
      if (this.data.radio_finished != 0) {
        this.setData({
          radio_finished: "0",
        });
      }
      if (this.data.radio_expired != 0) {
        this.setData({
          radio_expired: "0",
        });
      }
      if (this.data.radio_finish != 0) {
        this.setData({
          radio_finish: "0",
        });
      }
      //单选框颜色的改变
      this.setData({
        radio_finish: event.detail,
      });
      this.finish(event.target.id);
    },
    //已完成单选框选择
    onChangeFinished(event) {
      if (this.data.radio_finished != 0) {
        this.setData({
          radio_finished: "0",
        });
      }
      if (this.data.radio_expired != 0) {
        this.setData({
          radio_expired: "0",
        });
      }
      if (this.data.radio_finish != 0) {
        this.setData({
          radio_finish: "0",
        });
      }
      //单选框颜色的改变
      this.setData({
        radio_finished: event.detail,
      });
      this.unfinish(event.target.id);
    },
    onChangeExpired(event) {
      if (this.data.radio_finished != 0) {
        this.setData({
          radio_finished: "0",
        });
      }
      if (this.data.radio_expired != 0) {
        this.setData({
          radio_expired: "0",
        });
      }
      if (this.data.radio_finish != 0) {
        this.setData({
          radio_finish: "0",
        });
      }
      //单选框颜色的改变
      this.setData({
        radio_expired: event.detail,
      });
      this.finish(event.target.id);
    },

    //打开日历
    openCalender() {
      this.setData({
        show_calender: true
      });
    },
    onCloseCalender() {
      this.setData({
        show_calender: false
      });
    },
    onClose(event) {
      const {
        position,
        instance
      } = event.detail;
      switch (position) {
        case 'left':
          {
            break;
          }
        case 'cell':
          {
            break;
          }
        case 'right':
          {
            this.deletetodo(event.target.id);
            break;
          }
          break;
      }
    },
    fclose(event) {
      const {
        position,
        instance
      } = event.detail;
      switch (position) {
        case 'left':
          {
            break;
          }
        case 'cell':
          {
            break;
          }
        case 'right':
          {
            this.deletetodo(event.target.id);
            break;
          }
          break;
      }
    },
    finish(tid) {
      wx.cloud.callFunction({
        name: "finishtodobyid",
        data: {
          todoid: tid,
        }
      }).then(res => {
        app.globalData.sum_finished += 1; //完成总数加一
        this.data.today_finished_task.today_finished_sum += 1;
        if (this.data.today_finished_task.if_add == false) { //天数还未加一
          app.globalData.sum_insisted += 1;
          this.data.today_finished_task.if_add = true;
        }
        var array = app.globalData.gtem;
        for (var index in array){
          if(array[index].todoid === tid){
            var temft = array[index].fathertag
            if(temft === "我的"){
              app.globalData.tag1 += 1
            }else if(temft === "生活"){
              app.globalData.tag2 += 1
            }else if(temft === "运动"){
              app.globalData.tag3 +=1
            }else if(temft === "学习"){
              app.globalData.tag4 +=1
            }
          }
        }
        this.init();
      })
    },
    unfinish(tid) {
      wx.cloud.callFunction({
        name: "unfinishtodobyid",
        data: {
          todoid: tid,
        }
      }).then(res => {
        if (app.globalData.sum_finished > 0) {
          app.globalData.sum_finished -= 1; //完成总数减一
        }
        if (this.data.today_finished_task.today_finished_sum > 0) {
          this.data.today_finished_task.today_finished_sum -= 1;
        }
        if (this.data.today_finished_task.today_finished_sum == 0) { //今日任务全部还原
          this.data.today_finished_task.if_add = false; //修改为还未加一
          if (app.globalData.sum_insisted > 0) {
            app.globalData.sum_insisted -= 1;
          }
        };
        var array = app.globalData.gftem;
        for (var index in array) {
          if (array[index].todoid === tid) {
            var temft = array[index].fathertag
            if (temft === "我的") {
              app.globalData.tag1 -= 1
            } else if (temft === "生活") {
              app.globalData.tag2 -= 1
            } else if (temft === "运动") {
              app.globalData.tag3 -= 1
            } else if (temft === "学习") {
              app.globalData.tag4 -= 1
            }
          }
        }
        this.init();
      })
    },
    deletetodo(tid) {
      wx.cloud.callFunction({
        name: "deletetodobyid",
        data: {
          todoid: tid
        }
      }).then(res => {
        wx.showToast({
          title: '删除成功',
        })
        this.init();
      })

    },
    init() {
      var that = this;
      wx.cloud.callFunction({
        name: 'getTodoids',
      }).then(res => {
        var tem = new Array();
        var ftem = new Array();
        var uftem = new Array();
        var todayftem = new Array();
        var todayuftem = new Array();
        for (var i = 0; i < res.result.data.length; i++) {
          that.data.todo = res.result.data[i];
          if (res.result.data[i].isfinished === true) {
            var t = res.result.data[i].time;
            var dateConvert1 = new Date(Date.parse(t));
            var currentData = new Date();
            if (currentData < dateConvert1) {
              tem.push(that.data.todo)
            } else {
              var s = that.data.todo.timestamp;
              var d = new Date();
              d.setTime(s)
              var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
              if (day === that.data.calendar_day) {
                todayuftem.push(that.data.todo)
              }
              uftem.push(that.data.todo)
            }
          } else {
            if (that.data.todo.finishedtime === that.data.calendar_day) {
              todayftem.push(that.data.todo)
            }
            ftem.push(that.data.todo);
          }
        }
        app.globalData.gtem = tem;
        app.globalData.gftem = ftem;
        app.globalData.guftem = uftem;
        that.setData({
          todos: tem,
          length: tem.length,
          uftodos: uftem,
          uflength: uftem.length,
          ftodos: ftem,
          flength: ftem.length,
          tftodos: todayftem,
          tflength: todayftem.length,
          tuftodos: todayuftem,
          tuflength: todayuftem.length,
          openid:that.data.todo._openid
        })
      }).catch(err => {

      })
    },
    todetail(event) { //点击任务单元格进行跳转
      var i = event.target.id
      wx.navigateTo({
        url: '../tododetail/tododetail?todoid=' + event.target.id,
      })
    },
    onConfirmCalender(event) {
      var td = event.detail
      var da = td.getFullYear() + "-" + (td.getMonth() + 1) + "-" + td.getDate()
      this.setData({
        calendar_day: da,
        show_calender: false
      })
      this.init();
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      };
      var today = new Date();
      this.setData({
        current_day: today,
        calendar_day: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(), //设置今日日期
      })
      if (this.data.today_finished_task.current_day > this.data.last_day) {
        this.data.today_finished_task.last_day == this.data.current_day; //更新记录日期
        this.data.today_finished_task.today_finished_sum = 0; //重设为0
        this.this.data.today_finished_task.if_add = false;
      } else {}
      var that = this
      that.init()
      var a = app.globalData.openid;
      a = a.toString
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      db.collection('userlist').where({
        _openid: a
      }).get({
        success: res => {
          that.setData({
            tag1: res.data[0].tag1,
            tag2: res.data[0].tag2,
            tag3: res.data[0].tag3,
            tag4: res.data[0].tag4
          })
          app.globalData.tag1 = that.data.tag1,
          app.globalData.tag2 = that.data.tag2,
          app.globalData.tag3 = that.data.tag3,
          app.globalData.tag4 = that.data.tag4
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
        }
      })
    },
    hide: function() {
      //存储数据
      var a = app.globalData.openid;
      a = a.toString
      wx.cloud.callFunction({
        name:"updateUserTag",
        data:{
          _openid:this.data.openid,
          tag1: app.globalData.tag1,
          tag2: app.globalData.tag2,
          tag3: app.globalData.tag3,
          tag4: app.globalData.tag4,
        }
      })
    }
  }
})