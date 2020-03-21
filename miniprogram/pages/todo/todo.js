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
          this.finish(event.target.id);
          break
        }
        case 'cell':{
          var i = event.target.id
        wx.navigateTo({
          url: '../tododetail/tododetail?todoid='+event.target.id,
        })
          break;
        }
        case 'right':{
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
        case 'left': {
          this.unfinish(event.target.id);
          break;
        }
        case 'cell':{
          console.log("cell");
          break;
        }
        case 'right': {
          this.deletetodo(event.target.id);
          break;
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