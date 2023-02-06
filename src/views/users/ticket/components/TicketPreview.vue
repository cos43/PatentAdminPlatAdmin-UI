<template>
  <div>
    <el-page-header content="预览" @back="switchPage('index')" />

    <div class="ticket-preview">
      <h3>工单信息</h3>
      <div>
        <h4>{{ ticket.name }}</h4>
      </div>
      <h3>表单信息</h3>
      <div v-for="key in properties.keys" :key="key">
        <h4>{{ key.value }}</h4>
        <p style="font-size: 14px">{{ properties[key.key] }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TicketPreview',
  props: {
    switchPage: {
      type: Function,
      default: () => {
      }
    },

    ticket: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      properties: []
    }
  },
  watch: {
    ticket: {
      handler() {
        this.properties = JSON.parse(this.ticket.properties)
        console.log(this.properties)
      },
      immediate: true
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit')
    }
  }
}
</script>
<style scoped>
.ticket-preview {
  margin: 30px 0;
}
</style>
