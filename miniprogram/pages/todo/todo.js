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
    uftodos:[],
    tftodos:[],//日期选定后该日期完成的任务
    uflength:"",
    length:"",
    tflength:"",
    flength: "",
    id: [],
    show: false,
    today_finished_task: {  //今日完成任务情况
      last_day:'',//上一个被记录的日期
      current_day:'',//维护一个日期变量
      today_finished_sum:'',//今日完成任务总数
      if_add:false//是否坚持天数加一
    },
    calendar_day:"",//日历显示的日期，首次打开时今日
    show_calender:false,//设置日历是否显示
    minDate:new Date(2020,3,1).getTime(),//日历最小显示范围 
  },
  methods: {
    //打开日历
    openCalender(){
      this.setData({ show_calender: true });
    },
    onCloseCalender(){
      this.setData({ show_calender: false });
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
          title: '任务已完成',
        });
        app.globalData.sum_finished+=1; //完成总数加一
        this.data.today_finished_task.today_finished_sum +=1;
        if (this.data.today_finished_task.if_add == false){ //天数还未加一
          app.globalData.sum_insisted += 1 ;
          this.data.today_finished_task.if_add = true;
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
        if (app.globalData.sum_finished>0){
          app.globalData.sum_finished -= 1;//完成总数减一
        }
        if (this.data.today_finished_task.today_finished_sum>0){
          this.data.today_finished_task.today_finished_sum -= 1;
        }
        if (this.data.today_finished_task.today_finished_sum == 0) { //今日任务全部还原
          this.data.today_finished_task.if_add = false;//修改为还未加一
          if (app.globalData.sum_insisted>0){
            app.globalData.sum_insisted -= 1;
          } 
        }
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
      var that = this;
      wx.cloud.callFunction({
        name: 'getTodoids',
      }).then(res => {
        var tem = new Array();
        var ftem = new Array();
        var uftem = new Array();
        var todayftem = new Array();//总感觉有更好的方法，
        for (var i = 0; i < res.result.data.length; i++) {
          that.data.todo = res.result.data[i];
          if (res.result.data[i].isfinished === true) {
            var t = res.result.data[i].time;
            var dateConvert1 = new Date(Date.parse(t));
            var currentData = new Date();
            if(currentData < dateConvert1){
              tem.push(that.data.todo)
            }else{
              uftem.push(that.data.todo)
            }
          } else {
            if (that.data.todo.finishedtime === that.data.calendar_day){
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
          length:tem.length,
          uftodos:uftem,
          uflength:uftem.length,
          ftodos: ftem,
          flength: ftem.length,
          tftodos:todayftem,
          tflength:todayftem.length,
        })
      }).catch(err => {
        
      })
    },
    todetail(event){      //点击任务单元格进行跳转
      var i = event.target.id
      wx.navigateTo({
        url: '../tododetail/tododetail?todoid=' + event.target.id,
      })
    },
    onConfirmCalender(event){
     var td = event.detail
     var da = td.getFullYear() + "-" + (td.getMonth() + 1) + "-" + td.getDate()
     this.setData({
       calendar_day:da,
       show_calender:false
     })
      this.init();
    }
  },
  pageLifetimes: {

    show() {
      var today = new Date();
      this.setData({
        current_day:today,
        calendar_day: today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate(), //设置今日日期
      })
      console.log(today)
      if (this.data.today_finished_task.current_day > this.data.last_day){
        this.data.today_finished_task.last_day == this.data.current_day;//更新记录日期
        this.data.today_finished_task.today_finished_sum = 0;//重设为0
        this.this.data.today_finished_task.if_add=false;
      }
      else{}
      var that = this
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      };
      that.init()
      wx.cloud.callFunction({
        name:"remind"
      }).then( res =>
      {
        console.log(res)
      })
    }
  }
})