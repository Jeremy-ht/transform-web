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


<!--      <div id="main" style="width: 500px;height: 500px;">-->

<!--      </div>-->


    </div>
  </div>
</template>

<script>
  import '../../assets/iconfont/iconfont'
  import {delAdmin, getEchartsOrder, getHomeCount} from '../../api/common'
  import * as echart from "echarts"

  export default {
    name: 'Dashboard',
    data() {
      return {
        home: {},
        user: {},
        username: '',
        charts: '',
        opinion: ['男', '女'],
        opinionData: []

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


        // getEchartsOrder().then(res => {
        //   if (res.success) {
        //     this.opinionData = []
        //     this.opinionData = res.data.data
        //   }
        // })
        //
        // let myChart = echart.init(document.getElementById('main'))
        // // 绘制图表
        // myChart.setOption(
        //   {
        //     title: {
        //       text: '2021年度月总销售订单',
        //       left: 'left',
        //       textStyle: {
        //         color: '#FF8040'
        //       }
        //     },
        //     xAxis: {
        //       type: 'category',
        //       data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月',
        //         '8月', '9月', '10月', '11月', '12月']
        //     },
        //     yAxis: {
        //       type: 'value',
        //       boundaryGap: [0, 1]
        //     },
        //     series: [{
        //       data: this.opinionData,
        //       type: 'bar'
        //     }]
        //
        //   })
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
