<template>
  <div id="parent">
    <div id="menu">
        <v-navigation-drawer permanent v-model="drawer">
          <v-toolbar id="toolbar" color="deep-orange accent-3">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="user.imgUrl">
                </v-list-tile-avatar>
                <v-list-tile-content id="toolbar-content">
                  <v-list-tile-title>{{user.name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-list class="pt-0">
            <v-divider></v-divider>
            <v-list-tile v-for="item in items" :key="item.title" @click="changeView">
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
    <div id="content">
      <dashboard-coin></dashboard-coin>
    </div>
  </div>

</template>

<script>
 import DashboardCoin from './DashboardCoin.vue' 
 
  export default {
    components: {
      'dashboard-coin': DashboardCoin
    }, 
    data () {
      return {
        drawer: true,
        screenName: 'Screen Name',
        items: [
          { title: 'Coins', icon: 'dashboard' },
          { title: 'Wallet', icon: 'account_balance_wallet' },
          { title: 'Porfolio', icon: 'reorder' },
          { title: 'Charts', icon: 'assessment' },
          { title: 'News', icon: 'chrome_reader_mode' }
        ],
        right: null
      }
    },
    methods: {
      changeView: function(event){
        this.screenName = event.target.textContent
      }
    },
    computed:{
      user(){
        return this.$store.getters.user
      }
    },
    mounted(){
      console.log(this.user)
    }
  }
</script>

<style>
  #parent{
    display:grid;
    grid-template-columns:15% 1fr;
    min-height: 100%;
  }
  #toolbar-content{
    color: white;
    font-size: 18px

  }
  #content{
    background-color: whitesmoke;
  }
 
  @media screen and (max-width:600px){
    #parent{
      display:grid;
      grid-template-columns: 1fr;
      grid-gap: 2%;
      min-height: 100%;      
    }
  }

</style>
