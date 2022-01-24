<template>
  <el-result icon="warning" title="" subTitle="页面未授权">
    <template slot="icon">
      <svg
        t="1642950213509"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1860"
      >
        <path
          d="M512 0a512 512 0 1 1 0 1024A512 512 0 0 1 512 0z m298.666667 426.666667H170.666667v128h640V426.666667z"
          p-id="1861"
          fill="#bfbfbf"
        ></path>
      </svg>
    </template>

    <template slot="extra">
      <el-link type="primary" href="/">返回主页</el-link>
    </template>
  </el-result>
</template>

<script>
export default {};
</script>

<style scoped>
svg {
  width: 200px;
  height: 200px;
}
</style>