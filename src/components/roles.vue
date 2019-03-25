<template>
  <el-card>
    <!-- 面包屑 -->
    <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
    <!-- 按钮 -->
    <el-button type="primary" plain class="btn">添加角色</el-button>
    <!-- 表格 -->

    <el-table :data="roles" style="width: 100%" height="450">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item1) in scope.row.children" :key="item1.id">
            <el-col :span="4">
              <el-tag closable @close="deleTag(scope.row,item1)" class="tag">{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
              <!-- <el-icon-arrow-right></el-icon-arrow-right> -->
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2) in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag
                    closable
                    class="tag"
                    type="success"
                    @close="deleTag(scope.row,item2)"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    class="tag"
                    type="warning"
                    v-for="(item3) in item2.children"
                    :key="item3.id"
                    @close="deleTag(scope.row,item3)"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length===0">
            <el-col>未分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="220"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="240"></el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
          <el-button
            @click="showSetRights(scope.row)"
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-tree
        ref="treeDom"
        :data="treedata"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrCheck"
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRights()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      treedata: [],
      arrCheck: [],
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "authName"
      },
      currRoleId: -1
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    // 设置权限
    async setRights() {
      // 获取全选
      const arr1 = this.$refs.treeDom.getCheckedKeys();
      const arr2 = this.$refs.treeDom.getHalfCheckedKeys();
      const arr = [...arr1, ...arr2];

      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(",")
      });
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.getRoles();
        this.dialogVisible = false;
      }
    },
    // 删除单个权限
    async deleTag(role, rightId) {
      const res = await this.$http.delete(
        `roles/${role.id}/rights/${rightId.id}`
      );
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        // this.getRoles();
        role.children = data;
      }
    },
    async getRoles() {
      const res = await this.$http.get("roles");
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.roles = data;
      }
    },
    // 打开树形结构
    async showSetRights(rights) {
      this.currRoleId = rights.id;
      this.dialogVisible = true;
      const res = await this.$http.get(`rights/tree`);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.treedata = data;
        const temp = [];
        rights.children.forEach(item1 => {
          // temp.push(item1.id);
          item1.children.forEach(item2 => {
            // temp.push(item2.id);
            item2.children.forEach(item3 => {
              temp.push(item3.id);
            });
          });
        });
        this.arrCheck = temp;
      }
    }
  }
};
</script>

<style>
.btn {
  margin-top: 20px;
  margin-bottom: 20px;
}
.tag {
  margin-top: 5px;
}
</style>
