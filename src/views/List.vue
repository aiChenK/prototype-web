<template>
  <div>
    <!-- 搜索栏 -->
    <el-row class="table-search">
      <el-col :span="24">
        <el-select 
          placeholder="选择产品（可输入）" 
          v-model="params.projectName"
          allow-create
          filterable
          clearable
          size="small"
          @change="search"
        >
          <el-option
            v-for="item in $store.state.projects"
            :key="item"
            :label="item"
            :value="item"
            >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-show="data.length"
      :data="data"
      :header-row-class-name="headClassName"
      style="width: 100%"
    >
      <el-table-column prop="projectName" label="所属产品" width="200"> </el-table-column>
      <el-table-column prop="name" label="项目名" width="300">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" @click="jump(scope.row.path)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="迭代周期" :formatter="iterateFormatter" width="250"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="280" align="left"> </el-table-column>
      <el-table-column prop="updateTime" label="最后更新时间" width="280" align="left"> </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="text" @click="jumpTo(scope.row.path)">去查看</el-button>
          <!-- <el-button type="text" @click="testFun()">去查看</el-button> -->
          <!-- <el-popconfirm
            title="确定删除吗？"
            icon="el-icon-info"
            icon-color="red"
            confirm-button-type="text"
            @confirm="deleteById(scope.row.id)"
            v-show="$store.state.isLogin"
          >
            <el-button slot="reference" type="text">删除</el-button>
          </el-popconfirm> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-show="data.length"
      class="table-page"
      layout="total, sizes, prev, pager, next"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>

    <!-- 无数据展示 -->
    <el-row v-show="!data.length">
      <el-col :span="24">
        <el-empty description="暂无数据"></el-empty>
        <el-button v-if="$store.state.isLogin" type="success" size="small" plain round @click="$router.push({name: 'upload'})">去上传</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {GET, POST} from '@/utils/http'
export default {
  data() {
    return {
      headClassName: "table-header",
      total: 0,
      data: [],
      params: {
        status: 1,
        page: 1,
        size: 10,
        projectName: ""
      }
    };
  },
  methods: {
    headClass() {},
    search() {
      GET('/api/prototype', this.params)
        .then(res => {
          this.total = res.data.total
          this.data = res.data.data
        })
    },
    handleSizeChange(size) {
      this.params.size = size
      this.search()
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.search()
    },
    iterateFormatter(row, column, cellValue, index) {
      let start = '', end = ''
      if (row.startDate) {
        let date = new Date(row.startDate)
        start = (date.getMonth() + 1) + '月' + date.getDate() + '日'
      }
      if (row.endDate) {
        let date = new Date(row.endDate)
        end = (date.getMonth() + 1) + '月' + date.getDate() + '日'
      }
      
      return start + ' - ' + end
    },
    deleteById(id) {
      this.$message.info("暂不支持 - " + id)
    }
  },
  mounted() {
    this.search()
  },
};
</script>

<style scoped>
.el-table /deep/ .table-header > th {
  background-color: #fafafa;
  font-weight: 500;
  color: #000000d9;
}
.table-page {
  margin-top: 20px;
  text-align: right;
}
.table-search {
  margin-bottom: 20px;
  padding-left: 20px;
  text-align: left;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
}
</style>