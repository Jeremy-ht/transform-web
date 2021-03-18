<template>
  <div class="app-container" style="margin-top: 50px;" >
    <el-card class="box-card" shadow="hover">

      <!--表格-->
      <el-table :data="allDetailList" stripe style="width: 100%; margin-top: 10px" border size="small">

        <el-table-column label="#" type="index" align="center"/>
        <el-table-column label="违章人员" prop="username" align="center"/>
        <el-table-column label="积分扣除" prop="jf" align="center"/>
        <el-table-column label="应缴罚款" prop="pay" align="center"/>



        <el-table-column label="提交人员" prop="author"  align="center"/>

        <el-table-column label="剩余积分" prop="waitjf" align="center"/>
        <el-table-column label="提交时间" align="center" width="170px">>
          <template slot-scope="scope">
            <span style="margin-left: 10px"><i class="el-icon-date"/>{{' '+ scope.row.creatime}}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center" width="170px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.top == 1" type="success">已处理</el-tag>
            <el-tag v-else type="danger">未处理</el-tag>
          </template>

        </el-table-column>




<!--        <el-table-column label="上下架状态" align="center" width="200px">-->
<!--          <template slot-scope="scope">-->
<!--            <el-switch-->
<!--              @change="changeState(scope.row.id, scope.row.state)"-->
<!--              v-model="scope.row.state == 1"-->
<!--              inactive-text="已下架"-->
<!--              inactive-color="#f3f3f3"-->
<!--              active-color="#5a98de"-->
<!--              active-text="上架">-->
<!--            </el-switch>-->
<!--          </template>-->
<!--        </el-table-column>-->


<!--        <el-table-column label="操作" align="center" width="100px">-->
<!--          <template slot-scope="scope">-->
<!--            <div style="color: red;cursor: pointer" @click="delDetailBtn(scope.row.id)">-->
<!--              删除-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->

      </el-table>

      <!--分页-->
      <page-bar :pageTotal="pageTotal" :pageNum="pagenum" :pageSize="pagesize"
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>


    </el-card>

  </div>
</template>

<script>
  import PageBar from '@/components/PageBar'
  import { getWzList,delInfo,getInfoList, pullScenery2, delScenery, disableComment } from '../../api/common'

  export default {

    data() {
      return {
        activeName: 'first',
        adminInfo: {},

        // 分页查询
        pagenum: 1,
        pagesize: 8,
        pageTotal: 0,

        // 我的列表分页
        pagenumMy: 1,
        pagesizeMy: 8,
        pageMyTotal: 0,

        myDetailList: [],
        allDetailList: []

      }
    },
    components: {
      PageBar

    },
    created() {
      this.getInit()

    },
    methods: {
      // 初始化
      async getInit() {
        let admin = JSON.parse(window.localStorage.getItem('AdminInfoFlower'))
        if (admin == undefined || admin == null || admin == '') {
          this.$notify({ message: '对不起，请您先登录系统', type: 'error', duration: 1700 })
          this.$router.push('/login')
          return
        } else {
          this.adminInfo = admin
        }


        let params = {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        await getWzList(0, params).then(res => {
          if (res.success && res.data.data.length != 0) {
            this.pageTotal = res.data.total
            this.allDetailList = res.data.data
          }
        })

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

      pullDetail(id) {
        this.$confirm('是否确定发布?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pullScenery2(id).then(res => {
            if (res.success) {
              this.$notify({ message: '发布成功', type: 'success', duration: 1700 })
              this.getInit()
            } else {
              this.$notify({ message: '发布失败', type: 'error', duration: 1700 })
            }
          })
        })

      },


      delDetailBtn(id) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delInfo(id).then(res => {
            if (res.success) {
              this.$notify({ message: '删除成功', type: 'success', duration: 1700 })
              this.getInit()
            } else {
              this.$notify({ message: '删除失败', type: 'error', duration: 1700 })

            }
          })
        })

      },

      changeState(id, state) {
        console.log(state)
        if (state == 1){
          state = 3
        }else {
          state = 1
        }
        pullScenery2(id, state).then(res => {
          if (res.success) {
            this.getInit()
          } else {
            this.$notify({ message: '删除失败', type: 'error', duration: 1700 })

          }
        })
      }

    }
  }
</script>

<style scoped>


</style>
