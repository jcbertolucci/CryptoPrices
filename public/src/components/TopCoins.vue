<template>
  <div>
    <v-toolbar color=" grey--text outline" light flat prominent>
      <i class="fab fa-btc fa-3x"></i>
      <v-toolbar-title class="headline">Top coins</v-toolbar-title>
    </v-toolbar>
    <table-vuetify originOfCall='TopCoins'></table-vuetify>
  </div>
</template>


<!-- Vue -->
<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  import TableVuetify from './TableVuetify.vue'

  export default {
    components:{
      'table-vuetify' : TableVuetify
    },
    data() {
      return {
        
      }
    }

  }  
</script>

<!-- Style -->
<style scoped>
.table{
  font-size: 25px
}
</style>


