<template>
  <div>
    <canvas id="myChart" height="100"></canvas>
  </div>
</template>

<script>
/* eslint-disable */
import Chart from 'chart.js'

export default{
  props:['coin'],
  data(){
    return{
    }
  },
  methods:{
    mountChart: function(){
      let ctx = document.getElementById("myChart").getContext('2d');
      let myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
              datasets: [{
                  label: '# of Votes',
                  data: [12, 19, 3, 5, 2, 3]
              }]
          },
          options: {}
      });
    }
  },
  mounted(){
    this.mountChart();
  }
}
</script>

<style scoped>

</style>

