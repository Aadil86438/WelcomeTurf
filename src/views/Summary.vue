<template>
  <v-card class="pa-5" elevation="2">
    <v-card-title>
      <v-icon left color="primary">mdi-chart-bar</v-icon>
      Expense Summary
    </v-card-title>
    <v-card-text>
      <bar-chart :labels="chart.labels" :values="chart.values" />
    </v-card-text>
  </v-card>
</template>

<script>
import { Bar, mixins } from 'vue-chartjs'
import { mapGetters } from 'vuex'
const { reactiveProp } = mixins

const BarChart = {
  name: 'BarChart',
  extends: Bar,
  mixins: [reactiveProp],
  props: ['labels', 'values'],
  mounted() {
    this.renderChart({
      labels: this.labels,
      datasets: [{
        label: 'Total per Player',
        backgroundColor: '#00BCD4',
        data: this.values
      }]
    }, { responsive: true, maintainAspectRatio: false })
  }
}

export default {
  name: 'Summary',
  components: { BarChart },
  computed: {
    ...mapGetters(['chartTotalsPerPlayer']),
    chart() { return this.chartTotalsPerPlayer }
  },
  created() {
    this.$store.dispatch('loadFromStorage')
  }
}
</script>

<style scoped>
.v-card__text { height: 420px; }
</style>


