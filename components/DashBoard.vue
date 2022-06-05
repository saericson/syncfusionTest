<template>
  <div>
    <v-row>
      <v-col cols="3">
        <pie-chart :id="1" :data-series="myArray1" x-fld="bu" y-fld="prem"></pie-chart>
      </v-col>
      <v-col cols="3">
        <pie-chart :id="2" :data-series="myArray1"  x-fld="bu" y-fld="loss"></pie-chart>
      </v-col>
      <v-col cols="3">
        <pie-chart :id="3" :data-series="myArray1"  x-fld="bu" y-fld="exp"></pie-chart>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <pie-chart :id="5" :data-series="myArray2" x-fld="lob" y-fld="prem"></pie-chart>
      </v-col>
      <v-col cols="3">
        <pie-chart :id="6" :data-series="myArray2"  x-fld="lob" y-fld="loss"></pie-chart>
      </v-col>
      <v-col cols="3">
        <pie-chart :id="7" :data-series="myArray2"  x-fld="lob" y-fld="exp"></pie-chart>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'DashBoard',
  props:{
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
  computed: {
    myArray1() {
      return this.sumByFld(this.dataSeries, 'bu')
    },
    myArray2() {
      return this.sumByFld(this.dataSeries, 'lob')
    },
    myArray3() {
      return this.crossTab(this.dataSeries, 'bu', 'lob', 'prem')
    },
    myArray4() {
      return this.crossTab(this.dataSeries, 'lob', 'bu', 'lr')
    },
  },

  methods: {
    arrayCopy(arr) {
      let temp = arr.map((e, idx) => Object.assign({ idx }, e))
      temp = temp.map((e) => {
        delete e.idx
        return e
      })
      return temp
    },
    uniqueItems(arr, fld) {
      arr = this.arrayCopy(arr)
      let uniqueArr = arr.map((e) => e[fld])
      uniqueArr = [...new Set(uniqueArr)]
      return uniqueArr
    },
    sumByFld(arr, fld) {
      // sub-totals by fld in array of objects
      const out = []
      const unique = this.uniqueItems(arr, fld)
      unique.forEach((item) => {
        const tmp = this.sum(arr.filter((e) => e[fld] === item))
        tmp[fld] = item
        out.push(tmp)
      })
      return out
    },
    sum(arr) {
      // sums specific properties in array of record objects
      const tmp = {}
      tmp.prem = arr.map((e) => e.prem).reduce((a, b) => a + b, 0)
      tmp.loss = Math.round(
        arr.map((e) => e.prem * e.lr).reduce((a, b) => a + b, 0)
      )
      tmp.exp = Math.round(
        arr.map((e) => e.prem * e.er).reduce((a, b) => a + b, 0)
      )
      tmp.lr = Math.round((10000 * tmp.loss) / tmp.prem) / 10000
      tmp.er = Math.round((10000 * tmp.exp) / tmp.prem) / 10000
      return tmp
    },
    crossTab(arr, rows, cols, value) {
      // create cross-tabulation matrix of value
      // matrix has rows defined by rows and columns defined by cols
      // assumes no duplicate records ==> no summing is needed!!
      arr = this.arrayCopy(arr)
      const uniqRows = this.uniqueItems(arr, rows)
      const uniqCols = this.uniqueItems(arr, cols)
      const res = []
      uniqRows.forEach((row) => {
        const tabRow = {}
        tabRow[rows] = row
        uniqCols.forEach((col) => {
          tabRow[col] = arr.filter((e) => (e[rows] = row) && (e.cols = col))[0][
            value
          ]
        })
        res.push(tabRow)
      })
      return res
    },
    flip(flds, arr) {
      const res = {}
      arr.forEach((e) => {
        const yName = e[flds.x1] + '-' + e[flds.x2]
        res[yName] = e[flds.y]
      })
      res.x = flds.newX
      return res
    },
  },
}
</script>

<style></style>
