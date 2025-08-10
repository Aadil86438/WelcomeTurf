<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6" elevation="2">
          <div class="display-1 font-weight-bold">Welcome Tea Stall Gang</div>
          <div class="subtitle-1 mt-2">Weekly overview and quick actions</div>
          <v-btn class="mt-4 mr-2" color="primary" dark to="/add" router>
            <v-icon left>mdi-plus</v-icon> Add Expense
          </v-btn>
          <v-btn class="mt-4" color="secondary" dark to="/expenses" router>
            <v-icon left>mdi-table</v-icon> View All Expenses
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" md="3">
        <v-card class="pa-4" outlined>
          <div class="subtitle-2 text--secondary">Total Weekly Expenses</div>
          <div class="display-1 font-weight-bold mt-2">₹ {{ totalAmount.toFixed(2) }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-4" outlined>
          <div class="subtitle-2 text--secondary">Total Players</div>
          <div class="display-1 font-weight-bold mt-2">{{ totalPlayers }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-4" outlined>
          <div class="subtitle-2 text--secondary">Highest Expense</div>
          <div class="display-1 font-weight-bold mt-2">₹ {{ highestExpense.toFixed(2) }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-4" outlined>
          <div class="subtitle-2 text--secondary">Lowest Expense</div>
          <div class="display-1 font-weight-bold mt-2">₹ {{ lowestExpense.toFixed(2) }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-icon left color="primary">mdi-account-multiple</v-icon>
            Players
          </v-card-title>
          <v-divider />
          <v-container>
            <v-row>
              <v-col v-for="(p, idx) in players" :key="idx" cols="12" sm="6" md="4" lg="3">
                <v-card class="pa-4" elevation="1">
                  <v-avatar color="primary" size="40" class="mb-3">
                    <span class="white--text subtitle-1">{{ p.charAt(0) }}</span>
                  </v-avatar>
                  <div class="subtitle-1 font-weight-medium">{{ p }}</div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['players', 'totalAmount', 'highestExpense', 'lowestExpense', 'totalPlayers'])
  },
  created() {
    this.$store.dispatch('loadFromStorage')
  }
}
</script>

<style scoped>
.display-1 {
  line-height: 1.2;
}
</style>


