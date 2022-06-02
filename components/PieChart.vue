<template>
  <div>
    <ejs-accumulationchart id="container">
      <e-accumulation-series-collection>
        <e-accumulation-series :data-source="dataSeries" x-name="x" y-name="y">
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script>
import Vue from 'vue'
import { AccumulationChartPlugin, PieSeries } from '@syncfusion/ej2-vue-charts'

Vue.use(AccumulationChartPlugin)

export default {
  provide: {
    accumulationchart: [PieSeries],
  },
  props: {
    dataSeries: {
      type: Array,
      required: true,
      default() {
        return [
          { x: 'Argentina', y: 505370, r: '50%' },
          { x: 'Belgium', y: 551500, r: '70%' },
          { x: 'Cuba', y: 312685, r: '84%' },
          { x: 'Dominican Republic', y: 350000, r: '97%' },
          { x: 'Egypt', y: 301000, r: '84%' },
          { x: 'Kazakhstan', y: 300000, r: '70%' },
          { x: 'Somalia', y: 357022, r: '90%' },
        ]
      },
    },
  },
  data() {
    return {}
  },
}
</script>
<style>
#container {
  height: 350px;
}
</style>
