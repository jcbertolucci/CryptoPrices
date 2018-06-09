<!-- HTML -->
<template>
  <v-layout class="text-xs-center parent">
    <v-flex class="item">
       <!-- <img src="/src/assets/incliti2.png" alt="avatar" height="47px" width="100px"> -->
    </v-flex>
    <v-flex class="item">
       <v-btn flat class="deep-orange--text pa-0 ma-0 body-2" to="/portfolio">My portfolio</v-btn>
       <v-btn flat class="deep-orange--text pa-0 ma-0 body-2" to="/coins">Coins</v-btn>
       <v-btn flat  class="deep-orange--text pa-0 ma-0 body-2" to="/contact">Contact us</v-btn>
    </v-flex>
    <v-flex v-if="!user" class="item">
      <v-btn small outline class="deep-orange darken-2 deep-orange--text heading" to="/signin">Sign In</v-btn>
      <v-btn class="deep-orange darken-2 white--text" to="/signup">Sign Up</v-btn>
    </v-flex>
    <v-flex v-else="user" class="item">
      <!-- <span></span> -->
      <v-btn small outline class="deep-orange darken-2 deep-orange--text heading" @click="logOutProp">Log out</v-btn>
    </v-flex>
    
  </v-layout>
</template>

<!-- Vue -->
<script>
import * as firebase from 'firebase'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

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
  },
  methods: {
  },
  mounted(){
  },
  created(){
    
  }
} 
</script>

<!-- Style -->
<style scoped>
.parent{
  
}

</style>


