<template>
  <div>
    <v-card elevation="2">
      <v-card-title>
        <v-icon left color="primary">mdi-table</v-icon>
        Expenses
        <v-spacer />
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-4" />
        <v-btn color="primary" dark to="/add" router>
          <v-icon left>mdi-plus</v-icon> Add
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-select :items="players" v-model="filters.player" label="Filter by Player" clearable outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-select :items="categories" v-model="filters.category" label="Filter by Category" clearable outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="filters.date" label="Filter by Date" readonly outlined v-bind="attrs" v-on="on" />
              </template>
              <v-date-picker v-model="filters.date" @input="menu = false" />
            </v-menu>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="filteredExpenses"
          :search="search"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          class="elevation-1"
          item-key="id"
        >
          <template v-slot:item.amount="{ item }">₹ {{ Number(item.amount).toFixed(2) }}</template>
          <template v-slot:item.actions="{ item }">
            <v-btn icon small @click="edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn icon small @click="remove(item)"><v-icon color="error">mdi-delete</v-icon></v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Expense</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-model="isValid" lazy-validation>
            <v-select :items="players" v-model="editItem.player" label="Player" :rules="[r]" outlined />
            <v-text-field v-model.number="editItem.amount" label="Amount" type="number" prefix="₹" :rules="[a]" outlined />
            <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="editItem.date" label="Date" readonly outlined v-bind="attrs" v-on="on" />
              </template>
              <v-date-picker v-model="editItem.date" @input="menu2 = false" />
            </v-menu>
            <v-select :items="categories" v-model="editItem.category" label="Category" :rules="[r]" outlined />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" dark @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ExpensesList',
  data: () => ({
    search: '',
    menu: false,
    menu2: false,
    filters: { player: null, category: null, date: null },
    sortBy: 'date',
    sortDesc: true,
    headers: [
      { text: 'Player', value: 'player' },
      { text: 'Amount', value: 'amount' },
      { text: 'Date', value: 'date' },
      { text: 'Category', value: 'category' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    categories: ['Turf Fee', 'Snacks', 'Drinks', 'Misc'],
    dialog: false,
    isValid: false,
    editItem: {}
  }),
  computed: {
    ...mapGetters(['expenses', 'players']),
    filteredExpenses() {
      return this.expenses.filter(e => {
        const matchPlayer = this.filters.player ? e.player === this.filters.player : true
        const matchCategory = this.filters.category ? e.category === this.filters.category : true
        const matchDate = this.filters.date ? e.date === this.filters.date : true
        return matchPlayer && matchCategory && matchDate
      })
    },
    r() { return v => !!v || 'Required' },
    a() { return v => v > 0 || 'Amount must be > 0' }
  },
  methods: {
    edit(item) {
      this.editItem = { ...item }
      this.dialog = true
    },
    save() {
      if (this.$refs.editForm.validate()) {
        this.$store.commit('updateExpense', { ...this.editItem })
        this.dialog = false
      }
    },
    remove(item) {
      this.$store.commit('deleteExpense', item.id)
    }
  },
  created() {
    this.$store.dispatch('loadFromStorage')
  }
}
</script>


