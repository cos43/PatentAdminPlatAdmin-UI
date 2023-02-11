<template>
  <div class="container">
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
        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="200">
          <template slot-scope="row">
            <el-button size="mini" @click="unClaimClick(row)">
              修改用户信息
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
      <el-dialog :visible.sync="editDescFromVisible" center title="修改备注" width="30%">
        <el-form>
          <el-form-item label="备注">
            <el-input v-model="description" placeholder="修改备注" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDescFromVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateDesc">确定</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import { getAllUsers } from '@/api/user'

export default {
  name: 'ComplexTable',
  data() {
    return {
      patents: null,
      reportList: null,
      patentId: 0,
      editDescFromVisible: false,
      currentPatent: null,
      description: '',
      reportDialogFormVisible: false,
      list: null,
      claim: [],
      listLoading: true,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        query: ''
      },
      flag: 0,
      form: {
        patentId: '',
        type: ''
      },
      results: { count: 0 },
      formLabelWidth: '120px'

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
    }

  }
}
</script>
<style scoped>

</style>
