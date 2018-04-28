<template>
  <div>
    <div class="container border border-top-0 border-left-0 border-right-0 no-padding-left-right">
      <nav class="navbar navbar-light no-padding-left-right">
        <a href="#">
          <img src="/src/assets/incliti2.png" width="110" height="150" class=" align-top rounded" alt="">
        </a>
        <div class="btn">
          <a id="btnSignIn" class="align-middle">Sign in</a>
            <router-link to="/signup">
              <button id="btnSignUp" class="btn" v-on:click="isOpenSUModal = true">Sign up</button>
            </router-link>
          </button>
        </div>
      </nav>
    </div>  
    <div class="container align-right">
      <nav id="nav-menu" class="navbar justify-content-center">
        <a class="nav-link cool-link font-orange" href="#">My portfolio</a>
        <a class="nav-link cool-link font-orange" href="#">Coins</a>
        <a class="nav-link cool-link font-orange" href="#">About us</a>
      </nav>
    </div> 
  </div>
</template>
<script>
  /* eslivnt-disable */
  /* eslint-disable */

  export default{
    data(){
      return{
        isOpenSUModal: false
      }
    }
  }
</script>

<style>

</style>

