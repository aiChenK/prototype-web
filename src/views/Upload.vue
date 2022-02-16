<template>
  <el-row>
    <el-col :span="12">
      <RecordForm></RecordForm>
    </el-col>
  </el-row>
</template>

<script>
import RecordForm from '@/views/components/RecordForm'
export default {
  name: "Upload",
  data() {
    return {
      
    }
  },
  components: {
    RecordForm
  }
}
</script>

<style scoped>
.pro-form {
  text-align: left;
}
</style>