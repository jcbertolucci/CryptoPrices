<template>
  <section class="white">
    <!-- <div class="white"> -->
      <v-content class="text-xs-center white ma-5 pa-5">
        <v-btn
            color="primary"
            dark
            fab
            fixed
            bottom
            right
            class="mb-5 pb-5"
            @click="goHome"
          >
            <v-icon >home</v-icon>
          </v-btn>
        <v-card>
          <div class="parent white">
            <div class="item">
              <!-- <navigation-drawer>
              </navigation-drawer> -->
              <!-- <table-vuetify :selectedCoinProp='selectedCoin' :selectedPairProp='selectedPair' originOfCall='Coins'></table-vuetify> -->
              <table-vuetify originOfCall='Coins'></table-vuetify>
            </div>
          </div>
        </v-card>
      </v-content>
    <!-- </div>  -->   
  </section>
</template>

<script>
//Charts

//Charts
import MenuTemplate from './MenuVuetify.vue'
import SubMenuTemplate from './SubMenu.vue'
import TableVuetify from './TableVuetify.vue'
import NavigationDrawer from './NavigationDrawer.vue'
import ChartTemplate from './Chart.vue'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import * as firebase from 'firebase'

export default {
  components: {
    'vue-menu': MenuTemplate,
    'vue-submenu': SubMenuTemplate,
    'table-vuetify' : TableVuetify,
    'navigation-drawer': NavigationDrawer,
    'vue-db2-chartAxis': ChartTemplate
  },

  data() {
    return {

    }
  },
  methods:{
    goHome(){
      this.$router.push(this.$route.query.redirect || '/')
    }
  },  
  created(){
    console.log(firebase.auth().currentUser)
  }
}
</script>

<style scoped>
.parent{
  display: flex;
  justify-content: space-between
}
.item{
  width: 100%
}
.padding{
  padding-top: 100px;
  padding-bottom: 50px;
}

</style>