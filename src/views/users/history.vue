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
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="60"
        >
          <template slot-scope="{row}">
            <span>{{ row.traceID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="{row}">
            <span>{{ row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="详细信息" min-width="120px">
          <template slot-scope="{row}">
            <span>{{ row.request }}</span>
          </template>
        </el-table-column>
        <el-table-column label="请求时间" width="300px">
          <template slot-scope="{row}">
            <span>{{ row.CreatedAt|localTime }}</span>
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
import { getTraceList } from '@/api/trace'

export default {
  name: 'ComplexTable',

  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        query: ''
      }

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
      getTraceList(this.listQuery).then(response => {
        this.results = response.data.data
        this.list = response.data.data.list.reverse()
        this.listLoading = false
      })
    }
  }
}
</script>
<style>

</style>
