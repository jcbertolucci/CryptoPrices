<!-- HTML -->
<template>
  <v-app class="white">
    <v-toolbar flat app color="white">
      <vue-menu></vue-menu>
    </v-toolbar>
    <v-content class="text-xs-center">
      <vue-submenu></vue-submenu>  
      <br><br><br><br><br>
      <vue-topcoins></vue-topcoins>
      <br><br><br>
      <vue-twitterfeed></vue-twitterfeed>
    </v-content>
    <v-footer class="footer"></v-footer>
  </v-app>
  
</template>

<!-- Vue -->
<script>
  import MenuTemplate from './MenuVuetify.vue'
  import SubMenuTemplate from './SubMenu.vue'
  import TopCoinsTemplate from './TopCoins.vue'
  import TwitterTemplate from './TwitterFeed.vue'
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  

  export default {
    components: {
      'vue-menu': MenuTemplate,
      'vue-submenu': SubMenuTemplate,
      'vue-topcoins': TopCoinsTemplate,
      'vue-twitterfeed': TwitterTemplate
    },
    data(){
      return{
      }
    }
  }
 
</script>
  


<!-- Style -->
<style scoped>
.footer{
  height: 200px;
  padding: 0;
  margin: 0;
  margin-top: 5px
}
</style>


