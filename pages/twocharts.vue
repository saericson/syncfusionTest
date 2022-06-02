<template>
  <v-container>
    <div>
      <h1>Test of Two Pie Charts Rendering</h1>
    </div>
    <v-divider class="my-10"></v-divider>
    <v-row>
      <v-col cols="6">
        <pie-chart :data-series="data1"></pie-chart>
      </v-col>
      <v-col cols="6">
        <pie-chart :data-series="data2"></pie-chart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TwoCharts',
  data() {
    return {
      data1: [
        { x: 'Argentina', y: 505370, r: '50%' },
        { x: 'Belgium', y: 551500, r: '70%' },
        { x: 'Cuba', y: 312685, r: '84%' },
        { x: 'Dominican Republic', y: 350000, r: '97%' },
        { x: 'Egypt', y: 301000, r: '84%' },
        { x: 'Kazakhstan', y: 300000, r: '70%' },
        { x: 'Somalia', y: 357022, r: '90%' },
      ],
      data2: [
        { x: 'Argentina', y: 505370, r: '50%' },
        { x: 'Belgium', y: 551500, r: '70%' },
        { x: 'Cuba', y: 312685, r: '84%' },
        { x: 'Dominican Republic', y: 350000, r: '97%' },
        { x: 'Egypt', y: 301000, r: '84%' },
        { x: 'Kazakhstan', y: 300000, r: '70%' },
        { x: 'Somalia', y: 357022, r: '90%' },
      ],
    }
  },
}
</script>
