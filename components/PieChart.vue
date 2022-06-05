<template>
  <div id="app">
    <ejs-accumulationchart
      :id="`pie${id}`"
      ref="pie"
      class="pie"
      style="display: block"
      :theme="theme"
      :legend-settings="legendSettings"
      :tooltip="tooltip"
      :enable-animation="enableAnimation"
      :enable-smart-labels="enableSmartLabels"
    >
      <e-accumulation-series-collection>
        <e-accumulation-series
          :data-source="dataSeries"
          :x-name="xFld"
          :y-name="yFld"
          radius="93%"
          inner-radius="40%"
          :data-label="dataLabel"
        >
        </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  AccumulationChartPlugin,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip,
} from '@syncfusion/ej2-vue-charts'
Vue.use(AccumulationChartPlugin)
export default {
  provide: {
    accumulationchart: [
      AccumulationLegend,
      PieSeries,
      AccumulationDataLabel,
      AccumulationTooltip,
    ],
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
    id: {
      type: Number,
      required: true,
      default: 1,
    },
    xFld: {
      type: String,
      required: true,
      default: 'x',
    },
    yFld: {
      type: String,
      required: true,
      default: 'y',
    },
  },
  data() {
    return {
      theme: '',
      selectedTheme: '',
      legendSettings: { visible: false, reverse: true },
      dataLabel: { visible: true, position: 'Outside', name: this.xFld },
      tooltip: {
        enable: true,
        // eslint-disable-next-line no-template-curly-in-string
        // header: '<b>${point.x}</b>',
        // eslint-disable-next-line no-template-curly-in-string
        format: '<b>${point.x}</b>: <b>${point.y}</b>',
      },
      enableAnimation: true,
      enableSmartLabels: true,
    }
  },
  mounted() {
    this.selectedTheme = location.hash.split('/')[1]
    this.selectedTheme = this.selectedTheme ? this.selectedTheme : 'Material'
    this.theme = (
      this.selectedTheme.charAt(0).toUpperCase() + this.selectedTheme.slice(1)
    ).replace(/-dark/i, 'Dark')
  },
}
</script>
<style scoped>
.pie {
  height: 250px;
}
</style>
