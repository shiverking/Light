// miniprogram/pages/todo/todo.js
const app = getApp();
Component({
  data: {
    todos: [],
    todo: {
      todoid: "",
      name: "",
      time: ""
    },
    ftodos: [],
    flength: "",
    id: [],
    show: false,
    currentDate: new Date().getTime(),
    currentTime: "",
    minTime: new Date().getTime(),
    formatter(type, value) {
      if (type === 'hour') {
        return `${value}时`;
      } else if (type === 'minute') {
        return `${value}分`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value;
    },
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png'
    }
  },
  methods: {
    onClickLeft() {
      wx.showToast({
        title: '点击返回',
        icon: 'none'
      });
    },
    onClose(event) {
      const {
        position,
        instance
      } = event.detail;
      switch (position) {
        case 'left':{
          console.log(event.target.id);
          this.finish(event.target.id)
        }
        case 'right':{
          this.deletetodo(event.target.id)
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
        case 'left': {
          this.unfinish(event.target.id)
        }
        case 'right': {
          this.deletetodo(event.target.id)
        }
          break;
      }
    },
    finish(tid){
      wx.cloud.callFunction({
        name:"finishtodobyid",
        data:{
          todoid:tid,
        }
      }).then(res =>{
        wx.showToast({
          title: '任务以完成',
        });
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
        this.init();
      })
    },
    deletetodo(tid){
      wx.cloud.callFunction({
        name:"deletetodobyid",
        data:{
          todoid:tid
        }
      }).then(res =>{
        wx.showToast({
          title: '删除成功',
        })
        this.init();
      })

    },
    init(){
      var that = this
      wx.cloud.callFunction({
        name: 'getTodoids',
      }).then(res => {
        var tem = new Array();
        var ftem = new Array();
        for (var i = 0; i < res.result.data.length; i++) {
          that.data.todo = res.result.data[i];
          if (res.result.data[i].isfinished === true) {
            tem.push(that.data.todo)
          } else {
            ftem.push(that.data.todo);
          }
        }
        that.setData({
          todos: tem,
          ftodos: ftem,
          flength: ftem.length
        })
      }).catch(err => {
        console.log(err)
      })
    }

  },
  pageLifetimes: {

    show() {
      var that = this
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      };
      that.init()
    }
      
  }
})