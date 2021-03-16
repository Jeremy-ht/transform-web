<template>
  <div class="app-container">
    <el-card class="box-card" shadow="hover">

      <!--表格-->
      <el-table :data="allDetailList" stripe style="width: 100%; margin-top: 10px" border size="small">

        <el-table-column label="#" type="index" align="center"/>

        <el-table-column label="时间" align="center" width="170px">>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.creatime}}</span>
          </template>
        </el-table-column>

        <el-table-column label="内容" prop="newstitle" align="center"/>


        <el-table-column label="发布时间" align="center" width="170px">>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.creatime}}</span>
          </template>
        </el-table-column>


        <el-table-column label="操作" align="center" width="100px">
          <template slot-scope="scope">
            <div style="color: red;cursor: pointer" @click="delDetailBtn(scope.row.id)">
              删除
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <page-bar :pageTotal="pageTotal" :pageNum="pagenum" :pageSize="pagesize"
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>


    </el-card>

  </div>
</template>

<script>
  import PageBar from '@/components/PageBar'
  import {getSceneryList, delInfo, getInfoList, pullScenery2, delToday, getTodayList} from '../../api/common'

  export default {

    data() {
      return {
        adminInfo: {},

        // 分页查询
        pagenum: 1,
        pagesize: 8,
        pageTotal: 0,

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
          this.$notify({message: '对不起，请您先登录系统', type: 'error', duration: 1700})
          this.$router.push('/login')
          return
        } else {
          this.adminInfo = admin
        }


        let params = {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        await getTodayList(params).then(res => {
          this.myDetailList = []
          if (res.success && res.data.data.length != 0) {
            this.pageTotal = res.data.total
            this.allDetailList = res.data.data
          } else {
            this.$notify({
              message: '获取失败，请刷新',
              type: 'error', duration: 1700
            })
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

      delDetailBtn(id) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delToday(id).then(res => {
            if (res.success) {
              this.$notify({message: '删除成功', type: 'success', duration: 1700})
              this.getInit()
            } else {
              this.$notify({message: '删除失败', type: 'error', duration: 1700})

            }
          })
        })

      },

    }
  }
</script>

<style scoped>


</style>
