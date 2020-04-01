//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      //openID
      openid: '',
      //用户信息
      userInfo: {},
      //登陆状态
      logged:false,
      avatarUrl: 'images/unknown.png',
      userInfo: {},
      gtem:{},//正在进行中的任务
      gftem:{},//以及完成的任务
      guftem:{},//时间已过，但没有完成的任务
      gtags:{},//tag列表
      sum_insisted:0,//总的坚持天数
      sum_finished:0,//总的任务完成数量
    }
  }
})
