//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    loading: false,
    searchLoading: false,
    searchName: "",
    searchIdLast4: "",
    list: [],

    fadeInAnimation: null,

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    spinShow: true,
    switch: false
  },

  search: function() {
    let that = this;
    console.log(that.data)

    if (that.data.searchName == "") {
      wx.showToast({
        title: '请输入收件人姓名',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (that.data.idLast4 == "") {
      wx.showToast({
        title: '请输入身份证号后四位',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    that.setData({
      searchLoading: true,
      show404: false,
      list: [],
    })

    db.collection('orders').where({
        receiver: that.data.searchName,
        idLast4: that.data.searchIdLast4,
    }).get({
      success: function(res) {
        if(res.data.length != 0) {
          that.setData({list: res.data})
          that.fadeInInfo();
        } else {
          that.setData({show404: true})        
        }
     },
     fail: function(res) {
       console.log("failed");
     },
     complete: function(res) {
       console.log("done")
       that.setData({searchLoading: false})
     },
    })
  },

  fadeInInfo: function(callback = function() {}) {
    let that = this

    let info = this.data.list
    var key

    var animationInfoData = []
    var infoShow = []
    for (key in info) {
      var animation = wx.createAnimation({
        duration: 0,
        timingFunction: 'step-start',
      })
      animation.opacity(0).scale(0.8, 0.8).step()
      animationInfoData[key] = animation.export()
      infoShow[key] = true
    }

    that.setData({
      animationInfoData: animationInfoData
    }, function() {
      that.setData({
        infoShow: infoShow
      })

      for (key in info) {
        var time = 100 * key
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
          delay: time
        })
        animation.opacity(1).scale(1, 1).step()
        animationInfoData[key] = animation.export()
      }
      setTimeout(function() {
        that.setData({
          animationInfoData: animationInfoData
        })
      }, 100)
    })
  },

  openDetail: function() {
    console.log("open detail clicked");
    this.setData({ loading: true })
    wx.navigateTo({
      url: "/pages/detail/detail",
      success: function() {
        console.log("success");
      },
      complete: function() {
        console.log("complete");
      }
    })
  },
 
  onLoad: function() {
   
  },

  onHide: function() {
    console.log("index hide")
    this.setData({ loading: false })
  },

  onShow: function() {
    console.log(wx.getSystemInfoSync().SDKVersion);
    console.log("index show")
  },

})
