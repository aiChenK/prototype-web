<template>
  <el-menu
    :default-active="$route.name"
    mode="horizontal"
    router
    background-color="#fff"
    text-color="#595959"
    active-text-color="#2d8cf0"
    class="menu-header"
  >
    <el-menu-item index="list" :route="{ name: 'list' }" class="menu-item">原型列表</el-menu-item>
    <el-menu-item index="upload" :route="{ name: 'upload' }" class="menu-item" :disabled="checkIsLogin == false">上传原型</el-menu-item>
    <el-menu-item index="history" :route="{ name: 'history' }" class="menu-item">历史原型</el-menu-item>
    
    <!-- 右上角头部 -->
    <div class="header-user">
      <el-link v-show="!checkIsLogin" @click="authBox" style="color:#000000a6;">认证</el-link>
      <el-dropdown v-show="checkIsLogin" @command="handleCommand">
        <span class="el-dropdown-link">
          已认证<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import {GET, POST} from "@/utils/http"
export default {
  data() {
    return {
    }
  },
  methods: {
    checkLogin() {
      GET('/api/login/info', {}, {errorMsg: false})
      .then(res => {
        this.$store.commit("login")
      })
    },
    login(pwd) {
      POST('/api/login', {pwd: pwd})
        .then(res => {
          this.$store.commit("login")
        })
    },
    handleCommand(command) {
      eval("this." + command + "()")
    },
    loginOut() {
      POST('api/login/out')
        .then(res => {
          this.$store.commit("loginOut")
          this.$router.push({name: 'list'})
        })
        .catch(err => {
          return true
        })
    },
    authBox() {
      this.$prompt('', '输入密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: "password",
          inputPattern: /.+/,
        }).then(({ value }) => {
          this.login(value)
        }).catch(() => {
          this.$message.info("取消输入")      
        });
    }
  },
  mounted() {
    this.checkLogin()
    this.$store.dispatch('getProjects')
  },
  computed: {
    checkIsLogin() {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>
.menu-header {
  height: 50px;
}
.menu-header /deep/ .menu-item {
  height: 50px;
  line-height: 50px;
  font-weight: 500;
}
.header-user {
  position: absolute;
  right: 20px;
  height: 50px;
  line-height: 50px;
}
.header-user .el-dropdown-link {
  cursor: pointer;
  color: #67c23a;
  font-weight: 500;
}
</style>