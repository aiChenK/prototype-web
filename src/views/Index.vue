<template>
  <el-container style="height: 100%;">
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Index",
  components: {
    Header: () => import("@/views/layout/Header"),
  },
};
</script>

<style scoped>
.el-header {
  height: 50px !important;
}
</style>