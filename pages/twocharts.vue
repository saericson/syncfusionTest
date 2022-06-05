<template>
  <v-container>
    <div>
      <h1>Dashboard Test</h1>
    </div>
    <v-divider class="my-10"></v-divider>
      <dash-board :data-series="parms"></dash-board>
  </v-container>
</template>

<script>
export default {
  name: 'TwoCharts',
  data() {
    return {
      parms: [],
    }
  },
  mounted() {
    this.parms = this.initParms()
  },
  methods: {
    initParms() {
      this.$store.dispatch('simParms/INIT_PARMS')
      const temp = this.arrayCopy(this.$store.state.simParms.parms)
      return temp
    },
    arrayCopy(arr) {
      let temp = arr.map((e, idx) => Object.assign({ idx }, e))
      temp = temp.map((e) => {
        delete e.idx
        return e
      })
      return temp
    },
  },
}
</script>
