<template>
  <div class="app-container" style="margin-top: 50px;" >
    <el-form :model="addDetail" ref="ruleForm" label-width="140px" class="detail-form">


      <el-form-item label="标题">
        <el-input v-model="addDetail.newstitle" show-word-limit class="textarea base-width-50"/>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <editor api-key="u6hiizd3o4r3p4mhnvag8b7fc9hhs8yivqdddzqbd60tyoh5" :init="tinymceConfig"
                v-model="addDetail.newscontent" style="z-index: 0"/>
      </el-form-item>


      <el-form-item label="咨询热度">
        <el-radio-group v-model="addDetail.newshot">
          <el-radio label="1">普通 </el-radio>
          <el-radio label="2">热点 </el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item label="图片">
        <el-upload class="avatar-uploader"
                   action="http://127.0.0.1:9000/upload/updataFile"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess">
          <img v-if="addDetail.newscover !== ''" :src="addDetail.newscover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>


      <el-form-item style="text-align: left;margin-top: 60px">
        <el-button type="success" @click="submitForm"><i class="el-icon-upload"></i>&nbsp;&nbsp;发布</el-button>
        <el-button style="margin-left: 100px" type="success" @click="submitForm2"><i class="el-icon-check"></i>&nbsp;&nbsp;保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {getCategoryList, uploadFile, addInfo} from '../../api/common'
  import '../../assets/iconfont/iconfont'
  import Editor from '@tinymce/tinymce-vue'

  let addDetailInfo = {
    newstitle: '',
    newscontent: '',
    newshot: "1",
    author: '',
    state: 1,
    newscover: ''
  }

  export default {
    name: 'add',
    data() {
      return {
        addDetail: addDetailInfo,
        cateList: [],    // 分类列表

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

        // 获取分类
        let params = {
          pagenum: 1,
          pagesize: 100
        }
        getCategoryList(params).then(res => {
          if (res.success) {
            this.cateList = res.data.data

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
        if (this.addDetail.newstitle == '') {
          this.$notify({message: '请添加标题', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.newscontent == '') {
          this.$notify({message: '请添加详情', type: 'error', duration: 1700})
          return false
        }

        // if (this.addDetail.newscover == '') {
        //   this.$notify({message: '请添加图片', type: 'error', duration: 1700})
        //   return false
        // }

        return true
      },

      // 发布
      submitForm() {
        if (!this.checkForm()) {
          return false;
        }

        this.addDetail.state = 1

        addInfo(this.addDetail).then(res => {
          if (res.success) {
            this.$notify({message: '发布成功', type: 'success', duration: 1700})
            this.resetForm()
            this.init()
          } else {
            this.$notify({message: '发布失败', type: 'error', duration: 1700})
          }
        })
      },

      // 保存
      submitForm2() {
        if (!this.checkForm()) {
          return false;
        }

        this.addDetail.state = 7

        addInfo(this.addDetail).then(res => {
          if (res.success) {
            this.$notify({message: '保存成功', type: 'success', duration: 1700})
            this.resetForm()
            this.init()
          } else {
            this.$notify({message: '保存失败', type: 'error', duration: 1700})
          }
        })
      },

      // 重置表单
      resetForm() {
        this.addDetail = {
          newstitle: '',
          newscontent: '',
          newshot: "1",
          state: 1,
          newscover: ''
        }
      },

      // 封面上传成功
      handleAvatarSuccess(res, file) {
        if (res.success) {
          this.addDetail.newscover = res.data.location
        } else {
          this.$notify({message: '封面上传失败，请重新上传', type: 'error', duration: 1700})
        }

      }

    }
  }
</script>

<style scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .detail-form {
    margin: 10px 10%;
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


  .avatar {
    width: 273px;
    height: 153px;
    margin: 4px auto;
    display: block;
    border-radius: 2.5%;
  }

  /* ======= */
  /* 上传图片 */
  /* ======= */
  /*/deep/ .avatar-uploader .el-upload:hover {*/
  /*  !*border-color: #5a98de;*!*/
  /*}*/

  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    width: 273px;
    height: 153px;
    line-height: 153px;
    text-align: center;
    border: solid 1px #adadad;
  }

  /*/deep/ .el-switch.is-checked .el-switch__core {*/
  /*  border-color: #5a98de;*/
  /*  background-color: #5a98de;*/
  /*}*/

  /*/deep/ .el-radio__input.is-checked + .el-radio__label {*/
  /*  color: #5a98de;*/
  /*}*/

  /*/deep/ .el-radio__input.is-checked .el-radio__inner {*/
  /*  border-color: #5a98de;*/
  /*  background: #5a98de;*/
  /*}*/

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
