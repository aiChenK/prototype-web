<template>
  <el-form
    ref="form"
    :model="prototype"
    :rules="rules"
    label-width="100px"
    class="pro-form"
  >
    <el-form-item label="所属产品" prop="projectName">
      <el-select
        placeholder="选择产品（可输入）"
        v-model="prototype.projectName"
        allow-create
        filterable
        clearable
        style="width: 100%"
      >
        <el-option
          v-for="item in $store.state.projects"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="项目名" prop="name">
      <el-input
        v-model="prototype.name"
        maxlength="30"
        placeholder="项目名（建议添加版本号）"
      ></el-input>
    </el-form-item>

    <el-form-item label="迭代周期">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="开始日期"
          v-model="prototype.startDate"
          style="width: 100%"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-col>
      <el-col class="line" :span="2" style="text-align: center">-</el-col>
      <el-col :span="11">
        <el-date-picker
          placeholder="结束日期"
          v-model="prototype.endDate"
          style="width: 100%"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-col>
    </el-form-item>

    <el-form-item label="原型文件" prop="path">
      <el-switch
        v-model="useOutsidePath"
        active-text="外链模式"
        inactive-text="上传模式"
      >
      </el-switch>
      <el-upload
        :action="uploadUrl"
        name="file"
        ref="upload"
        accept=".zip"
        :limit="1"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadError"
        :on-remove="fileRemove"
        drag
        v-show="!useOutsidePath"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip" style="margin-top: -10px">
          <i class="el-icon-warning-outline"></i>
          只能上传zip压缩文件
        </div>
      </el-upload>
      <el-input
        v-model="prototype.path"
        v-show="useOutsidePath"
        placeholder="请输入外链地址"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">{{
        prototypeId ? "保存" : "立即上传"
      }}</el-button>
      <el-button v-if="!prototypeId" @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GET, POST, PATCH } from "@/utils/http";
export default {
  name: "RecordForm",
  props: {
    editData: Object,
  },
  data() {
    return {
      uploadUrl: "/api/prototype/file",
      useOutsidePath: false,
      prototypeId: 0,
      prototype: {
        name: "",
        projectName: "",
        path: "",
        startDate: null,
        endDate: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入项目名（带版本号）",
            trigger: "blur",
          },
          { min: 1, max: 30, message: "最多输入30字", trigger: "blur" },
        ],
        projectName: [
          { required: true, message: "请选择所属产品", trigger: "change" },
        ],
        path: [
          {
            required: true,
            message: "请先上传文件/输入地址",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //文件上传，填充路径
    fileUploadSuccess(response, file, fileList) {
      this.prototype.path = response.path;
      this.$refs["form"].validateField(["path"]);
    },
    fileUploadError(err, file, fileList) {
      let res = JSON.parse(err.message);
      this.$message.error(res ? res.msg : "错误:" + err.message);
    },
    //移除文件，清空path
    fileRemove(file, fileList) {
      this.prototype.path = "";
      this.$refs.form.validateField(["path"]);
      // setTimeout(() => this.$refs.form.validateField(['path']), 1200)
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
        if (!this.prototypeId) {
            //创建
            POST("/api/prototype", this.prototype).then((res) => {
                this.resetForm();
                this.$store.dispatch("getProjects");
                this.$router.push({ name: "list" });
            });
        } else {
            //编辑
            PATCH("/api/prototype/" + this.prototypeId, this.prototype).then((res) => {
                this.$store.dispatch("getProjects");
                this.$emit('search')
                this.$emit('closeDrawer')
            });
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.$refs.upload.clearFiles();
    },
  },
  computed: {
    showFileUpload() {
      return !this.prototype.path;
    },
  },
  mounted() {
    if (this.editData) {
      this.prototypeId = this.editData.id;
      this.useOutsidePath = this.editData.path.indexOf("http") === 0;
      Object.assign(this.prototype, this.editData);
    }
  },
};
</script>

<style scoped>
.pro-form {
  text-align: left;
}
</style>