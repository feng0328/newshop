<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <cusBread level1="权限管理" level2="权限列表" class="cbd"></cusBread>
    <!-- 表格 -->
    <!-- authName: "商品管理"
    id: 101
    level: "0"
    path: "goods"
    pid: 0-->
    <el-table :data="list" style="width: 100%" height="550">
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column prop="path" label="路径" width="200"></el-table-column>
      <el-table-column label="层级" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      const res = await this.$http.get(`rights/list`);
      //   console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.list = data;
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.cbd {
  margin-bottom: 20px;
}
</style>
