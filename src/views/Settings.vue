<template>
  <v-card class="pa-6" elevation="2">
    <v-card-title>
      <v-icon left color="error">mdi-alert-circle</v-icon>
      Reset Data
    </v-card-title>
    <v-card-text>
      <div class="mb-4">This will permanently delete all expenses stored on this device.</div>
      <v-btn color="error" dark @click="confirm = true">
        <v-icon left>mdi-trash-can</v-icon> Reset All Data
      </v-btn>
    </v-card-text>

    <v-dialog v-model="confirm" max-width="420px">
      <v-card>
        <v-card-title>Confirm Reset</v-card-title>
        <v-card-text>Are you sure you want to delete all data? This cannot be undone.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="confirm = false">Cancel</v-btn>
          <v-btn color="error" dark @click="reset">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'Settings',
  data: () => ({ confirm: false }),
  methods: {
    reset() {
      this.$store.dispatch('resetAll')
      this.confirm = false
      this.$emit('snack', 'All data cleared')
    }
  }
}
</script>


