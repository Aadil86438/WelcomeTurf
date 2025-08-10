<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card class="pa-4" elevation="2">
        <v-card-title>
          <v-icon left color="primary">mdi-chart-line</v-icon>
          Weekly Expenses Trend
        </v-card-title>
        <line-chart :labels="weekly.labels" :values="weekly.values" />
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="pa-4" elevation="2">
        <v-card-title>
          <v-icon left color="primary">mdi-chart-donut</v-icon>
          Category Distribution
        </v-card-title>
        <doughnut-chart :labels="byCat.labels" :values="byCat.values" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { Line, Doughnut, mixins } from 'vue-chartjs'
import { mapGetters } from 'vuex'
const { reactiveProp } = mixins

const LineChart = {
  name: 'LineChart',
  extends: Line,
  mixins: [reactiveProp],
  props: ['labels', 'values'],
  mounted() {
    this.renderChart({
      labels: this.labels,
      datasets: [{
        label: 'Weekly Total',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        borderColor: '#2E7D32',
        data: this.values,
        fill: true
      }]
    }, { responsive: true, maintainAspectRatio: false })
  }
}

const DoughnutChart = {
  name: 'DoughnutChart',
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['labels', 'values'],
  mounted() {
    const colors = ['#2E7D32', '#00BCD4', '#FFC107', '#E53935', '#8E24AA']
    this.renderChart({
      labels: this.labels,
      datasets: [{
        backgroundColor: colors.slice(0, this.labels.length),
        data: this.values
      }]
    }, { responsive: true, maintainAspectRatio: false })
  }
}

export default {
  name: 'Statistics',
  components: {
    LineChart,
    DoughnutChart
  },
  computed: {
    ...mapGetters(['weeklyTrend', 'byCategory']),
    weekly() { return this.weeklyTrend },
    byCat() { return this.byCategory }
  },
  created() {
    this.$store.dispatch('loadFromStorage')
  }
}
</script>

<style scoped>
 .v-card { height: 420px; }
 .v-card .v-card__text { height: 320px; }
</style>


