// miniprogram/pages/todo/todo.js
const app = getApp();
Component({
  data: {

    // finishclock:false,
    previoustime: new Date().getTime(),
    latertime: "",

    finish_icon: "/images/finish.png",
    normal_icon: "/images/circle.png",
    timeout_icon: "/images/timeout.png",
    openid: "",
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
      current_day: '', //维护一个日期变量
      today_finished_sum: 0, //今日完成任务总数
      if_add: false //是否坚持天数加一
    },
    calendar_day: "", //日历显示的日期，首次打开时今日
    show_calender: false, //设置日历是否显示 
    minDate: new Date(2020, 3, 1).getTime(), //日历最小显示范围 
    maxDate: new Date().getTime(), //日历最大显示范围
    radio_finish: "0", //未完成的单选框选择
    radio_finished: "0", //已完成的单选框选择
    radio_expired: "0", //已过期的单选框选择
    sum_finished: 0,
    sum_insisted: 0,
    tag1: 0,
    tag2: 0,
    tag3: 0,
    tag4: 0,
    tips_show: false, //初始不展示tips
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
    onCloseCalender(event) {
      this.setData({
        show_calender: false
      });
    },

    avoidClick() {
      this.data.latertime = new Date().getTime()
      if ((this.data.latertime - this.data.previoustime) < 350) {
        this.data.previoustime = this.data.latertime
        return false;
      } else {
        this.data.previoustime = this.data.latertime
        return true;
      }
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
      if (this.avoidClick() === true) {
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
          var array = app.globalData.gtem.concat(app.globalData.guftem);

          for (var index in array) {
            if (array[index].todoid === tid) {
              var temft = array[index].fathertag
              if (temft === "我的") {
                app.globalData.tag1 += 1
              } else if (temft === "生活") {
                app.globalData.tag2 += 1
              } else if (temft === "运动") {
                app.globalData.tag3 += 1
              } else if (temft === "学习") {
                app.globalData.tag4 += 1
              }
            }
          }
          this.init();
        })
      }
    },
    unfinish(tid) {
      if (this.avoidClick() === true) {
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
              if (temft === "我的" && app.globalData.tag1 > 0) {
                app.globalData.tag1 -= 1
              } else if (temft === "生活" && app.globalData.tag2 > 0) {
                app.globalData.tag2 -= 1
              } else if (temft === "运动" && app.globalData.tag3 > 0) {
                app.globalData.tag3 -= 1
              } else if (temft === "学习" && app.globalData.tag4 > 0) {
                app.globalData.tag4 -= 1
              }
            }
          }
          this.init();
        })
      }
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
          openid: that.data.todo._openid
        })
      }).catch(err => {})
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

      //构造今日日期 格式yyyy-mm-dd
      var today = new Date();
      var seperator1 = "-";
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var strDate = today.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;

      this.setData({
        ["today_finished_task.current_day"]: currentdate,
        calendar_day: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(), //设置今日日期
      })
      //查询数据库更新记录
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
            sum_finished: res.data[0].sum_finished,
            sum_insisted: res.data[0].sum_insisted,
            tag1: res.data[0].tag1,
            tag2: res.data[0].tag2,
            tag3: res.data[0].tag3,
            tag4: res.data[0].tag4,
            tmp_today_finished_task: res.data[0].today_finished_task
          })
          app.globalData.tag1 = that.data.tag1,
            app.globalData.tag2 = that.data.tag2,
            app.globalData.tag3 = that.data.tag3,
            app.globalData.tag4 = that.data.tag4,
            app.globalData.sum_finished = that.data.sum_finished,
            app.globalData.sum_insisted = that.data.sum_insisted

          //如果数据库记录的当前日期为空
          if (that.data.tmp_today_finished_task.current_day == '') {
            this.setData({ //用临时记录给数据库记录赋值
              today_finished_task_record: this.data.today_finished_task,
            })
          } else { //数据库记录的不为空
            if (this.data.today_finished_task_record.current_day == this.data.today_finished_task.current_day) { //数据库与临时记录的时间相等  
              this.setData({
                today_finished_task: that.data.tmp_today_finished_task, //用数据库记录给临时记录赋值
              })
            }
          }
          if (that.data.tag1 < 0) {
            that.data.tag1 = 0
          };
          if (that.data.tag2 < 0) {
            that.data.tag2 = 0
          };
          if (that.data.tag3 < 0) {
            that.data.tag3 = 0
          };
          if (that.data.tag4 < 0) {
            that.data.tag4 = 0
          };
        },
        fail: err => {
          console.log(err)
        }
      })

    },
    hide: function() {
      var a = app.globalData.openid;
      a = a.toString
      wx.cloud.callFunction({
        name: "updateUserTag",
        data: {
          _openid: this.data.openid,
          sum_insisted: app.globalData.sum_insisted, //总的坚持天数
          sum_finished: app.globalData.sum_finished, //总的任务完成数量
          tag1: app.globalData.tag1,
          tag2: app.globalData.tag2,
          tag3: app.globalData.tag3,
          tag4: app.globalData.tag4,
          today_finished_task: this.data.today_finished_task
        }
      })
    }
  }
})