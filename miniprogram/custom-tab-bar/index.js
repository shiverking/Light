Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#00bfff",
    "list": [
      {
        "pagePath": "../todo/todo",
        "iconPath": "/images/tab_bar01_n.png",
        "selectedIconPath": "/images/tab_bar01_h.png",
        "text": "任务"
      },
      {
        "pagePath": "../newtask/newtask",
        "iconPath": "/images/tab_bar04_n.png",
        "selectedIconPath": "/images/tab_bar04_h.png",
        "text": "新建"
      },
      {
        "pagePath": "../me/me",
        "iconPath": "/images/tab_bar05_n.png",
        "selectedIconPath": "/images/tab_bar05.png",
        "text": "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      // this.setData({
      //   selected: data.index
      // })
    }
  }
})