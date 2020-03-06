const app =getApp()
Page({
  data: {
    tabbar: [
      {
        name: "任务清单",
        iconPath: "home-o",
        tips: '',
        selected: true
      },
      {
        name: "新建任务",
        iconPath: "search",
        tips: '1',
        selected: false
      },
      {
        name: "关于我",
        iconPath: "friends-o",
        tips: '',
        selected: false
      }
    ],
    active: 0,//选中的tab
    scrollTopArray: [], // 记录每个页面的滚动位置
    icon: { //暂时保存
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.tabbar.forEach((item, index, arr) => {
      this.data.scrollTopArray[index] = 0; //加载的时候默认为第一个界面
      // item.isFirstLoad = true
    });
    wx.setNavigationBarTitle({ //设置每个页面的标题
      title: this.data.tabbar[0].name,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.updateSubPageShowHide(this.data.active);
  },

  /**
* 生命周期函数--监听页面隐藏
*/
  onHide: function () { },

  onChange(event) {
    if(event.detail==this.data.active) return; //相同界面 不作响应
    this.updateSubPageShowHide(this.data.active);
    this.setData({ 
      active: event.detail,
      pageName: this.data.tabbar[event.detail].name
      })
    // 还原子页面的滚动位置
    wx.pageScrollTo({
      duration: 0,
      scrollTop: this.data.scrollTopArray[event.detail]
    }) 
  },
  // 记录每个子页面的滚动位置
  onPageScroll(e) {
    this.data.scrollTopArray[this.data.activeIndex] = e.scrollTop;
  },
  // 更新组件的show hide 生命周期
  updateSubPageShowHide(currentIndex) {
    this.data.tabbar.forEach(function (value, i) {
      if (i == currentIndex) {
        value.selected = true;
        wx.setNavigationBarTitle({
          title: value.name,
        })
      } else {
        value.selected = false;
      }
    })
    this.setData({
      tabbar: this.data.tabbar,
    })
  },
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  }
})