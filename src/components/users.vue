<template>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchinput">
      <el-col :span="12">
        <el-input
          @clear="getAllUser"
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain @click="showAddUesr()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%" height="450">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="160">
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="220">
        <template slot-scope="scope">
          <el-switch
            @change="changestate(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            @click="showEditUser(scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
          ></el-button>
          <el-button
            @click="showDeleUser(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
          ></el-button>
          <el-button
            @click="showUserRole(scope.row)"
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户-对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="formdata" label-position="left" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="formdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="formdata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUsers()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="formdata" label-position="left" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="formdata.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUsers()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="formdata" label-position="left" label-width="80px">
        <el-form-item label="用户名">{{formdata.username}}</el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectVal" placeholder="请选择用户角色">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option
              :label="item.roleName"
              :value="item.id"
              v-for="(item) in roles"
              :key="item.id"
            ></el-option>
            <!-- <el-option :label="区域二" :value="beijing" v-for="(item,i) in roles" key="item.id"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="roleUsers()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      value2: true,
      query: "",
      list: [],
      // currentPage4: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,
      formdata: { username: "", password: "", email: "", mobile: "" },
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      selectVal: -1,
      roles: []
    };
  },

  created() {
    this.getUserList();
  },
  methods: {
    // 分配角色
    async roleUsers() {
      const res = await this.$http.put(`users/${this.formdata.id}/role`, {
        rid: this.selectVal
      });
      // console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      console.log(res);

      if (status === 200) {
        this.$message.success(msg);
        this.dialogFormVisibleRole = false;
        // selectVal: -1;
      }
    },
    // 显示--分配用户角色
    async showUserRole(user) {
      this.formdata = user;
      this.dialogFormVisibleRole = true;
      const res = await this.$http.get(`roles`);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.roles = data;
        console.log(this.roles);
      }
      // 显示当前用户的角色
      const res2 = await this.$http.get(`users/${user.id}`);
      // console.log(res2);
      // const {
      //   meta: { msg, status },
      //   data2
      // } = res2.data;
      if (res2.data.meta.status === 200) {
        this.selectVal = res2.data.data.rid;
      }
    },
    // 修改状态
    async changestate(user) {
      // console.log(user);

      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      }
    },
    // 编辑用户
    async editUsers() {
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      );
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.dialogFormVisibleEdit = false;
        this.getUserList();
      }
      // console.log(res);
    },
    // 编辑用户--显示对话框
    showEditUser(user) {
      this.formdata = user;
      this.dialogFormVisibleEdit = true;
    },
    // 删除用户
    showDeleUser(id) {
      this.$confirm("是否确定删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${id}`);
          console.log(res);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            // 提示框
            this.$message({
              type: "success",
              message: msg
            });

            // 更新表格
            this.pagenum = 1;
            this.getUserList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加用户
    async addUsers() {
      const res = await this.$http.post(`users`, this.formdata);
      // console.log(res);

      this.getUserList();
      this.pagenum = 1;
      this.$message({
        message: "新用户添加成功",
        type: "success"
      });

      this.dialogFormVisibleAdd = false;
    },

    // 显示添加用户
    showAddUesr() {
      this.formdata = {};
      this.dialogFormVisibleAdd = true;
    },
    // 搜索查看全部用户
    getAllUser() {
      this.getUserList();
    },
    // 搜索
    searchUser() {
      this.pagenum = 1;
      this.getUserList();
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    async getUserList() {
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      // console.log(res);
      const {
        data,
        meta: { status, msg }
      } = res.data;
      if (status === 200) {
        this.list = data.users;
        this.total = data.total;
      }
    }
  }
};
</script>

<style>
.searchinput {
  margin: 20px;
}
</style>
