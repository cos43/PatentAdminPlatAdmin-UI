<template>

  <div class="container" style="display: flex;flex-direction: row">
    <div class="my-card" style="width: 100% ;">

      <div class="filter-container">
        <div>
          <el-input
            v-model="listQuery.query"
            class="filter-item"
            placeholder="工单信息"
            size="small"
            style="width: 200px;margin-right: 10px"
          />

          <el-button class="filter-item" disabled icon="el-icon-search" size="small" type="primary">
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
        style="width: 100%;"
      >

        <el-table-column align="center" label="ID" prop="团队id" sortable="custom" width="100">
          <template slot-scope="{row}">
            <span>{{ row.deptId }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="团队简介" min-width="150px">

          <template slot-scope="{row}">
            <span>{{ row.deptProperties }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="研究方向" width="110px">

          <template slot-scope="{row}">
            <span>{{ row.researchInterest }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="成员详情" width="150">
          <template slot-scope="{row}">
            <el-button
              class="detail"
              icon="el-icon-view"
              size="mini"
              type="warning"
              @click="getMembers(row.deptId)"
            >
              查看
            </el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="180">
          <template slot-scope="{row}">
            <el-button size="mini" type="danger" @click="ShowDeptApply(row)">
              详情
            </el-button>

          </template>
        </el-table-column>

      </el-table>

    </div>

  </div>

</template>
<script>

import waves from '@/directive/waves' // waves directive
import { getDeptList } from '@/api/dept'

export default {
  name: 'TeamList',
  directives: { waves },

  data() {
    return {

      list: null,
      listLoading: true,
      listQuery: {
        pageSize: 10,
        pageIndex: 1
      },
      query: '',
      results: {}

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getDeptList().then(response => {
        this.list = response.data.data

        this.listLoading = false
      })
    }

  }
}
</script>
<style scoped>

</style>
