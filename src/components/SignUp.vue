<template>
  <div class="center" id="main-div">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="card">
            <img src="/src/assets/incliti2.png" width="200" height="50" class="center-logo rounded" alt="">
            <h1 class="center-title title">Register</h1>
            <br>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Full Name" v-model="fullName">
                <span class="icon is-small is-left">
                  <i class="fas fa-address-book"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Password" v-model="password">
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Confirm Password" v-model="passwordConf">
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
              </div>
            </div>
            <br>
            <div class="field">
              <div class="control">
                <button class="button orange btn">Register</button>
              </div>
            </div>
            <br>
          </div>
        </div>
      </div>
    </div>      
  </div>  
</template>

<script>
/* eslint-disable */
import TitlesTemplate from './Titles.vue'

  export default{
    data(){
      return{
        fullName,
        password,
        passwordConf
      }
    },
    components:{
      'title-vue': TitlesTemplate
    }
  }
  
</script>

<style>
.center{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
}
.center-logo{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
}
.center-title{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0%;
  margin-top: 0%
}
.field{
  padding-left:20%;
  padding-right: 20%
}
.orange{
    width:100%;
    display:block;
    background-color: #e7410e;
    color: whitesmoke
}
.btn{
  color: whitesmoke
}
.btn:hover{
  color: whitesmoke
}

</style>

