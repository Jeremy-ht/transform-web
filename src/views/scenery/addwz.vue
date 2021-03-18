<template>
  <div class="app-container" style="margin-top: 50px;">
    <el-form :model="addDetail" ref="ruleForm" label-width="140px" class="detail-form">


      <el-form-item label="违章人员">
        <el-select v-model="addDetail.userid" placeholder="违章人员" class="base-width-30" clearable>
          <el-option v-for="item in userList" :label="item.uname" :value="item.id"
                     :key="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="扣除积分">
        <el-select v-model="addDetail.jf" placeholder="扣除积分" class="base-width-30" clearable>
          <el-option v-for="item in 12" :label="item" :key="item"/>
        </el-select>
      </el-form-item>


      <el-form-item label="应缴罚款">
        <el-input placeholder="应缴罚款" v-model="addDetail.fk"/>
      </el-form-item>


      <el-form-item label="违章信息">
        <editor api-key="u6hiizd3o4r3p4mhnvag8b7fc9hhs8yivqdddzqbd60tyoh5" :init="tinymceConfig"
                v-model="addDetail.content" style="z-index: 0"/>
      </el-form-item>


      <el-form-item style="text-align: left;margin-top: 60px">
        <el-button type="success" @click="submitForm"><i class="el-icon-upload"></i>&nbsp;&nbsp;提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {getUserListAll, uploadFile, addWz, addInfo} from '../../api/common'
  import '../../assets/iconfont/iconfont'
  import Editor from '@tinymce/tinymce-vue'

  export default {
    name: 'addwz',
    data() {
      return {
        addDetail: {
          userid: 0,
          content: '',
          js: 0,
          author: '',
          fk: 0,
        },
        userList: [],

        adminInfo: {},

        // tinymce初始化配置
        tinymceConfig: {
          height: 600,
          width: 700,
          menubar: true,
          branding: false,
          language: 'zh_CN',
          language_url: '/tinymce/langs/zh_CN.js',
          images_upload_handler: function (blobInfo, success, failure) {
            let formData = new FormData()
            formData.append('file', blobInfo.blob(), blobInfo.filename())
            uploadFile(formData).then(res => {
              if (res.success) {
                success(res.data.location)
              } else {
                failure('图片编辑失败')
              }
            }).catch(res => {
              this.$notify({message: '图片编辑失败', type: 'error', duration: 1700})
            })

          },
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'code wordcount'
          ],
          toolbar:
            ' image  | \
            alignleft aligncenter alignright alignjustify'

        }
      }
    },
    components: {
      Editor
    },
    created() {
      this.init()

    },
    methods: {
      async init() {

        this.loginIs()

        getUserListAll().then(res => {
          if (res.success) {
            this.userList = res.data.data

          }
        })

      },

      // 是否登录 Admin
      loginIs() {
        let admin = JSON.parse(window.localStorage.getItem('AdminInfoFlower'))
        if (admin == undefined || admin == null || admin == '') {
          this.$router.push('/login')
          this.$notify({message: '请您登录再操作', type: 'error', duration: 1700})
          return false
        } else {
          this.adminInfo = admin
          this.addDetail.author = admin.username
          return true
        }

      },


      // 校验
      checkForm() {
        if (this.addDetail.userid == 0) {
          this.$notify({message: '请选择违章人员', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.content == '') {
          this.$notify({message: '请填写违章详情信息', type: 'error', duration: 1700})
          return false
        }

        return true
      },

      // 发布
      submitForm() {
        if (!this.checkForm()) {
          return false;
        }


        addWz(this.addDetail).then(res => {
          if (res.success) {
            this.$notify({message: '提交成功', type: 'success', duration: 1700})
            this.resetForm()
            this.init()
          } else {
            this.$notify({message: '提交失败', type: 'error', duration: 1700})
          }
        })
      },

      // 重置表单
      resetForm() {
        this.addDetail = {
          userid: '',
          content: '',
          js: 0,
          author: '',
          fk: '',
        }
      },

    }
  }
</script>

<style scoped>

  .detail-form {
    margin: 10px 10%;
  }

  .base-width-50 {
    width: 50%
  }

  .base-width-30 {
    width: 30%
  }

  /deep/ .el-button--success {
    color: #FFF;
    background-color: #5a98de;
    border-color: #5a98de;
  }

  /deep/ .el-button--success:focus, .el-button--success:hover {
    background: #5a98de;
    border-color: #5a98de;
    color: #FFF;
  }
</style>
