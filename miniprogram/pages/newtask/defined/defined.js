// miniprogram/pages/newtask/defined/defined.js
import Dialog from '@vant/weapp/dialog/dialog';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,//默认Addtag提示框为关
    newtagname:'', //新建tag名称
    value:'',
    tags:[],
    show_update:false,//默认UpdateTag提示框为关
    update_value:'',//更新数据时显示的信息
    update_id:'',//记录修改的id值
  },
  //返回键功能
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  //删除键功能
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'cell':
        instance.close();
        //updateTag();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          //关闭实例
          instance.close();
          db.collection('tag').doc(event.target.id).remove({//删除该tag
            success: res => {
              //console.log('[数据库] [删除记录] 成功：',res)
              this.onShow();//即时刷新界面
            },
            fail: err => {
              wx.showToast({
              icon: 'none',
              title: '删除失败',
              })
              console.error('[数据库] [删除记录] 失败：', err)
              }
          })
        }).catch(() => {
        });
        break;
    }
  },
  //添加tag功能
  addtag:function(){
    this.setData({ 
      show: true, 
    });
    
  },
  //关闭dialog
  onCloseAddTag() {
    this.setData({ 
      close: false,
      value:''
      });
    //console.log(this.data.newtagname)
  },
  onConfirmAddTag:function(){
    db.collection('tag').add({
      data: {
        tagname: this.data.newtagname
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '添加成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        this.onShow();//刷新界面即时显示
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
  //输入框事件
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      newtagname:event.detail
    })
    //console.log(event.detail);
  },
  //点击修改tag信息
  updateTag:function(event){
    var id = event.target.id;
    var update_show_tmp;
    for(var i=0;i<this.data.tags.length;i++){
      //console.log(this.data.tags[i]._id);
      if (this.data.tags[i]._id == event.target.id){
         update_show_tmp = this.data.tags[i].tagname;
         break;
       }
    }
    this.setData({
      update_show: true,
      update_value:update_show_tmp,
      update_id:id,
    });
    //console.log(event.target.id)
  },
  onCloseUpdateTag() {
    this.setData({
      close: false,
      value: '',
    });
    //console.log(this.data.newtagname)
  },
  onConfirmUpdateTag:function(id){//修改项目名称
    db.collection('tag').doc(this.data.update_id).update({
      data: {
        tagname: this.data.newtagname
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '修改成功',
        })
        console.log('[数据库] [修改记录] 成功，记录 _id: ', res._id)
        this.onShow();//刷新界面即时显示
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '修改记录失败'
        })
        console.error('[数据库] [修改记录] 失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    db.collection('tag').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        if (res.data.length >= 1) {
          //console.log('[数据库] [查询记录] 成功: ', res.data)
          var temptags =new  Array();
          for (var i = 0; i < res.data.length;i++){
            temptags.push(res.data[i]);//将所有的tagname添加到tags里
          }
          this.setData({
            tags:temptags
          })
        }
      },
      fail: err => {
        //调试用语句
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})