<template>
  <div class="white">
    <v-toolbar flat app color="white">
      <vue-menu></vue-menu>
    </v-toolbar>
    <v-content class="text-xs-center">
      <vue-submenu></vue-submenu>  
      <br><br><br><br><br>
      <v-card>
        <div class="parent">
          <v-navigation-drawer permanent light class="item">
            <v-toolbar flat class="deep-orange accent-4">
              <v-list>
                <v-list-tile>
                  <v-btn  color="white" small flat dark>
                    <img src="../../src/assets/coins/eth.svg" alt="" height="30px">
                  </v-btn> 
                  <v-list-tile-title class="title white--text">
                    Bitcoin
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">
              <v-list-tile v-for="item in items" :key="item.title" @click="">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
          <v-navigation-drawer permanent light class="item">
            <v-toolbar flat class="deep-orange accent-4">
              <v-list>
                <v-list-tile>
                  <v-btn  color="white" small flat dark>
                    <img src="../../src/assets/coins/eth.svg" alt="" height="30px">
                  </v-btn> 
                  <v-list-tile-title class="title white--text">
                    Bitcoin
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">
              <v-list-tile v-for="item in items" :key="item.title" @click="">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </div>
      </v-card>
    </v-content>
  </div>
</template>

<script>
//Charts
import Trend from 'vuetrend';
//Charts
import MenuTemplate from './MenuVuetify.vue'
import SubMenuTemplate from './SubMenu.vue'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'


export default {
  computed: {
    ...mapGetters([
      ''
    ])
  },
  components: {
    'vue-menu': MenuTemplate,
    'vue-submenu': SubMenuTemplate,
    'trend': Trend
  },
  data() {
    return {
      items: [
        { title: 'Charts', icon: 'dashboard' },
        { title: 'Market', icon: 'question_answer' },
        { title: 'Social', icon: 'dashboard' },
        { title: 'Historical data', icon: 'question_answer' }
      ]
    };
  }
}
</script>

<style scoped>
.parent{
  display: flex;
  justify-content:space-between
}
.item{

}
</style>