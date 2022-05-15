<template>
  <line-chart :chartData="matric" :options="graph_options" ref="line_chart" class="ctrl-chart"></line-chart>
</template>

<script>
  import LineChart from './LineChart.js'
  export default {
    components: {
      LineChart
    },
    props: {
      chartdata: {
        type: Object,
        default: null
      },
      options: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        datacollection: {labels : [], datasets: []},
        chartOptions: {
          responsive: true,
          fill: false,
          maintainAspectRatio: false,
          animation: { duration: 0 },
          hover: { animationDuration: 0 },
          responsiveAnimationDuration: 0,
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          },
        }
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['January', 'February'],
          datasets: [
            {
              label: 'Data One',
              borderColor: '#f8AA00',
              backgroundColor: '#f8AA79',
              fill: false,
              data: [40, 20]
            },
            {
              label: 'Data Two',
              borderColor: '#f0AA99',
              backgroundColor: '#f87979',
              fill: false,
              data: [50, 60]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>