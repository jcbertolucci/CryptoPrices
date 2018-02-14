<template>
  <v-app class="white">
    <div class="white">
      <v-toolbar flat app color="accent" height="85px">
        <vue-menu></vue-menu>
      </v-toolbar>
      <v-content class="text-xs-center white">
        <h4 class="display-3 primary--text padding"></h4>
        <v-container grid-list-md text-xs-center mx-auto>
          <v-layout row wrap mx-auto justify-space-around>
            <v-flex xs12>
              <span class="title grey--text">Quick search:</span>
            </v-flex >
            <br><br>
            <v-flex xs1 v-for="coin in coinTableItems" v-bind:data="coin" v-bind:key="coin.name">
              <v-btn outline color="secondary" @click="selectedCoin(coin)">{{ coin.name }}</v-btn>
            </v-flex>         
          </v-layout>  
        </v-container>
        <br>
        <v-card class="justify-center" flat>
          <v-text-field
            append-icon="search"
            label="Search other coins..."
            single-line
            v-model="search"
          ></v-text-field>
        </v-card>  
        <br> <br>
        <v-card>
          <div class="parent white">
            <div class="item">
              <navigation-drawer></navigation-drawer>
              <!--<table-vuetify originOfCall='Coins'></table-vuetify>-->
              <div class="item">
                <vue-db2-chartAxis></vue-db2-chartAxis>
              </div>
            </div>
          </div>
        </v-card>
      </v-content>
    </div>    
  </v-app>
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
  computed: {
    ...mapGetters([
      'coinTableItems'
    ]),
    searchFieldCoins: () => {
      let items = [{value: 1, text: 'Option 1'},{value: 2, text: 'Option 2'}]
      return items
    }
  },
  components: {
    'vue-menu': MenuTemplate,
    'vue-submenu': SubMenuTemplate,
    'table-vuetify' : TableVuetify,
    'navigation-drawer': NavigationDrawer,
    'vue-db2-chartAxis': ChartTemplate
  },
  methods:{
    ...mapActions({
      selectedCoin: 'setCurrentCoin'
    })
  },
  data() {
    return {
      search: ''
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