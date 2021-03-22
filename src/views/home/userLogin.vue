<template>
  <div class="login-container">

    <div class="header">
      <div class="header-item">

        <div class="header-item-icon" @click="goHome">
          智能交通查询平台
        </div>

        <div class="register-go" @click="showLoginOr = !showLoginOr">
          <span v-if="showLoginOr">注册</span>
          <span v-else>登录</span>
        </div>

      </div>
    </div>

    <div class="login-div" v-if="showLoginOr">


      <div style="margin: 20px auto;color: black;border-bottom: solid 1px #ebebeb">
        <h3>智能交通平台登录</h3>
      </div>

      <!-- 登录表单 -->
      <div class="login-form">

        <el-form label-width="0" class="login_form"
                 :model="loginForm2" :rules="loginFormRules">
          <!--用户名-->
          <el-form-item>
            <el-input class="form-input" placeholder="用户名"
                      v-model="loginForm2.uname" :autofocus="true"/>
          </el-form-item>

          <!--密码-->
          <el-form-item>
            <el-input class="form-input" type="password"
                      placeholder="密码" v-model="loginForm2.pwd"/>
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <div class="form-btn" @click="login">
              <div class="login-span">登 &nbsp;&nbsp;&nbsp;录</div>
            </div>
          </el-form-item>


        </el-form>
      </div>

    </div>

    <!-- ========================= -->
    <!-- 注册 -->
    <!-- ========================= -->
    <div style="margin: 0 auto;width: 1100px;height: 100%;display: flex;flex-direction: column" v-if="!showLoginOr">

      <div style="width: 800px;margin: 0 auto">
        <el-steps v-if="active== 1" :active="1" finish-status="success" simple style="margin-top: 4px">
          <el-step title="第一步 填写个人信息">
          </el-step>
          <el-step title="第二步 填写车辆信息"></el-step>
        </el-steps>

        <el-steps v-else :active="2" finish-status="success" simple style="margin-top: 4px">
          <el-step title="第一步 填写个人信息">
          </el-step>
          <el-step title="第二步 填写车辆信息"></el-step>
        </el-steps>
      </div>

      <div v-if="active == 1" class="login-div22">

        <div style="margin: 4px auto;color: black">
          <h3>智能交通平台注册</h3>
        </div>

        <!-- 登录表单 -->
        <div class="register-form">
          <el-form ref="loginFormRef" label-position="right"
                   :model="registerForm" :rules="loginFormRules2">
            <!--用户名-->
            <el-form-item>
              <el-input placeholder="用户名" v-model="registerForm.uname"
                        :autofocus="true"/>
            </el-form-item>

            <!--密码-->
            <el-form-item>
              <el-input type="password" placeholder="密码"
                        v-model="registerForm.pwd"/>
            </el-form-item>

            <!--手机号-->
            <el-form-item prop="phone">
              <el-input placeholder="手机号" v-model="registerForm.phone"/>
            </el-form-item>

            <!-- 登录按钮 -->
            <el-form-item>
              <div class="form-btn22" @click="registerGo">
                <div class="login-span"><i class="el-icon-right"></i>&nbsp;下一步</div>
              </div>
            </el-form-item>

          </el-form>

        </div>


      </div>

      <div v-if="active == 2" class="login-div22" style="height: 460px;">

        <div style="margin: 4px auto;color: black">
          <h3>智能交通平台注册</h3>
        </div>


        <div class="register-form">
          <el-form label-position="right"
                   :model="registerForm">

            <el-form-item>
              <el-input placeholder="车牌号" v-model="registerForm.cph"
                        :autofocus="true"/>
            </el-form-item>


            <el-form-item>
              <el-input placeholder="车辆颜色" v-model="registerForm.color"/>
            </el-form-item>


            <el-form-item>
              <el-upload class="avatar-uploader"
                         action="http://127.0.0.1:9000/upload/updataFile"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess">
                <img v-if="registerForm.carimage !== ''" :src="registerForm.carimage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
              <span style="color: red">*</span> 上传车辆图片
            </el-form-item>

            <!-- 登录按钮 -->
            <el-form-item>
              <div class="form-btn22" style="margin-top: -16px" @click="registerGo2">
                <div class="login-span"> 注 册</div>
              </div>
            </el-form-item>

          </el-form>

        </div>


      </div>


    </div>


  </div>
</template>

<script>
  import {userLogin, addUser} from '../../api/common'

  export default {
    name: 'userLogin',
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
        //表单数据绑定
        loginForm2: {
          uname: '',
          pwd: ''
        },
        //表单验证
        loginFormRules: {
          uname:
            [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 1, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
            ],
          pwd:
            [
              {required: true, message: '请输入密码', trigger: 'blur'},
              {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
            ]
        },

        showLoginOr: true,
        //表单验证
        loginFormRules2: {
          uname:
            [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
            ],
          pwd:
            [
              {required: true, message: '请输入密码', trigger: 'blur'},
              {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
            ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: checkMobile, trigger: 'blur'}
          ]
        },
        // 注册表单
        registerForm: {
          uname: '',
          pwd: '',
          sex: '1',
          phone: '',
          cph: '',
          color: '',
          carimage: '',
          jf: 12,
        },

        active: '1',

      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        if (this.$route.params.id == 2) {
          this.showLoginOr = false
        }

      },

      async login() {
        if (this.loginForm2.uname.trim() == '') {
          this.$notify.error({
            title: '错误',
            message: '用户名不能为空'
          });
          return
        }

        if (this.loginForm2.pwd.trim() == '') {
          this.$notify.error({
            title: '错误',
            message: '密码不能为空'
          });
          return
        }
        await userLogin(this.loginForm2).then(res => {
          if (res.success) {
            res.data.data.pwd = ''
            res.data.data.salt = ''
            window.localStorage.setItem('UserInfoPhone', JSON.stringify(res.data.data))
            this.$router.push({path: '/home'})
          } else {
            this.$notify({message: res.message, type: 'error', duration: 1700})

          }

        })

      },

      // 去首页
      goHome() {
        this.$router.push({path: `/home`})
      },

      async registerGo() {
        if (this.registerForm.uname.trim() == '') {
          this.$notify({
            title: '警告', message: '用户名不能为空', type: 'warning'
          });
          return
        }

        if (this.registerForm.pwd.trim() == '') {
          this.$notify({
            title: '警告', message: '密码不能为空', type: 'warning'
          });
          return
        }

        if (this.registerForm.phone.trim() == '') {
          this.$notify({
            title: '警告', message: '手机号不能为空', type: 'warning'
          });
          return
        }

        this.active = '2'

      },

      registerGo2() {

        if (this.registerForm.cph == '' ||
          this.registerForm.uname.color == '' ||
          this.registerForm.uname.carimage == '') {
          this.$notify({
            title: '警告', message: '车辆信息必须全部填写', type: 'warning'
          });
          return
        }


        addUser(this.registerForm).then(res => {
          if (res.success) {
            this.$notify({message: '注册成功', type: 'success', duration: 2000})
            this.showLoginOr = true
          } else {
            this.$notify({message: '注册失败', type: 'error', duration: 2000})

          }
        })
      },

      // 封面上传成功
      handleAvatarSuccess(res, file) {
        if (res.success) {
          this.registerForm.carimage = res.data.location
        } else {
          this.$notify({message: '封面上传失败，请重新上传', type: 'error', duration: 1700})
        }

      }

    }
  }
</script>

<style scoped>

  .login-container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .login-div {
    width: 400px;
    height: 360px;
    background-color: white;
    margin: 40px auto;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    border: solid 2px #d6d6d6;
  }

  .login-div22 {
    width: 400px;
    height: 360px;
    background-color: white;
    margin: 40px auto;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    border: solid 2px #d6d6d6;
  }

  .left-image {
    width: 300px;
    height: 100%;

  }

  .login-form {
    margin: 0 auto;
  }

  .icon111 {
    width: 50px;
    height: 40px;
    margin: 20px auto 0 auto;
    cursor: pointer;
  }

  .form-input {
    width: 330px;
    display: flex;
    /*border-radius: 3px;*/
  }

  .form-btn {
    float: right;
    margin-top: 30px;
    width: 100px;
    background-color: #161616;
    cursor: pointer;
    display: flex;
    border-radius: 5px;
    line-height: 34px;
    height: 34px;
    text-align: center;
  }

  .form-btn22 {
    /*margin-top: 10px;*/
    width: 330px;
    background-color: #3f699a;
    cursor: pointer;
    display: flex;
    border-radius: 5px;
    line-height: 40px;
    height: 40px;
    text-align: center;
  }

  .form-btn2 {
    /*margin-top: 30px;*/
    width: 330px;
    background-color: #ffb01e;
    cursor: pointer;
    display: flex;
    border-radius: 3px;
    line-height: 40px;
    height: 40px;
    text-align: center;
  }


  .login-span {
    color: white;
    margin: auto;
    font-size: 18px;
    font-weight: 500;
  }

  .register-go {
    font-size: 14px;
    line-height: 60px;
    margin-right: 10px;
    cursor: pointer;

  }

  .register-go-a {
    float: right;
    /*margin-left: 32px;*/
    font-size: 14px;
    font-weight: 600;
    color: #d81e06;
  }


  .register-form {
    margin: 0 auto;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #ffb01e;
  }

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #ffb01e;
    background: #ffb01e;
  }

  .right-div {
    background: linear-gradient(#fff, #f5f5f5);
    box-shadow: 0 1px 4px rgba(0, 0, 0, .08);
  }

  /deep/ .el-link.el-link--default:hover {
    color: #e47a0f;
  }

  /deep/ .el-link.el-link--default:hover {
    color: #e47a0f;
  }

  .header {
    width: 100%;
    height: 60px;
    background-color: #fafafa;
    border-bottom: solid 1px #d2d2d2;
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

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
    border: 1.4px #d9d9d9 dashed;
  }

</style>
