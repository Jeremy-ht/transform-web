<template>
	<div class="div-top">
		<el-card shadow="header" class="el-card-div">
			<div class="content-div">

				<h1 style="text-align: center;color: #333333">{{newsInfo.newstitle}}</h1>

				<div style="font-size: 14px;color: #a29e9e;">
					来源：{{newsInfo.author}}<span class="shuxian">|</span>{{newsInfo.releasetime}}
				</div>

				<div class="content-p">
					<p v-html="newsInfo.newscontent"/>
				</div>

			</div>

			<div class="comment">
				<div class="comment-number">
					<span style="font-size: 28px;margin-left: 8px;color: #36ff25">{{pageTotal}}</span>
					<span style="color: #657180;font-size: 20px;margin-left: 8px">条评论</span>
				</div>

				<div class="write-comment">

					<span style="width: 7%">
						<img :src="userInfo.ico"
						     width="28px" height="28px" style="border-radius:50%">
					</span>

					<span class="write-comment-content">
						<el-input type="textarea" placeholder="写下您的评论..."
						          v-model="commentInfo.commentary"/>
						 <el-button type="info" size="small" @click="commentCommit"
						            style="margin-top: 10px;margin-left: 92.7%">
							 评论
						 </el-button>
					</span>

				</div>

				<div class="comment-content" v-for="item in commentList">
					<span style="width: 7%;">
						<img :src="item.ico"
						     width="28px" height="28px" style="border-radius:50%">
					</span>

					<span class="comment-content-name">
						<span style="font-size: 16px;color: #ff6817;">{{item.username}}</span>
						<span style="margin-left: 15px;color: #657180;font-size: 16px;">{{item.createtime}}</span>
					</span>

					<span class="comment-content-span">
						{{item.commentary}}
					</span>

				</div>

			</div>

		</el-card>
	</div>
</template>

<script>
  // import {request} from "network/network"

  const comments = {
    newsid: '',
    userid: '',
    commentary: '',
  }

  export default {
    name: "ShowNewsInfo",
    data() {
      return {
        newsId: '',
        newsInfo: {},

        // 评论表单
        commentInfo: comments,
        commentList: [],
        pageTotal: 0,
        userInfo: {
          id: '',
          username: '',
          password: '',
          email: '',
          sex: '',
          ico: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },

      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        // this.newsId = this.$route.params.id
        // this.commentInfo.newsid = this.$route.params.id
        // this.newsInfo = JSON.parse(window.sessionStorage.getItem('newsInfo'))
        // this.getCommentList()
        // this.getUserInfo()

      },

      // 提交评论
      async commentCommit() {
        this.getUserInfo()
        this.commentInfo.userid = this.userInfo.id
        this.commentInfo.commentary = this.commentInfo.commentary.trim()
        await request({
          url: `comment/addUserComment`,
          data: this.commentInfo,
          method: 'post'
        }).then(res => {
          if (res.code === 200) {
            this.commentInfo.commentary = ''
            this.getCommentList()
          } else {
            this.$message({message: '评论失败', type: 'error', duration: 1700})
          }

        }).catch(res => {
          this.$message({message: '评论失败', type: 'error', duration: 1700})
        })
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

      // 获取评论列表
      async getCommentList() {
        await request({
          url: `comment/getUserCommentList/0/100/${this.newsId}`,
          method: 'get'
        }).then(res => {
          if (res.code === 200) {
            this.commentList = res.data.data
            this.pageTotal = res.data.total
          } else {
            this.$message({message: '获取评论列表失败', type: 'error', duration: 1700})
          }

        }).catch(res => {
          this.$message({message: '获取评论列表失败', type: 'error', duration: 1700})
        })
      }

    },
  }
</script>

<style scoped>
	.div-top {
		margin: 0;
		padding: 0;
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
</style>
