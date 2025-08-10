<template>
  <v-card class="pa-6" elevation="2">
    <v-card-title>
      <v-icon left color="primary">mdi-plus-circle</v-icon>
      Add Expense
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="isValid" lazy-validation>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              :items="players"
              label="Player Name"
              v-model="form.player"
              :rules="[v => !!v || 'Player is required']"
              outlined
              clearable
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.amount"
              label="Expense Amount"
              type="number"
              prefix="₹"
              :rules="[v => v > 0 || 'Amount must be > 0']"
              outlined
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                />
              </template>
              <v-date-picker v-model="form.date" @input="menu = false" :max="today" />
            </v-menu>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :items="categories"
              v-model="form.category"
              label="Category"
              :rules="[v => !!v || 'Category is required']"
              outlined
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="grey" text @click="resetForm">Reset</v-btn>
      <v-btn color="primary" dark @click="submit">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddExpense',
  data: () => ({
    isValid: false,
    menu: false,
    form: {
      player: null,
      amount: null,
      date: new Date().toISOString().slice(0, 10),
      category: null
    },
    categories: ['Turf Fee', 'Snacks', 'Drinks', 'Misc']
  }),
  computed: {
    ...mapGetters(['players']),
    today() { return new Date().toISOString().slice(0, 10) },
    dateFormatted() { return this.form.date }
  },
  methods: {
    resetForm() {
      this.form = { player: null, amount: null, date: this.today, category: null }
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.commit('addExpense', { ...this.form })
        this.$router.push('/expenses')
      }
    }
  }
}
</script>


