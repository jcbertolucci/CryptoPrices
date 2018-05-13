<template>
  <div id="parent">
    <div id="menu-child">
        <v-navigation-drawer :mini-variant.sync="mini" v-model="drawer" dark stateless hide-overlay>
          <v-toolbar id="toolbar">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="user.imgUrl">
                </v-list-tile-avatar>
                <v-list-tile-content id="toolbar-content">
                  <v-list-tile-title>{{user.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click.native.stop="mini = !mini">
                    <v-icon color="white">chevron_left</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-list class="pt-0" color="accent">
            <v-divider></v-divider>
            <v-list-tile v-for="item in screens" :key="item.title" @click="changeView">
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
    <div id="content-child">
      <div v-show="screenName === 'Coins'" id="dashboard-coin">
        <dashboard-coin></dashboard-coin>
      </div>
      <div v-show="screenName === 'Wallet'" id="dashboard-wallet">
        <dashboard-wallet></dashboard-wallet>
      </div>
    </div>
    
  </div>

</template>

<script>
 import DashboardCoin from './DashboardCoin.vue' 
 import DashboardWallet from './DashboardWallet.vue'
 
  export default {
    components: {
      'dashboard-coin': DashboardCoin,
      'dashboard-wallet': DashboardWallet
    }, 
    data () {
      return {
        mini: true,
        drawer: true,
        screenName: 'Coins',
        screens: [
          { title: 'Coins', icon: 'dashboard', selected: true },
          { title: 'Wallet', icon: 'account_balance_wallet', selected: false },
          { title: 'Porfolio', icon: 'reorder', selected: false },
          { title: 'Charts', icon: 'assessment', selected: false }
        ],
        right: null
      }
    },
    methods: {
      changeView: function(event){
        console.log(event.target)
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
    display:flex;
    flex-direction: row;
    height: 100%;
    background-color: rgb(241, 240, 240);
    justify-content:space-around;
  }
  #menu-child{
    flex: 70px;
  }
  #content-child{
    flex:12;
    padding: 15px 100px 0 100px;
  }
  #toolbar-content{
    color: white;
    font-size: 15px;
  }
  #dashboard-coin{
    /* background-color: rgb(241, 240, 240) */
  }
  #dashboard-wallet{
    /* background-color: rgb(241, 240, 240); */
  }

  @media screen and (max-width:600px){
    #parent{
      display:grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      grid-gap: 2%;
      min-height: 100%;      
    }
  }

</style>
