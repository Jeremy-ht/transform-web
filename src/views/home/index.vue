<template>
  <div class="home-container">


    <div class="header">
      <div class="header-item">

        <div class="header-item-icon" @click="goHome">
          智能交通查询平台
        </div>

        <div class="loginTar">
          <el-button
            size="mini"
            type="warning"
            v-if="UserInfo.id == 0"
            @click="goLoginTo">
            登录
          </el-button>

          <div v-else>
            {{UserInfo.uname}}
          </div>
        </div>

        <!-- ========================= -->
        <!-- 搜索 -->
        <!-- ========================= -->
        <!--        <div class="header-item-search">-->
        <!--          <el-input class="header-item-search-ic"-->
        <!--                    popper-class="my-autocomplete"-->
        <!--                    v-model="searchText"-->
        <!--                    placeholder="请输入内容"-->
        <!--                    v-on:keyup.native.13="handleIconClick">-->
        <!--            <i class="el-icon-search el-input__icon a"-->
        <!--               slot="suffix"-->
        <!--               @click="handleIconClick">-->
        <!--            </i>-->
        <!--          </el-input>-->
        <!--        </div>-->

        <!--        <div class="header-item-person">-->

        <!--          <div class="header-item-person-all" @click="allShop()">-->
        <!--            全部商品-->
        <!--          </div>-->

        <!--          <div class="header-item-person-icon">-->
        <!--            <i @click="goLoginTo" class="el-icon-user-solid"/>-->
        <!--            &lt;!&ndash;            <i v-if="showLogin"  @click="goLoginTo"  class="el-icon-user-solid"/>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <i v-else @click="goLogin" class="el-icon-user-solid"/>&ndash;&gt;-->
        <!--          </div>-->

        <!--          <div class="header-item-person-shop">-->
        <!--            <svg @click="goShopping" t="1614169177551" class="icon" viewBox="0 0 1024 1024" version="1.1"-->
        <!--                 xmlns="http://www.w3.org/2000/svg"-->
        <!--                 p-id="1814" width="200" height="200">-->
        <!--              <path-->
        <!--                d="M1005.94270776 797.03077888H265.53154332c-21.94242333 0-42.52558222-8.54395221-57.86585999-24.0784111-15.3402789-15.53445888-23.88423111-35.92343666-23.69005112-57.86586112l2.71853112-545.25952c0-21.74824334-7.57304889-36.3117989-45.24411334-42.3314011h-0.19417999l-108.74121557-18.64135111c-10.48576-1.74762667-17.67044779-11.84502557-15.92281998-22.33078557 1.74762667-10.48576 11.84502557-17.67044779 22.33078442-15.92282112l108.54703446 18.64135112c51.65207666 8.15559111 77.86647666 35.34089443 77.86647666 80.7791889L222.61759999 715.47486776c0 11.45666333 4.27197667 22.13660445 12.42756779 30.09801558 8.15559111 8.15559111 18.83553223 12.62174777 30.29219555 12.62174777h740.41116445c10.67994112 0 19.41807445 8.73813333 19.41807331 19.41807445s-8.54395221 19.41807445-19.22389333 19.41807332z"-->
        <!--                fill="#dbdbdb" p-id="1815"></path>-->
        <!--              <path-->
        <!--                d="M950.60119665 685.57103445l-685.65219556-2.13598891c-21.55406222-0.19418112-41.74885888-8.54395221-56.89495665-23.88423111-15.14609778-15.3402789-23.30168889-35.53507555-23.30168889-57.08913777l2.13598777-402.73085554L962.64040333 257.5966811c35.14671445 1.35926557 62.72037888 29.90383445 62.72037888 65.0505489V611.00563c0 41.16631666-33.59326777 74.56540445-74.75958556 74.56540445zM265.33736333 644.59889778l685.45801444 2.13598776c19.80643555 0 35.92343666-16.1170011 35.92343666-35.72925554V322.64723c0-14.17519445-11.26248334-25.8260389-25.43767666-26.2144h-0.77672334l-734.58574222-54.75896888-1.74762667 361.17617778c0 11.06830222 4.27197667 21.55406222 12.03920669 29.51547221 7.37886777 7.76723001 17.86462777 12.23338667 29.1271111 12.23338667z"-->
        <!--                fill="#dbdbdb" p-id="1816"></path>-->
        <!--              <path-->
        <!--                d="M340.87367111 861.11042332m-72.42941668 0a72.42941667 72.42941667 0 1 0 144.85883335 0 72.42941667 72.42941667 0 1 0-144.85883335 0Z"-->
        <!--                fill="#dbdbdb" p-id="1817"></path>-->
        <!--              <path-->
        <!--                d="M340.87367111 952.95791445c-50.68117333 0-91.84748999-41.16631666-91.84749-91.84749113s41.16631666-91.84748999 91.84749-91.84748999c50.68117333 0 91.84748999 41.16631666 91.84748998 91.84748999s-41.16631666 91.84748999-91.84748998 91.84749113z m0-144.85883335c-29.32129223 0-53.01134222 23.69004999-53.01134223 53.01134222s23.69004999 53.01134222 53.01134223 53.01134222 53.01134222-23.69004999 53.01134222-53.01134222-23.69004999-53.01134222-53.01134222-53.01134222z"-->
        <!--                fill="#dbdbdb" p-id="1818"></path>-->
        <!--              <path-->
        <!--                d="M896.81313223 861.11042332m-72.42941668 0a72.42941667 72.42941667 0 1 0 144.85883221 0 72.42941667 72.42941667 0 1 0-144.85883221 0Z"-->
        <!--                fill="#dbdbdb" p-id="1819"></path>-->
        <!--              <path-->
        <!--                d="M896.81313223 952.95791445c-50.68117333 0-91.84748999-41.16631666-91.84749114-91.84749113s41.16631666-91.84748999 91.84749114-91.84748999 91.84748999 41.16631666 91.84748998 91.84748999-41.16631666 91.84748999-91.84748998 91.84749113z m0-144.85883335c-29.32129223 0-53.01134222 23.69004999-53.01134223 53.01134222s23.69004999 53.01134222 53.01134223 53.01134222 53.01134222-23.69004999 53.01134222-53.01134222-23.69004999-53.01134222-53.01134222-53.01134222z"-->
        <!--                fill="#dbdbdb" p-id="1820"></path>-->
        <!--              <path-->
        <!--                d="M780.30468778 426.33974556H384.56433777c-10.67994112 0-19.41807445-8.73813333-19.41807445-19.41807445s8.73813333-19.41807445 19.41807445-19.41807445h395.74035001c10.67994112 0 19.41807445 8.73813333 19.41807331 19.41807445s-8.73813333 19.41807445-19.41807331 19.41807445zM780.30468778 537.99367111H384.56433777c-10.67994112 0-19.41807445-8.73813333-19.41807445-19.41807445s8.73813333-19.41807445 19.41807445-19.41807332h395.74035001c10.67994112 0 19.41807445 8.73813333 19.41807331 19.41807332s-8.73813333 19.41807445-19.41807331 19.41807445z"-->
        <!--                fill="#dbdbdb" p-id="1821"></path>-->
        <!--            </svg>-->
        <!--          </div>-->

        <!--          <div class="header-item-person-shop-number" v-if="showLogin">-->
        <!--            {{shoppingNum}}-->
        <!--          </div>-->

        <!--        </div>-->


      </div>
    </div>


    <div class="contentCar" v-if="showIndex == 1">

      <div class="one-div one" @click="goChange(1)">
        <div>
          交 通 咨 询
        </div>
      </div>

      <div class="one-div two" @click="goChange(2)">
        <div>
          今 日 道 路
        </div>
      </div>

      <div class="one-div three" @click="goChange(3)">
        <div>
          违 章 信 息
        </div>
      </div>

      <div class="one-div four">
        <div>
          今 日 道 路
        </div>
      </div>


    </div>

    <div class="contentCar" v-if="showIndex == 2">

      <!--主体部分 新闻列表-->
      <div class="home-main">
        <el-card shadow="hover" class="home-main-div">
          <!--                 v-for="item in showNewsInfo" :key="item.id">-->
          <div class="el-card-div">

            <!--左侧图片区域-->
            <div class="left-img">
              <img style="border-radius: 2.5%;width: 273px;height: 153px;" @click="hrefNewsInfo(1)"
                   src="https://dimg11.c-ctrip.com/images/020691200082co240B8EA_R_300_120.jpg"/>
            </div>

            <!--右侧内容区域-->
            <div class="right-content">
              <div class="right-content-title">
                afsdfas
                <!--                {{item.newstitle}}-->
              </div>

              <div class="right-content-content">
                fasdfgsdfgsead
              </div>
              <div class="right-content-date">
                <span>啊噶时光大厦是的</span>
                <span style="margin-left: 40px">交通咨询</span>
              </div>

            </div>
          </div>

        </el-card>
        <el-card shadow="hover" class="home-main-div">
          <!--                 v-for="item in showNewsInfo" :key="item.id">-->
          <div class="el-card-div">

            <!--左侧图片区域-->
            <div class="left-img">
              <img style="border-radius: 2.5%;width: 273px;height: 153px;"
                   src="https://dimg11.c-ctrip.com/images/020691200082co240B8EA_R_300_120.jpg"/>
            </div>

            <!--右侧内容区域-->
            <div class="right-content">
              <div class="right-content-title">
                afsdfas
                <!--                {{item.newstitle}}-->
              </div>

              <div class="right-content-content">
                fasdfgsdfgsead
              </div>
              <div class="right-content-date">
                <span>啊噶时光大厦是的</span>
                <span style="margin-left: 40px">交通咨询</span>
              </div>

            </div>
          </div>

        </el-card>

        <el-card shadow="hover" class="home-main-div">
          <!--                 v-for="item in showNewsInfo" :key="item.id">-->
          <div class="el-card-div">

            <!--左侧图片区域-->
            <div class="left-img">
              <img style="border-radius: 2.5%;width: 273px;height: 153px;"
                   src="https://dimg11.c-ctrip.com/images/020691200082co240B8EA_R_300_120.jpg"/>
            </div>

            <!--右侧内容区域-->
            <div class="right-content">
              <div class="right-content-title">
                afsdfas
                <!--                {{item.newstitle}}-->
              </div>

              <div class="right-content-content">
                fasdfgsdfgsead
              </div>
              <div class="right-content-date">
                <span>啊噶时光大厦是的</span>
                <span style="margin-left: 40px">交通咨询</span>
              </div>

            </div>
          </div>

        </el-card>

        <el-card shadow="hover" class="home-main-div">
          <!--                 v-for="item in showNewsInfo" :key="item.id">-->
          <div class="el-card-div">

            <!--左侧图片区域-->
            <div class="left-img">
              <img style="border-radius: 2.5%;width: 273px;height: 153px;"
                   src="https://dimg11.c-ctrip.com/images/020691200082co240B8EA_R_300_120.jpg"/>
            </div>

            <!--右侧内容区域-->
            <div class="right-content">
              <div class="right-content-title">
                afsdfas
                <!--                {{item.newstitle}}-->
              </div>

              <div class="right-content-content">
                fasdfgsdfgsead
              </div>
              <div class="right-content-date">
                <span>啊噶时光大厦是的</span>
                <span style="margin-left: 40px">交通咨询</span>
              </div>

            </div>
          </div>

        </el-card>


        <!--分页-->
        <page-bar :pageTotal="pageTotal" :pageNum="pagenum" :pageSize="pagesize"
                  @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>
      </div>

    </div>

    <div class="contentCar" v-if="showIndex == 3">

      <div class="home-main" v-if="showToday">
        <h3 @click="goMore">更多...</h3>
        <el-card shadow="hover" class="home-main-div">
          <!--                 v-for="item in showNewsInfo" :key="item.id">-->
          <div class="el-card-div">

            <!--左侧图片区域-->
            <div class="left-img">
              <!--              <img style="border-radius: 2.5%;width: 273px;height: 153px;"-->
              <!--                   src="https://dimg11.c-ctrip.com/images/020691200082co240B8EA_R_300_120.jpg"/>-->
              <div class="image2" style="border-radius: 2.5%;width: 140px;height:140px;">
              </div>
            </div>

            <!--右侧内容区域-->
            <div class="right-content2">
              <div class="right-content-title" style="font-size: 28px">
                2021-03-04
              </div>

              <div class="right-content-content">
                fasdfgsdfgsead
              </div>
              <div class="right-content-date">
                <span>今日道路</span>
              </div>

            </div>
          </div>
        </el-card>

      </div>


      <div class="home-main" v-if="!showToday">
        <el-card shadow="hover" class="home-main-div">
          <!--                 v-for="item in showNewsInfoAll" :key="item.id">-->
          <div class="el-card-div">

            <!--左侧图片区域-->
            <div class="left-img">
              <!--              <img style="border-radius: 2.5%;width: 273px;height: 153px;"-->
              <!--                   src="https://dimg11.c-ctrip.com/images/020691200082co240B8EA_R_300_120.jpg"/>-->
              <div class="image2" style="border-radius: 2.5%;width: 140px;height:140px;">
              </div>
            </div>

            <!--右侧内容区域-->
            <div class="right-content2">
              <div class="right-content-title" style="font-size: 28px">
                2021-03-04
              </div>

              <div class="right-content-content">
                fasdfgsdfgsead
              </div>
              <div class="right-content-date">
                <span>今日道路</span>
              </div>

            </div>
          </div>

        </el-card>
      </div>

    </div>


  </div>
</template>

<script>
  import {
    fourList,
    getCategoryList,
    getTodayList,
    getSceneryIndex,
    getShoppingNum,
    getSceneryList,
    getTodayListToday,
    getInfoList,
    getrotationList,
    updUserInfo,
    getSearchContent,
    adminLogin,
    userLogin,
    addUser,
    getSceneryListByCate
  } from '../../api/common'
  import '../../assets/iconfont/iconfont'

  export default {
    name: 'index',
    data() {

      // 验证手机号的规则
      let checkMobile = (rule, value, cb) => {
        // 验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (regMobile.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的手机号'))
      }

      return {
        activeIndex: '0',
        search: '',

        UserInfo: {
          uname: '',
          image: '',
          phone: '',
          creatime: '',
          email: '',
          id: 0,
          loginway: 0,
          sex: '1'
        },

        // 分类
        cateList: [],

        // 切换页面数据
        otherList: [],
        showIndex: 1,
        categoryname: '',

        isActive: false,
        // flower
        loginDialog: false,
        regDialog: false,
        comment: '',

        //表单数据绑定
        loginForm: {
          uname: '',
          pwd: ''
        },
        //表单验证
        loginFormRules: {
          username:
            [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
            ],
          password:
            [
              {required: true, message: '请输入密码', trigger: 'blur'},
              {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
            ]
        },


        showLogin: false,

        // 购物车
        shoppingNum: 0,

        // phone
        searchText: '',
        showLists: [],
        cate: [],
        fourList: [],
        searchList: [],

        showNewsInfo: [],
        showNewsInfoToday: [],
        showNewsInfoAll: [],

        dialogImageUrl: '',
        dialogVisible: false,

        showToday: true,

        // 分页查询
        pagenum: 1,
        pagesize: 10,
        pageTotal: 0,


      }
    },
    // created() {
    //   this.init()
    //
    // },
    methods: {

      // 初始化
      async init() {

        // 是否登录
        if (!this.loginIs()) {
          this.showLogin = false
        } else {
          this.showLogin = true
        }

        let params = {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        // 交通咨询
        await getInfoList(1, params).then(res => {
          if (res.success) {
            this.showNewsInfo = res.data.data
          } else {
            this.$notify({message: '数据获取失败,请刷新!', type: 'error', duration: 2000})
          }

        })


        // 当天
        await getTodayListToday().then(res => {
          if (res.success) {
            this.showNewsInfoToday = res.data.data
          } else {
            this.$notify({message: '数据获取失败,请刷新!', type: 'error', duration: 2000})
          }

        })

      },


      async goMore() {
        let p = {
          pagenum: 1,
          pagesize: 100
        }
        await getTodayList(p).then(res => {
          if (res.success) {
            this.showNewsInfoAll = res.data.data

          } else {
            this.$notify({message: '数据获取失败,请刷新!', type: 'error', duration: 2000})
          }

        })

        this.showToday = false
      },


      // 分页
      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        this.getInit()
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getInit()
      },


      // 点击新闻跳转页面查看新闻详细信息
      hrefNewsInfo(newInfo) {
        window.sessionStorage.setItem("newsInfo", JSON.stringify(newInfo))
        const {href} = this.$router.resolve({path: '/ShowNewsInfo/' + newInfo})
        window.open(href, '_blank')
      },

      // 获取纯文本
      computWordNumber(content) {
        let text = content.replace(/<[^>]*>|/g, "")
        text = text.replace('&nbsp;', ' ')
        if (text.length >= 150) {
          text = text.substring(0, 150)
          text += '......'
        }
        return text
      },

      // 是否登录
      loginIs() {
        // 是否登录
        let user = JSON.parse(window.localStorage.getItem('UserInfoPhone'))
        if (user == undefined || user == null || user == '') {
          return false
        } else {
          this.UserInfo = user
          return true
        }

      },

      async handleIconClick() {

        if (this.searchText == '') {
          this.init()
          this.showIndex = 1

          return
        }

        let params = {
          pagenum: 1,
          pagesize: 100,
          a: this.searchText.trim()
        }
        console.log(params)
        await getSearchContent(params).then(res => {
          if (res.success) {
            this.showIndex = 3
            this.searchList = []
            this.searchList = res.data.data

          } else {
            this.$notify({
              message: '换个搜索方式吧！',
              type: 'error', duration: 2300
            })
          }
        })

      },

      // 去首页
      goHome() {
        this.showIndex = '1'
      },

      goChange(id) {

        if (id == 1) {
          //  交 通 咨 询
          this.showIndex = '2'


        } else if (id == 2) {
          // 今 日 道 路
          this.showIndex = '3'


        } else if (id == 3) {
          // 违章信息
          if (!this.loginIs()) {
            this.$notify({title: '警告', message: '请先登录系统', type: 'warning'});
          } else {


            this.showIndex = '2'
          }


        } else if (id == 4) {
          // 今 日 道 路

        }


      },


      // 登录
      goLogin() {
        this.$router.push({path: `/phone/login`})
      },

      // 个人中心
      goLoginTo() {
        // 是否登录
        if (!this.loginIs()) {
          // this.$notify({ message: '请先登录', type: 'error', duration: 1700 })
          this.goLogin()
          return false
        }
        const {href} = this.$router.resolve({path: `/phone/my`})
        window.open(href, '_blank')
      },


      // 去详情页
      goDetailInfo(id) {
        const {href} = this.$router.resolve({path: `/phone/show/${id}`})
        window.open(href, '_blank')

      },

      handleCommand(command) {
        if (command == 1) {
          // 个人中心
          this.showIndex = 3
          this.activeIndex = '-1'

        } else {
          // 退出
          window.localStorage.removeItem('UserInfo')
          this.UserInfo = {
            uname: '',
            image: '',
            phone: '',
            creatime: '',
            email: '',
            id: 0,
            loginway: 0,
            sex: '1'
          }
          this.activeIndex = '0'
          this.showIndex = 1
          this.init()
        }

      },
      layoutLogin() {
        console.log(1)
        window.localStorage.removeItem('UserInfoPhone')
        console.log(1)
        this.init()
      },

      // 封面上传成功
      handleAvatarSuccess(res, file) {
        if (res.success) {
          this.UserInfo.image = res.data.location
          window.localStorage.removeItem('UserInfo')
          window.localStorage.setItem('UserInfo', JSON.stringify(this.UserInfo))
          this.UserInfo = JSON.parse(window.localStorage.getItem('UserInfo'))
        } else {
          this.$notify({message: '头像上传失败，请重新上传', type: 'error', duration: 1700})
        }

      },


    }
  }
</script>

<style scoped>
  .home-container {
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: white;
  }

  .top-bar {
    width: 100%;
    height: 34px;
    font-size: 12px;
    color: #71797F;
    background-color: #F3F5F7;
    display: flex;
  }

  .top-bar-item {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .top-bar-item-left {
    width: 500px;
    height: 100%;
    margin: auto 0 auto 1px;
    line-height: 34px;
    display: flex;
  }

  .top-bar-item-right {
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
  }

  .person {
    margin: auto 0 auto 20px;
  }

  .login {
    margin: auto 0 auto 20px;
  }

  .register {
    margin: auto 0 auto 20px;
  }

  .cart {
    margin: auto 5px auto 30px;
  }

  .co:hover {
    cursor: pointer;
    color: #5a98de;
  }

  /* ======= */
  /*  导航 */
  /* ======= */
  .bar {
    width: 100%;
    height: 70px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-bottom: 1px solid #ebeef5;
  }

  .home-content {
    width: 1200px;
    height: 70px;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  .home-search {
    width: 200px;
    margin: auto;

  }

  .el-menu {
    display: flex;
    /*justify-content: space-around;*/
  }

  .bai-item {
    width: calc(100% - 300px);
  }

  .el-menu-item {
    height: 69px;
    line-height: 70px;
    margin-left: 12px;
    font-size: 18px;
    color: #232628;
    font-weight: bold;
  }

  /deep/ .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 70px;
    line-height: 70px;
  }

  /deep/ .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  /deep/ .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid white;
  }

  /deep/ .el-button.is-plain:focus, .el-button.is-plain:hover {
    background: #FFF;
    border-color: #5a98de;
    color: #5a98de;
  }

  /deep/ .el-input__inner:hover {
    border-color: black;
  }

  /deep/ .el-input__inner:focus {
    border-color: black;
  }

  /* ======= */
  /* 展示 */
  /* ======= */
  .content-show {
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
    color: black;
    display: flex;
    flex-direction: column;
    padding-bottom: 60px;
  }

  .content-show1 {
    width: 100%;
    height: 100%;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
  }

  .new {
    width: 100%;
    margin-top: 20px;
    /*height: 450px;*/
  }

  .new-item {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .new-item-list {
    width: 260px;
    height: 320px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: white;
    padding: 6px;
    margin-top: 20px;
  }

  .new-item-list1 {
    width: 260px;
    height: 320px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: #f4f4f4;
    padding: 6px;
  }

  .new-item-list1:hover {
    border: 1px solid #5a98de;

  }

  .new-item-list:hover {
    border: 1px solid #ff6c41;
  }

  .new-item-img {
    width: 220px;
    height: 240px;
    margin: 4px auto;
  }

  .new-item-img img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .new-item-price {
    height: 24px;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin: 6px auto;
    color: #ff6c41;
  }

  .new-item-name {
    width: 220px;
    margin: 0 auto;
    font-size: 14px;
    color: #737373;
    cursor: pointer;
    text-align: center;
  }

  .new-item-name:hover {
    color: #ff6c41;
  }

  .feature {
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;

  }

  .bor {
    width: 1200px;
    height: 100%;
    margin: 18px auto 0 auto;
  }

  .bor2 {
    width: 1200px;
    height: 100%;
    margin: 18px auto 0 auto;
    background-color: #f3f3f3;
  }

  /* ======= */
  /*  phone  */
  /* ======= */
  .header {
    width: 100%;
    height: 60px;
    background-color: black;
    display: flex;
  }

  .header-item {
    width: 1200px;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;

  }

  .header-item-icon {
    line-height: 60px;
    font-size: 22px;
    font-weight: 500;
    cursor: pointer;
  }

  .loginTar {
    line-height: 60px;
    color: white;
    margin-right: 10px;
  }


  .header-item-search {
    width: 400px;
    display: flex;
  }

  .header-item-search-ic {
    width: 340px;
    margin: auto;
  }

  /* ======= */
  /*  car  */
  /* ======= */

  .contentCar {
    width: 1100px;
    height: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .one-div {
    width: 400px;
    height: 200px;
    margin-top: 40px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 44px;
    font-weight: 500;
    line-height: 200px;
    text-align: center;
  }

  .one-div:hover {
    color: #100704;
  }

  .one {
    background-image: url("../../assets/90.jpg");
  }

  .two {
    background-image: url("../../assets/80.jpg");
  }

  .three {
    background-image: url("../../assets/70.jpg");
  }

  .four {
    background-image: url("../../assets/70.jpg");
  }


  .home-main {
    padding-top: 28px;
    width: 1100px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 130px;
  }

  .home-main-div:hover {
    border-color: #E6A23C;
  }

  .home-main-div {
    margin-top: 10px;
    background-color: #f9f9f9;
    width: 100%;
    height: 193px;
    /*border: 1px #F9FFFB solid;*/
    /*border-bottom: 1px #dbdbdb solid;*/
    border: solid 1px #d8d8d8;
  }

  .el-card-div {
    height: 155px;
    width: 100%;
    /*border: 1px blue solid;*/

    display: flex;
    justify-content: space-between;
  }

  .left-img {
    width: 200px;
    height: 153px;
    text-align: center;
    line-height: 153px;
    /*border: 1px yellowgreen solid;*/
    cursor: pointer;
    padding-right: 20px;
    border-right: solid 1px #d8d8d8;
  }

  .right-content {
    width: 75%;
    height: 153px;
    /*border: 1px blue solid;*/
    padding-left: 34px;
  }

  .right-content2 {
    width: 75%;
    height: 153px;
    /*border: 1px blue solid;*/
    /*padding-left: 15px;*/
  }

  /*标题*/
  .right-content-title {
    width: 100%;
    height: 30%;
    font-size: 22px;
    font-weight: normal;
    cursor: pointer;
    margin-right: 3%;
  }

  .right-content-content {

    width: 100%;
    height: 55%;
    font-size: 14px;
    cursor: pointer;
    /*letter-spacing: 0.05em; !*字体间距*!*/
    color: #333333;
  }

  /*日期*/
  .right-content-date {
    width: 100%;
    height: 15%;
    color: #999999;
    font-size: 15px;
  }

  .avatar {
    width: 90px;
    height: 90px;
    display: block;
    border-radius: 50%;
    margin-left: 10px;
  }

  .image2 {
    background-image: url("../../assets/日历.png");
    /*margin: auto;*/
    background-repeat: no-repeat;
    margin-left: 14px;
  }

</style>
