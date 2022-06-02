<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
      </v-card>

      <v-card>
        <v-card-title class="headline">
          Welcome to The Syncfusion Test App
        </v-card-title>
        <v-card-text>
          <p>
            This is a Test App for Syncfusion Components
          </p>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'IndexPage',
  data() {
    return {}
  },
}
</script>
