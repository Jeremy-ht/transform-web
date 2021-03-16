<template>
  <div class="app-container">
    <el-card class="box-card" shadow="hover">

      <!--表格-->
      <el-table height="375" :data="userList" stripe style="width: 100%; margin-top: 10px" border>
        <el-table-column label="#" type="index" align="center"/>
        <el-table-column label="用户名" prop="uname" align="center"/>


        <el-table-column label="联系方式" prop="phone" align="center" />
        <el-table-column label="车牌号" prop="cph" align="center" />
        <el-table-column label="车辆颜色" prop="color" align="center" />

        <el-table-column label="车辆图片" prop="carimage" align="center">
          <template slot-scope="scope">
            <img style="width: 50px;height: 50px" :src="scope.row.carimage" alt="">
          </template>
        </el-table-column>

        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span style="margin-left: 10px">{{ scope.row.creatime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="积分" prop="carimage" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.jf }}</span>
          </template>
        </el-table-column>


        <el-table-column label="操作" align="center" width="100px">
          <template slot-scope="scope">
            <el-button class="admin-add-btn" type="primary" size="mini"
                       @click="getWZ(scope.row.id)">查看违章
            </el-button>
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
  import { getUserList, disableUserById, ableUserById } from '../../api/common'

  export default {

    data() {
      return {
        // 分页查询
        pagenum: 1,
        pagesize: 8,
        pageTotal: 0,

        userList: []
      }
    },
    components: {
      PageBar

    },
    created() {
      this.getUserList()

    },
    methods: {
      // 初始化
      getUserList() {
        let params = {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        getUserList(params).then(res => {
          if (res.success) {
            this.pageTotal = res.data.total
            this.userList = res.data.data
            this.userList.forEach(item => {
              if (item.email == '' || item.email == null) {
                item.email = '- - -'
              }
            })

          }
        })
      },

      // 分页
      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        this.getUserList()
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getUserList()
      },

      // 禁用
      delUserBtn(id) {
        this.$confirm('是否确定禁用该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          disableUserById(id).then(res => {
            if (res.success) {
              this.getUserList()
              this.$notify({ message: res.message, type: 'success', duration: 1700 })
            } else {
              this.$notify({ message: res.message, type: 'error', duration: 1700 })
            }
          })
        })

      },

      // 获取违章信息
      getWZ(id){


      },

      // 解禁
      ableUserBtn(id) {
        console.log(id)
        this.$confirm('是否确定解禁该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ableUserById(id).then(res => {
            if (res.success) {
              this.getUserList()
              this.$notify({ message: res.message, type: 'success', duration: 1700 })
            } else {
              this.$notify({ message: res.message, type: 'error', duration: 1700 })
            }
          })
        })

      }

    }
  }
</script>

<style scoped>

  .admin-add-btn {
    margin-bottom: 10px;
    float: left;
    background-color: #5a98de;
  }

  /* ======= */
  /* 按钮颜色改变 */
  /* ======= */
  /deep/ .el-button--primary:focus, .el-button--primary:hover {
    background: #5a98de;
    border-color: #5a98de;
    color: #FFF;
  }

  /deep/ .el-button--primary {
    color: #FFF;
    background-color: #5a98de;
    border-color: #5a98de;
  }
</style>

