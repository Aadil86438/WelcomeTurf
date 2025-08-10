<template>
  <v-app>
    <v-app-bar app color="primary" dark flat>
      <v-toolbar-title>Tea Stall Gang</v-toolbar-title>
      <v-spacer />
      <v-btn text to="/" exact router>Home</v-btn>
      <v-btn text to="/summary" router>Summary</v-btn>
      <v-btn text to="/settings" router>Settings</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-bottom-navigation app grow color="primary" v-if="$vuetify.breakpoint.xsOnly">
      <v-btn to="/" exact router><span>Home</span><v-icon>mdi-home</v-icon></v-btn>
      <v-btn to="/summary" router><span>Summary</span><v-icon>mdi-chart-bar</v-icon></v-btn>
      <v-btn to="/settings" router><span>Settings</span><v-icon>mdi-cog</v-icon></v-btn>
    </v-bottom-navigation>
  </v-app>
  
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, #app {
  height: 100%;
}
</style>
