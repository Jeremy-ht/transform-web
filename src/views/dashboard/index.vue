<template>
  <div class="home-container">
    <div class="home">


      <div class="my">

        <div style="margin: 20px 70px">
          <span style="font-size: 18px">欢迎登录后台系统，</span>
          <span style="font-size: 26px">{{' '+username}}
            <el-button style="margin-left: 20px" size="mini" type="primary" @click.native="logout">退出</el-button></span>
          <span style="margin-left: 10px">

          </span>
        </div>

        <div style="color: #979797;font-size: 14px;margin-top:10px">
          <div class="aa">姓名: <span class="qqq">{{user.name}}</span></div>
          <div class="aa">用户名:<span class="qqq2">{{user.username}}</span></div>
          <div class="aa">联系方式:<span class="qqq3">{{user.phone}}</span></div>
          <div class="aa">注册时间:<span class="qqq3">{{user.creatime}}</span></div>
        </div>

        <div style="margin-top:40px; margin-left:252px;">

        </div>

      </div>


      <!--      <div class="home-item">-->
      <!--        &lt;!&ndash; 图标 &ndash;&gt;-->
      <!--        <div class="home-item-svg item">-->
      <!--          <svg class="icon iconfont" aria-hidden="true">-->
      <!--            <use xlink:href="#icon-yonghu1"/>-->
      <!--          </svg>-->
      <!--        </div>-->

      <!--        &lt;!&ndash; 文字 &ndash;&gt;-->
      <!--        <div class="home-item-text item">-->
      <!--          <div class="text-div" @click="goPath(1)">新增用户</div>-->
      <!--          <div class="number-div" @click="goPath(1)">{{home.todayUser}}</div>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class="home-item">-->
      <!--        &lt;!&ndash; 图标 &ndash;&gt;-->
      <!--        <div class="home-item-svg item">-->
      <!--          <svg class="icon iconfont" aria-hidden="true">-->
      <!--            <use xlink:href="#icon-tubiaozhizuomobanyihuifu-"/>-->
      <!--          </svg>-->
      <!--        </div>-->

      <!--        &lt;!&ndash; 文字 &ndash;&gt;-->
      <!--        <div class="home-item-text item">-->
      <!--          <div class="text-div" @click="goPath(2)">用户总计</div>-->
      <!--          <div class="number-div" @click="goPath(2)">{{home.totalUser}}</div>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class="home-item">-->
      <!--        &lt;!&ndash; 图标 &ndash;&gt;-->
      <!--        <div class="home-item-svg item">-->
      <!--          <svg class="icon iconfont" aria-hidden="true">-->
      <!--            <use xlink:href="#icon-fengjing"/>-->
      <!--          </svg>-->
      <!--        </div>-->

      <!--        &lt;!&ndash; 文字 &ndash;&gt;-->
      <!--        <div class="home-item-text item">-->
      <!--          <div class="text-div" @click="goPath(3)">新增景点</div>-->
      <!--          <div class="number-div" @click="goPath(3)">{{home.detail}}</div>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class="home-item">-->
      <!--        &lt;!&ndash; 图标 &ndash;&gt;-->
      <!--        <div class="home-item-svg item">-->
      <!--          <svg class="icon iconfont" aria-hidden="true">-->
      <!--            <use xlink:href="#icon-pinglun1"/>-->
      <!--          </svg>-->
      <!--        </div>-->

      <!--        &lt;!&ndash; 文字 &ndash;&gt;-->
      <!--        <div class="home-item-text item">-->
      <!--          <div class="text-div" @click="goPath(4)">新增评论</div>-->
      <!--          <div class="number-div" @click="goPath(4)">{{home.comment}}</div>-->
      <!--        </div>-->
      <!--      </div>-->

    </div>
  </div>
</template>

<script>
  import '../../assets/iconfont/iconfont'
  import {delAdmin, getHomeCount} from '../../api/common'

  export default {
    name: 'Dashboard',
    data() {
      return {
        home: {},
        user: {},
        username: '',

      }
    },
    created() {
      this.init()

    },
    methods: {

      // 初始化
      init() {
        let admin = JSON.parse(window.localStorage.getItem('AdminInfoFlower'))
        if (admin == undefined || admin == null || admin == '') {
          this.$router.push('/login')
          this.$notify({message: '请先登录再操作', type: 'error', duration: 1700})
          return
        }
        this.user = admin
        this.username = admin.username

      },

      goPath(id) {
        switch (id) {
          case 1:
            this.$router.push({path: '/sys/user'})
            break
          case 2:
            this.$router.push({path: '/sys/user'})
            break
          case 3:
            this.$router.push({path: '/scenery/list'})
            break
          case 4:
            this.$router.push({path: '/comment/commentList'})
            break

        }

      },

      logout() {

        this.$confirm('确定退出系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.removeItem("AdminInfoFlower")
          this.$router.push(`/login`)
        })


      },


    }

  }
</script>

<style scoped>

  .home-container {
    display: flex;
    flex-wrap: wrap;
  }

  .home {
    margin: 50px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .aa {
    margin-top: 10px;
    margin-left: 70px;
  }

  .qqq {
    margin-left: 40px;
  }

  .qqq2 {
    margin-left: 30px;
  }

  .qqq3 {
    margin-left: 14px;
  }

  .my {
    margin: 30px 70px;
    background-color: #f3f3f3;
    border-radius: 6px;
    width: 480px;
    height: 280px;
    display: flex;
    flex-direction: column;

  }

  .home-item {
    width: 220px;
    height: 108px;
    background-color: #dcece5;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    display: flex;
  }

  .item {
    width: 110px;
    height: 100%;
    display: flex;

  }

  .home-item-text {
    flex-direction: column;
    /*justify-content: center;*/
  }

  .text-div {
    margin: 30px auto 5px;
    font-size: 18px;
    color: rgba(0, 0, 0, .45);
    font-weight: 600;
    cursor: pointer;
  }

  .number-div {
    margin: 5px auto;
    font-weight: 700;
    font-size: 20px;
    color: #666;
    cursor: pointer;
  }


  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    font-size: 68px;
    margin: auto;
  }
</style>
