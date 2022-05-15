<template>
  <b-tabs card class="tab-flex" content-class="grow-container">
    <template #tabs-start>
      <div class="nav-link" v-if="isTraining">
        <vm-progress
            type="circle"
            :show-text="false"
            :percentage="totalBatch == 0 ? 0 : batch/totalBatch*100"
            style="vertical-align: middle; margin-right:2px"
            strokeColor="#007E4E"
            stroke-width="3"
            :width="25"
        ></vm-progress>
        Epoch : {{epoch}} 
      </div>
    </template>
    <b-tab title="Message Logs" style="padding : 0px;">
      <div class="monitor-console">
        <ol ref="monitor" class="monitor-line">
          <li v-for="(line,inx) in message" :key="inx" class="serial-line" :style="[line.includes('Error') ? {'color':'orangered'} : {}]">
            {{line}}
          </li>
        </ol>
      </div>
    </b-tab>
    <b-tab title="Loss" style="padding : 0px; width:100%; height:100%;">
      <line-chart :chartData="getLossDataset" :options="graphOptions" ref="line_chart1" class="ctrl-chart"></line-chart>
    </b-tab>
    <b-tab title="Accuracy" style="padding : 0px; width:100%; height:100%;">
      <line-chart :chartData="getAccuracyDataset" :options="graphOptions" ref="line_chart2" class="ctrl-chart"></line-chart>
    </b-tab>
  </b-tabs>
</template>
<script>

import { mapState, mapActions, mapMutations , mapGetters } from 'vuex';
import LineChart from '~/components/Charts/LineChart';
export default {
  name : "ServerReport",
  components: {
    LineChart
  },
  data(){
    return {
      colors: [
          "#00ff00",
          "#0000ff",
          "#fd7600",
          "#fd1200",
          "#fc004f",
          "#ef00b3",
          "#7200d7",
          "#1800b3",
          "#00a5ff"
        ],
      graphOptions: {
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
  computed: {
    getLossDataset(){
      return this.getDataset("loss");
    },
    getAccuracyDataset(){
      return this.getDataset("accuracy");
    },
    ...mapGetters("server",["matric"]),
    ...mapState("server",["message","isConnected","isTraining","isTerminating", "epoch", "batch","totalBatch"]),
  },
  methods:{
    getDataset(ending){
      let matric = this.matric.filter(el=>el.label.endsWith(ending));
      return {
        datasets: matric.map((el,ind)=>{
          let res = Object.assign({},el);
          return Object.assign(res,{
            fill: false,
            borderColor: this.colors[ind],
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 4
          });
        }),
        labels : matric.length != 0 ? [...Array(matric[0].data.length).keys()] : []
      }
    },
    get_random_color: function() {
      return this.colors[Math.random() * this.colors.length | 0];
    },
  },
  watch:{
    message(){
      let m = this.$refs.monitor;
      if (m) {
        this.$nextTick(_ => {
          m.scrollIntoView(false);// = m.scrollHeight;
        });
      }
    }
  }
}
</script>
<style>
  .grow-container{
    position: relative;
    display: block;
    width: 100%;
    height:100%;
  }
  .ctrl-chart{
    width: 100%;
    height:100%;
  }
</style>
<style scoped>
  .tab-flex{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    position: absolute;
  }
  ol{
    list-style-type: none;
    counter-reset: elementcounter;
    padding-left: 0;
  }
  li:before{
    content: "  ";
    /* content: counter(elementcounter) " |"; */
    /* counter-increment:elementcounter; */
    font-weight: bold;
  }
  .monitor-line{
    padding-left: 10px;
  }
  .monitor-console {
    width: 100%;
    height: 100%;
    background-color: #363636;
    color: white;
    position: absolute;
    overflow-y: auto;
  }
</style>