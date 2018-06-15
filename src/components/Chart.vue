<template>
  <div class="parent">
    <canvas id="myChart"></canvas>
  </div>
  
</template>

<script>
  import Chart from 'chart.js';
  export default {
    data () {
      return {
        myChart: null       
      }
    },
    methods:{
      mountChart: () =>{
        let chartHtml = document.getElementById('myChart');
        let config = {
            type: '',
            data:{},
            options:{}            
        }
            
        return new Chart(chartHtml, config);
      }
    },
    mounted(){
      this.myChart = this.mountChart()
    }
  }
</script>

<style scoped>
.parent{
  margin: 0 auto;
  height: 800px;
  width: 800px;
}

</style>