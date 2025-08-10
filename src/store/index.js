import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Local storage key as per spec
const STORAGE_KEY = 'tea_stall_expenses'

// Fixed players list
const predefinedPlayers = [
  'Mohammed Aadil', 'Mohammed Akram', 'Zia Bhayya', 'Haadeebbhayya', 'Baaree Bhayya',
  'Saleemchachu', 'Saif', 'Yunus Bhayya', 'Basheer Bhayya'
]

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

function saveState(expenses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ expenses }))
  } catch (e) {
    // ignore persistence errors
  }
}

function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diffToMonday = (day + 6) % 7
  const monday = new Date(d)
  monday.setDate(d.getDate() - diffToMonday)
  monday.setHours(0, 0, 0, 0)
  return monday
}

export default new Vuex.Store({
  state: {
    players: predefinedPlayers,
    expenses: [] // items: { id, name, description, amount, dateISO }
  },
  getters: {
    players: state => state.players,
    expenses: state => state.expenses,
    // Sorted newest first
    sortedExpenses: state => [...state.expenses].sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO)),
    // Weekly total for current week (Mon-Sun)
    weeklyTotal: state => {
      if (!state.expenses.length) return 0
      const now = new Date()
      const weekStart = getWeekStart(now)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 7)
      return state.expenses
        .filter(e => {
          const d = new Date(e.dateISO)
          return d >= weekStart && d < weekEnd
        })
        .reduce((sum, e) => sum + Number(e.amount || 0), 0)
    },
    // Total per person
    totalsPerPerson: state => {
      const map = {}
      state.players.forEach(p => { map[p] = 0 })
      state.expenses.forEach(e => { map[e.name] = (map[e.name] || 0) + Number(e.amount || 0) })
      return map
    },
    // Data for charts: totals per player
    chartTotalsPerPlayer: (state, getters) => {
      const labels = state.players
      const values = labels.map(p => getters.totalsPerPerson[p] || 0)
      return { labels, values }
    }
  },
  mutations: {
    initialise(state, payload) {
      state.expenses = payload && Array.isArray(payload.expenses) ? payload.expenses : []
    },
    addExpense(state, expense) {
      const item = {
        id: Date.now(),
        name: expense.name,
        description: expense.description,
        amount: Number(expense.amount),
        dateISO: expense.dateISO || new Date().toISOString().slice(0, 10)
      }
      state.expenses.push(item)
      saveState(state.expenses)
    },
    resetExpenses(state) {
      state.expenses = []
      saveState(state.expenses)
    }
  },
  actions: {
    loadFromStorage({ commit }) {
      const data = loadState()
      commit('initialise', data)
    },
    resetAll({ commit }) {
      commit('resetExpenses')
    }
  }
})
