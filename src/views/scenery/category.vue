<template>
  <div class="app-container" style="margin-top: 50px;" >
    <el-card class="box-card" shadow="hover">

      <!--表格-->
      <el-table :data="allDetailList" stripe style="width: 100%; margin-top: 10px" border size="small">

        <el-table-column label="#" type="index" align="center"/>
        <el-table-column label="咨询标题" prop="newstitle" align="center"/>


        <el-table-column label="咨询图片" prop="image" align="center">
          <template slot-scope="scope">
            <img style="width: 90px;height: 60px":src="scope.row.newscover" alt="">
          </template>
        </el-table-column>

        <el-table-column label="创建者" prop="author"  align="center"/>

        <el-table-column label="创建时间" align="center" width="170px">>
          <template slot-scope="scope">
            <span style="margin-left: 10px"><i class="el-icon-date"/>{{' '+ scope.row.creatime}}</span>
          </template>
        </el-table-column>


        <el-table-column label="状态" align="center" width="170px">
            <el-tag type="warning">待发布</el-tag>
        </el-table-column>


        <el-table-column label="操作" align="center" width="170px">
          <template slot-scope="scope">
            <div style="color: gold;cursor: pointer;display:inline-block" @click="pullDetail(scope.row.id)">
             发布
            </div>
            <div style="color: red;cursor: pointer;display:inline-block;margin-left: 20px" @click="delDetailBtn(scope.row.id)">
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
  import {pullInfo, delInfo, getInfoList, pullScenery2, delScenery, disableComment} from '../../api/common'

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
        await getInfoList(7, params).then(res => {
          this.allDetailList = []
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
        this.$confirm('是否确定发布此交通咨询?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pullInfo(id, 1).then(res => {
            if (res.success) {
              this.$notify({message: '发布成功', type: 'success', duration: 1700})
              this.getInit()
            } else {
              this.$notify({message: '发布失败', type: 'error', duration: 1700})
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
              this.$notify({message: '删除成功', type: 'success', duration: 1700})
              this.getInit()
            } else {
              this.$notify({message: '删除失败', type: 'error', duration: 1700})

            }
          })
        })

      },

      changeState(id, state) {
        if (state == 1) {
          state = 3
        } else {
          state = 1
        }
        pullScenery2(id, state).then(res => {
          if (res.success) {
            this.getInit()
          } else {
            this.$notify({message: '删除失败', type: 'error', duration: 1700})

          }
        })
      }

    }
  }
</script>

<style scoped>


</style>
