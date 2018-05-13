<!-- HTML -->
<template>
 <!--  <v-layout class="parent">
    <v-flex xs2 class="item">
       <img v-if="user" src="/src/assets/incliti2.png" alt="avatar" height="47px" width="100px">
    </v-flex>
    <!-- <v-flex class="item">
       <v-btn flat class="deep-orange--text pa-0 ma-0 body-2" to="/portfolio">My portfolio</v-btn>
       <v-btn flat class="deep-orange--text pa-0 ma-0 body-2" to="/coins">Coins</v-btn>
       <v-btn flat  class="deep-orange--text pa-0 ma-0 body-2" to="/contact">Contact us</v-btn>
    </v-flex> 
    <v-flex xs2 v-if="!user" class="item">
      <!-- <v-btn small outline class="deep-orange darken-2 deep-orange--text heading" to="/signin">Sign In</v-btn>
      <v-btn class="deep-orange darken-2 white--text" to="/signup">Sign Up</v-btn>
      <v-btn outline class="deep-orange darken-2 deep-orange--text heading" to="/signin">Sign In</v-btn>
      <v-btn small class="deep-orange darken-2 white--text" to="/signup">Sign Up</v-btn>
    </v-flex>
    <v-flex xs2 v-else="user" class="item">
      <v-btn outline class="deep-orange darken-2 deep-orange--text heading" @click="logOutProp">Log out</v-btn>
    </v-flex>
  </v-layout> -->
  <div class="main-container">
    <div class="child-left">
      <img v-if="user" src="/src/assets/incliti2.png" alt="avatar" height="47px" width="100px">
    </div>
    <div class="child-right">
      <v-flex xs2 v-if="!user" class="item">
        <v-btn small outline class="deep-orange darken-2 deep-orange--text heading" to="/signin">Sign In</v-btn>
        <v-btn class="deep-orange darken-2 white--text" to="/signup">Sign Up</v-btn>
      </v-flex>
      <v-flex xs2 v-else="user" class="item">
        <v-btn small outline class="deep-orange darken-2 deep-orange--text heading" @click="logOutProp">Log out</v-btn>
      </v-flex>
    </div>
  </div>

  
</template>

<!-- Vue -->
<script>
import {mapGetters} from 'vuex'

export default{
  props:['logOutProp'],
  computed:{
    ...mapGetters([
      'user'
    ])
  },
 
  data(){
    return{
    }
  }
} 
</script>

<!-- Style -->
<style scoped>
.main-container{
  height: 65px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  background-color: #4A148C;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  border-radius: 2px;
}

</style>


