<template>
  <div class="home-container">

    <div class="header">
      <div class="header-item">

        <div class="header-item-icon" @click="goHome">
          智能交通查询平台
        </div>

      </div>
    </div>


    <div style="display: flex;background-color: #ededed;">
      <div class="person-show">

        <div class="person-show-right">
          <div class="person-show-right-div-item">

            <div class="dov">
              <el-button @click="showIsOR(1)" class="btn22" type="primary">违章处理</el-button>
              <el-button @click="showIsOR(2)" class="btn22" type="primary">积分记录</el-button>
              <el-button @click="goUpd" class="btn22" type="primary">修改密码</el-button>
              <el-button @click="layoutGo" class="btn22" type="primary">退出系统</el-button>
            </div>

            <div class="dov-right">
              <div class="dov-right-item" v-if="showIs == '1'">

                <el-tabs v-model="activeName">
                  <el-tab-pane label="未处理" name="first">

                    <!--表格-->
                    <el-table :data="allDetailList" stripe style="width: 100%; margin-top: 10px" border size="small">
                      <el-table-column label="#" type="index" align="center"/>
                      <el-table-column label="积分扣除" prop="jf" align="center"/>
                      <el-table-column label="应缴罚款" prop="pay" align="center"/>
                      <el-table-column label="违章时间" align="center" width="170px">>
                        <template slot-scope="scope">
                          <span style="margin-left: 10px"><i class="el-icon-date"/>{{' '+ scope.row.creatime}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                          <el-tag @click="goWZ(scope.row)"
                                  effect="dark" type="danger"
                                  style="cursor:pointer"
                                  size="small">处理违章
                          </el-tag>
                          <el-tag effect="dark" style="margin-left: 10px;cursor:pointer" type="primary" size="small"
                                  @click="getWZ(scope.row)">违章信息
                          </el-tag>
                        </template>
                      </el-table-column>

                    </el-table>

                    <!--分页-->
                    <page-bar :pageTotal="pageTotal" :pageNum="pagenum" :pageSize="pagesize"
                              @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>

                  </el-tab-pane>


                  <el-tab-pane label="已处理" name="second">

                    <!--表格-->
                    <el-table :data="allDetailList2" stripe style="width: 100%; margin-top: 10px" border size="small">
                      <el-table-column label="#" type="index" align="center"/>
                      <el-table-column label="积分扣除" prop="jf" align="center"/>
                      <el-table-column label="应缴罚款" prop="pay" align="center"/>
                      <el-table-column label="违章时间" align="center" width="170px">>
                        <template slot-scope="scope">
                          <span style="margin-left: 10px"><i class="el-icon-date"/>{{' '+ scope.row.creatime}}</span>
                        </template>
                      </el-table-column>

                      <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                          <el-tag effect="dark"
                                  style="cursor:pointer"
                                  type="danger" size="small">已处理
                          </el-tag>
                          <el-tag
                            effect="dark" style="margin-left: 10px;cursor: pointer" type="primary" size="small"
                            @click="getWZ(scope.row)">违章信息
                          </el-tag>
                        </template>
                      </el-table-column>

                    </el-table>

                    <!--分页-->
                    <page-bar :pageTotal="pageTotal2" :pageNum="pagenum2" :pageSize="pagesize2"
                              @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>


                  </el-tab-pane>
                </el-tabs>


              </div>

              <div class="dov-right-item" v-if="showIs == '2'">
                <div style="margin-left: 46px;margin-bottom: 20px">剩余积分： <span style="font-size: 18px;font-weight: 500">{{jf}}</span>
                </div>

                <el-timeline v-if="allDetailList3.length != 0">
                  <el-timeline-item :timestamp="item.creatime.substring(0, 10)" placement="top"
                                    v-for="item in allDetailList3" :key="item.id">
                    <el-card>
                      <!--                      <h4>{{item}}</h4>-->
                      <p>{{computWordNumber(item.content)}}</p>
                      <p>{{item.creatime + ''}}
                        <span class="xiangqing" @click="getWZ(item)">
                        查看详情
                      </span>
                      </p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>

                <div v-else style="margin-top: 100px;margin-left: 310px;font-size: 18px;font-weight:600">
                   没有积分记录，继续保持良好开车习惯！
                </div>
              </div>
            </div>

          </div>


        </div>

      </div>
    </div>


    <!--修改密码 -->
    <el-dialog title="修改密码" :visible.sync="updDialogVisible" width="50%">
      <span>
        <!--表单-->
        <el-form label-width="90px">
          <el-form-item label="原密码:">
           <el-input placeholder="原密码" v-model="pwd.password" show-password/>
          </el-form-item>


          <el-form-item label="新密码:">
           <el-input placeholder="新密码" v-model="pwd.newPassword" show-password/>
          </el-form-item>
        </el-form>
      </span>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="submitPwd(UserInfo.id)" size="mini">修改</el-button>
        <el-button type="info" @click="updDialogVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>


    <el-dialog title="违章信息" :visible.sync="updDialogVisible2" width="50%">
      <span>
        <div>违章时间：{{wzInfo.creatime}}</div>
        <div class="bb">扣除积分：{{wzInfo.jf}}分</div>
        <div class="bb">应缴罚款：{{wzInfo.pay}}元</div>
        <div class="bb">违章详情：</div>
        <div style="margin-left: 40px" v-html="wzInfo.content"></div>



      </span>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="updDialogVisible2 = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import {
    getJfUser, updWZ, getAddressList,
    addAddress, getUserList, getSceneryIndex,
    getSceneryList, getrotationList, updUserInfo,
    getSearchContent, updPasswordById, delAdmin,
    getWzList
  } from '../../api/common'
  import '../../assets/iconfont/iconfont'
  import PageBar from '@/components/PageBar'

  export default {
    name: 'person',
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
        showLogin: false,

        UserInfo: {
          uname: '',
          image: '',
          phone: '',
          creatime: '',
          email: '',
          id: 0,
        },

        jf: 0,

        // 分类
        cateList: [],

        // 切换页面数据
        otherList: [],
        showIndex: 1,

        // flower
        loginDialog: false,
        regDialog: false,
        comment: '',

        // 购物车
        checked: false,
        num: 1,
        countPay: 0,

        showIs: '1',

        // 修改密码
        pwd: {
          password: '',
          newPassword: ''
        },

        // 地址
        addressList: [],
        addressInfo: {
          name: '',
          phone: '',
          address: ''
        },
        addressDialog: false,
        updDialogVisible: false,
        updDialogVisible2: false,
        shoppingNum: 0,

        titleName: '我的账号',
        activeName: 'first',
        allDetailList: [],
        allDetailList2: [],
        allDetailList3: [],

        // 分页查询
        pagenum: 1,
        pagesize: 6,
        pageTotal: 0,

        // 我的列表分页
        pagenum2: 1,
        pagesize2: 6,
        pageTotal2: 0,

        wzInfo: {}

      }
    },
    components: {
      PageBar

    },
    created() {
      this.init()

    },
    methods: {
      // 初始化
      async init() {
        let id = this.$route.params.id
        if (id == 1) {
          this.showIs = 1
        } else {
          this.showIs = 2
        }


        // 是否登录
        if (!this.loginIs()) {
          this.$notify({message: '请先登录', type: 'error', duration: 1700})
          this.$router.push('/logins')
          return false
        }


        let params = {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }

        await getWzList(this.UserInfo.id, params).then(res => {
          if (res.success && res.data.data.length != 0) {

            this.allDetailList3 = res.data.data

            this.allDetailList = res.data.data.filter(item => item.top == 0)
            this.pageTotal = this.allDetailList.length

            this.allDetailList2 = res.data.data.filter(item => item.top == 1)
            this.pageTotal2 = this.allDetailList2.length
          }
        })


        getJfUser(this.UserInfo.id).then(res => {
          if (res.success) {
            this.jf = res.data.data.jf
          }
        })


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

      // 分页
      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        this.getInit()
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getInit()
      },
      // 分页
      handleSizeChange2(pagesize) {
        this.pagesize2 = pagesize
        this.getInit()
      },
      handleCurrentChange2(pagenum) {
        this.pagenum2 = pagenum
        this.getInit()
      },

      // 处理违章信息
      goWZ(row) {
        this.$confirm(`是否确定处理此次违章?\n 您将被罚款 ${row.pay} ,扣除积分 ${row.jf} `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          getJfUser(row.userid).then(res => {
            if (res.success) {
              let user = res.data.data
              if (user.jf <= 0) {
                this.$notify({message: '对不起，您的积分为0', type: 'error', duration: 1700})
                return
              }
            } else {
              this.$notify({message: '处理违章信息失败，请刷新页面再试', type: 'error', duration: 1700})
            }
          })

          updWZ(row.userid, row.id).then(res => {
            if (res.success) {
              this.init()

            } else {
              this.$notify({message: '处理违章信息失败，请刷新页面再试', type: 'error', duration: 1700})
            }
          })
        })

      },

      // 获取违章信息
      getWZ(row) {
        this.wzInfo = row
        this.updDialogVisible2 = true
      },

      // 去首页
      goHome() {
        this.$router.push({path: `/home`})
      },


      // 修改密码
      goUpd() {
        this.pwd = {
          password: '',
          newPassword: ''
        }

        this.updDialogVisible = true
      },

      // 退出登录
      layoutGo() {
        this.$confirm('是否确定退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          window.localStorage.removeItem('UserInfoPhone')
          this.$router.push({path: '/home'})

        })


      },

      submitPwd(id) {
        if (this.pwd.newPassword == '') {
          this.$notify({message: '不能为空', type: 'error', duration: 1700})
          return false
        }

        updPasswordById(id, this.pwd).then(res => {
          if (res.success) {
            this.$notify({message: '成功修改密码', type: 'success', duration: 1700})
            this.pwd = {
              password: '',
              newPassword: ''
            }

          } else {
            this.$notify({message: res.message, type: 'error', duration: 1700})
          }
        })

      },

      // 获取纯文本
      computWordNumber(content) {
        let text = content.replace(/<[^>]*>|/g, "")
        text = text.replace('&nbsp;', ' ')
        if (text.length >= 100) {
          text = text.substring(0, 100)
          text += '......'
        }
        return text
      },

      showIsOR(id) {
        if (id == 1) {
          // 违章处理
          this.showIs = '1'
        } else if (id == 2) {
          // 获取积分
          this.showIs = '2'
        } else if (id == 3) {
          this.showIs = '3'
        }

      },


    }
  }
</script>

<style scoped>
  .home-container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
    background-color: #ededed;
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
    color: #bfdbc6;
  }

  /* ======= */
  /* 个人中心 */
  /* ======= */
  .person-show {
    width: 1200px;
    height: 100%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;

  }

  .person-show-left {
    width: 210px;
    height: 600px;
    border: solid 1px #dbdbdb;
    background-color: white;
    border-radius: 8px;
  }

  .person-show-left .name {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  .base {
    border-top: solid 1px #dbdbdb;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #bfdbc6;
    width: 100%;
    cursor: pointer;
  }

  .base:hover {
    color: white;
    background-color: #bfdbc6;
  }

  .person-show-right {
    width: 1200px;
    border: solid 1px #dbdbdb;
    background-color: white;
    border-radius: 6px;
    margin-bottom: 40px;
  }

  .person-show-right-div {
    height: 60px;
    background: linear-gradient(#fbfbfb, #ececec);
    border-bottom: solid 1px #dbdbdb;
    font-size: 18px;
    font-weight: 400;
    color: #626262;
    line-height: 60px;
  }

  .person-show-right-div span {
    margin-left: 20px;
  }

  .person-show-bar {
    width: 130px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .person-show-bar .base {
    font-size: 20px;
    color: #636363;
    font-weight: 600;
    margin-top: 14px;
  }

  .person-show-bar .base:hover {
    cursor: pointer;
    color: #bfdbc6;
  }


  .person-show-item {
    width: calc(100% - 130px);
    height: 100%;
    /*display: flex;*/
    /*flex-direction: column;*/
    padding: 10px;
  }

  .my-person {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .upd-pwd {
    width: 400px;
    margin: 120px 40px;
  }

  .pwd-info {
    margin-top: 20px;
    /*width: 70%;*/
  }

  .pwd-info3 {
    margin-top: 50px;
    float: right;
    width: 30%;
  }

  .my-order {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .my-address {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    color: black;

  }

  .my-address-item {
    width: 260px;
    height: 170px;
    border: solid 1px #cecece;
    margin-left: 30px;
    margin-top: 20px;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .my-address-item .uname {
    font-size: 20px;
    color: #333;
    font-style: normal;
    margin: 20px 0 20px 20px;
  }

  .my-address-item .phone {
    margin: 10px 20px;
    /*line-height: 22px;*/
    color: #757575;
  }

  .my-address-item .addresss {
    margin: 6px 20px;
    color: #757575;
  }

  .username {
    font-size: 20px;
    font-weight: 400;
    color: #616161;
    margin: 10px auto;
  }

  .avatar {
    width: 168px;
    height: 168px;
    border-radius: 50%;
    margin: 0 auto;
  }

  .my-person .name {
    width: 300px;
    display: flex;
    margin-top: 120px;
  }


  .container-item-hr {
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
    width: 100%;
    height: 60px;
    background-color: black;
    display: flex;
  }

  .container-item-hr .icon {
    width: 40px;
    height: 30px;
    cursor: pointer;
    margin: auto 30px;
    color: black;
    line-height: 60px;
  }

  .person-show-right-div-item {
    padding: 20px;
    margin-bottom: 40px;
    display: flex;

  }


  .btn2ww2 {
    margin-left: 20px;
    margin-top: 2px;
    background-color: #bfdbc6;
    width: 140px;
    height: 50px;
    margin-bottom: 10px;
  }

  .btn2ww2333 {
    background-color: #bfdbc6;
    text-align: right;
  }

  /deep/ .el-button--success:focus, .el-button--success:hover {
    background: #bfdbc6;
    border-color: #bfdbc6;
    color: #FFF;
  }

  /deep/ .el-button--success {
    color: #FFF;
    background-color: #bfdbc6;
    border-color: #bfdbc6;
  }

  /deep/ .el-button {
    padding: 0;
  }

  .addr .uname {
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
    margin-top: 10px;
  }

  .addr .phone {
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
    margin-top: 10px;
  }

  .addr .addresss {
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
    margin-top: 10px;
  }


  .addr {
    /*margin-left: 20px;*/
    margin-top: 20px;
    width: 80px;
    height: 40px;
    border: solid 1px #bfdbc6;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
  }

  .aaaaaaaa {
    display: flex;
    flex-wrap: wrap;
  }

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
    color: white;
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

  .el-button--primary {
    color: #FFF;
    background-color: #bfdbc6;
    border-color: #bfdbc6;
  }


  .dov {
    width: 200px;
    height: 440px;
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;
    border-radius: 10px;
    padding-top: 20px;

  }


  .dov-right {
    margin-left: 20px;
    width: 930px;
    min-height: 440px;
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;
    border-radius: 10px;
    padding-top: 20px;

  }


  .btn22 {
    margin-left: 50px;
    margin-top: 10px;
    background-color: #aac3b0;
    width: 80px;
    border-color: #bfdbc6;
    height: 30px;
  }

  .dov-right-item {
    padding: 0 20px;
  }

  .el-timeline-item__timestamp {
    font-size: 16px;
  }

  /deep/ .el-tabs__item.is-active {
    color: #ebb563;
  }

  /deep/ .el-tabs__item:hover {
    color: #ebb563;
    cursor: pointer;
  }

  /deep/ .el-tabs__active-bar {
    background-color: #ebb563;
  }

  /deep/ .el-table th > .cell {
    font-size: 14px;
  }

  .bb {
    margin-top: 4px;
  }

  .xiangqing {
    cursor: pointer;
    color: #ebb563;
    margin-left: 10px;
  }
</style>
