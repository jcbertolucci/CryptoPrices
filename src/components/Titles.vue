<template>
  <div class="margin">
    <h1 class="title">{{ title }}</h1>
    <hr class="hr-after-h4">
  </div>  
</template>
<script>
  /* eslint-disable */
  export default{
    props:['title'],
    data(){
      return{}
    }
  }
</script>
<style scoped>
  .title{
    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 20px;
  }
  .hr-after-h4{
    position:relative;
    top:-19px;
    width:100%;
  }
  .margin{
    margin-bottom: -2%
  }
</style>

