<template>
  <div class="container">
    <el-dialog :visible.sync="resetPasswordDialog" title="重置密码">
      <el-form>
        <el-form-item label="新密码">
          <el-input v-model="resetPasswordForm.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="resetPasswordForm.confirmPassword" type="password" />
        </el-form-item>
        <div style="display: flex;flex-direction: row;align-items: center;justify-content: center">
          <el-form-item>
            <el-button type="primary" @click="resetPassword">确定</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <div class="my-card" style="width: 100% ;overflow-y: auto">
      <div class="filter-container">
        <div>
          <el-input
            v-model="listQuery.query"
            class="filter-item"
            placeholder="关键词"
            size="small"
            style="width: 200px;margin-right: 10px"
          />

          <el-button class="filter-item" icon="el-icon-search" size="small" type="primary" @click="getList">
            搜索
          </el-button>
        </div>
        <el-button icon="el-icon-refresh" size="mini" @click="getList" />

      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        :stripe="true"
        fit
        highlight-current-row
        style="width: 100%; "
      >
        <el-table-column align="center" label="用户ID" prop="userId" width="140">
          <template slot-scope="{row}">
            <span>{{ row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名" min-width="140" prop="phone">
          <template slot-scope="{row}">
            <span>{{ row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电话号码" prop="phone" width="200">
          <template slot-scope="{row}">
            <span>{{ row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="性别" prop="sex" width="200">
          <template slot-scope="{row}">
            <span>{{ row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色" prop="roleId" width="200">
          <template slot-scope="{row}">
            <span>{{ row.roleId === 1 ? '管理员' : '普通用户' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="280">
          <template slot-scope="row">
            <el-button size="mini" @click="$router.push(`/user/update/${row.row.userId}`)">
              修改用户信息
            </el-button>

            <el-button size="mini" type="warning" @click="resetPasswordDialog=true;currentUser=row.row.userId">
              重置密码
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <div style="display:flex;flex-direction: row;justify-content: center;margin-top: 15px;">
        <el-pagination
          :current-page="listQuery.pageIndex"
          :hide-on-single-page="false"
          :page-size="100"
          :page-sizes="[10,20,40]"
          :total="results.count"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </div>

  </div>
</template>

<script>
import { getAllUsers, resetPassword } from '@/api/user'

export default {
  name: 'SysUserList',

  data() {
    return {
      currentUser: null,
      list: null,
      listLoading: true,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        query: ''
      },
      resetPasswordForm: {
        password: '',
        confirmPassword: ''
      },
      resetPasswordDialog: false,
      form: {
        patentId: '',
        type: ''
      },
      results: { count: 0 }

    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSearch() {
      this.listQuery.pageIndex = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      getAllUsers(this.listQuery).then(response => {
        this.results = response.data.data
        this.list = response.data.data.list
        console.log(this.results)
        this.listLoading = false
      })
    },
    resetPassword() {
      if (this.resetPasswordForm.password.length < 6) {
        this.$message({
          type: 'error',
          message: '密码长度不能小于6位!'
        })
        return
      }
      if (this.resetPasswordForm.password !== this.resetPasswordForm.confirmPassword) {
        this.$message({
          type: 'error',
          message: '两次输入的密码不一致!'
        })
        return
      }
      this.$confirm('此操作将重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPassword({ userId: this.currentUser, password: this.resetPasswordForm.password }).then(response => {
          this.$message({
            type: 'success',
            message: '重置成功!'
          })
          this.resetPasswordDialog = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    }

  }
}
</script>
<style scoped>

</style>
