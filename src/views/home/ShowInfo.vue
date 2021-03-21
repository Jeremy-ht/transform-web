<template>
  <div style="margin-bottom: 30px">
    <div class="header">
      <div class="header-item">

        <div class="header-item-icon" @click="goHome">
          智能交通查询平台
        </div>

      </div>
    </div>

    <div class="div-top">
      <el-card shadow="header" class="el-card-div">
        <div class="content-div">

          <h1 style="text-align: center;color: #333333">{{newsInfo.creatime.substring(0,10)}}</h1>

          <div style="font-size: 14px;color: #a29e9e;">
            来源：{{newsInfo.author}}<span class="shuxian">|</span>{{newsInfo.creatime}}
          </div>

          <div class="content-p">
            <p v-html="newsInfo.content"/>
          </div>

        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
  import {getInfoDeatilByIdToday} from '../../api/common'

  export default {
    name: "ShowInfo",
    data() {
      return {
        newsId: '',
        newsInfo: {},
        userInfo: {
          id: '',
          username: '',
          password: '',
          email: '',
          sex: '',
          ico: '',
        },

      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        this.newsId = this.$route.params.id

        await getInfoDeatilByIdToday(this.newsId).then(res => {
          if (res.success) {
            this.newsInfo = res.data.data
          }
        })

      },

      // 去首页
      goHome() {
        this.$router.push({path: `/home`})
      },

      getUserInfo() {
        // 没有登录跳转到登录页面
        if (window.localStorage.getItem("userInfo") === null) {
          const {href} = this.$router.resolve({path: '/login'})
          window.open(href, '_blank')
          return
        } else {
          this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"))
        }
      },


    },
  }
</script>

<style scoped>
  .div-top {
    margin: 0;
    padding-top: 10px;
    padding-bottom: 50px;
    background-color: #f7f7f7;
  }

  .el-card-div {
    margin-left: 5%;
    margin-right: 5%;
    /*padding-bottom: 330px;*/
  }

  .content-div {
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 50px;
  }

  .content-p {
    font-size: 17px;
    line-height: 32px;
    color: #333333;
    margin-top: 37px;

  }

  .shuxian {
    padding-left: 8px;
    padding-right: 8px;
  }

  .comment {
    margin-left: 5%;
    margin-right: 5%;
    /*border: 1px red solid;*/
    width: 70%;
    height: 100%;
    margin-bottom: 30px;
  }

  .comment-number {
    width: 20%;
    height: 50px;
    /*border: 1px red solid;*/
    font-size: 20px;
    color: #55a532;
  }

  .comment-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px #dbdbdb solid;
    margin-top: 15px;
  }

  .comment-content-name {
    width: 90%;
    margin-bottom: 10px;

  }

  .comment-content-span {
    width: 90%;
    margin-left: 7%;
    margin-bottom: 15px;
    font-size: 15px;
    color: #222;
  }

  .write-comment {
    width: 100%;
    display: flex;
    margin-top: 10px;
    border-bottom: 1px #dbdbdb solid;
  }

  .write-comment-content {
    width: 93%;
    height: 100px;
    /*border: 1px yellow solid;*/
    margin-bottom: 10px;
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
</style>
