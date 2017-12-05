<template>
  <div id="app">
    <div class="container border border-top-0 border-left-0 border-right-0 no-padding-left-right">
      <nav class="navbar navbar-light no-padding-left-right">
        <a class="navbar-brand " href="#">
          <img src="/src/assets/incliti2.png" width="110" height="50" class="d-inline-block align-top rounded" alt="">
        </a>
        <div class="btn">
          <a id="btnSignIn" class="align-middle">Sign in</a>
          <button id="btnSignUp" type="button" class="btn">Sign up</button>
        </div>
      </nav>
    </div>  
    <div class="container align-right">
      <nav id="nav-menu" class="navbar justify-content-center">
        <a class="nav-link cool-link font-orange" href="#">Get started</a>
        <a class="nav-link cool-link font-orange" href="#">Analyse coins</a>
        <a class="nav-link cool-link font-orange" href="#">Partners</a>
        <a class="nav-link cool-link font-orange" href="#">About us</a>
      </nav>
    </div>  
    
    <div class="container div-main no-padding-left-right">
      <div class="title">
        <h4>Top 5 Coins</h4>
      </div>      
      <div class="container border rounded reset-space div-coins">
        <coins-template></coins-template>
      </div>
      </br>
      </br>
      <div class="title">
        <h4>News</h4>
      </div>  
      <div class="container border rounded reset-space">
        <news-template></news-template>
      </div>
    </div>  
  </div>
</template>

<script>
import CoinsTemplate from './components/Coins.vue'
import NewsTemplate from './components/News.vue'
export default {
  components: {
    'coins-template': CoinsTemplate,
    'news-template': NewsTemplate
  }
}
</script>
<style scoped>
  #div-coins{
    padding: none;
    border: none;
    margin: none
  }
  .reset-space{
    padding: 3px;
  }
  .div-main h4{
    font-family: ''
  }
  .title{
    padding-bottom: 1em;
    font-style: bold;
  }

</style>
