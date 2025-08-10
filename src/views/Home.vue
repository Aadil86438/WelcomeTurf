<template>
  <div>
    <v-card class="pa-6 mb-4 gradient-card" elevation="3">
      <div class="overline white--text mb-2">This Week's Total</div>
      <div class="display-1 font-weight-bold white--text">₹ {{ weeklyTotal.toFixed(2) }}</div>
      <div class="white--text mt-2">Keep pushing, team! Every contribution counts.</div>
    </v-card>

    <v-card class="pa-5 mb-6" elevation="2">
      <v-card-title>
        <v-icon left color="primary">mdi-plus-circle</v-icon>
        Add Expense
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValid" lazy-validation>
          <v-row>
            <v-col cols="12" md="4">
              <v-select :items="players" v-model="form.name" label="Name" :rules="[r]" outlined clearable />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.description" label="Description" :rules="[r]" outlined />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model.number="form.amount" type="number" prefix="₹" label="Amount" :rules="[a]" outlined />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="reset">Reset</v-btn>
        <v-btn color="primary" dark @click="submit">Add</v-btn>
      </v-card-actions>
    </v-card>

    <v-row>
      <v-col cols="12" md="6" v-for="e in sortedExpenses" :key="e.id">
        <v-card class="pa-4" elevation="1">
          <div class="subtitle-1">
            <strong>{{ e.name }}</strong> spent <strong>₹ {{ Number(e.amount).toFixed(2) }}</strong>
            for <em>{{ e.description }}</em> on {{ e.dateISO }}
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="pa-5 mt-6" elevation="2">
      <v-card-title>
        <v-icon left color="secondary">mdi-account-group</v-icon>
        Team Members
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" sm="4" md="3" lg="2" v-for="p in players" :key="p">
            <v-card class="pa-4 text-center hover-card" outlined>
              <v-avatar color="secondary" size="48">
                <span class="white--text subtitle-1">{{ p.charAt(0) }}</span>
              </v-avatar>
              <div class="mt-2 font-weight-medium">{{ p }}</div>
              <div class="caption grey--text">₹ {{ perPerson[p] | money }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    isValid: false,
    form: { name: null, description: '', amount: null }
  }),
  computed: {
    ...mapGetters(['players', 'sortedExpenses', 'weeklyTotal', 'totalsPerPerson']),
    r() { return v => !!v || 'Required' },
    a() { return v => Number(v) > 0 || 'Amount must be > 0' },
    perPerson() { return this.totalsPerPerson }
  },
  methods: {
    reset() { this.form = { name: null, description: '', amount: null } },
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.commit('addExpense', { ...this.form })
        this.reset()
      }
    }
  },
  created() {
    this.$store.dispatch('loadFromStorage')
  }
}
</script>


<style scoped>
.gradient-card {
  background: linear-gradient(135deg, #4CAF50, #00BCD4);
}
.hover-card { transition: transform 0.15s ease; }
.hover-card:hover { transform: translateY(-3px); }
</style>

