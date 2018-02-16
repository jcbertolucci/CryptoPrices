<template>
  <section class="white">
    <!-- <div class="white"> -->
      <v-content class="text-xs-center white ma-5 pa-5">
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