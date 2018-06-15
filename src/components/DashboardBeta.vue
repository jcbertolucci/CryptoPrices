<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile @click="" :to="'/dashboard/coin'">
          <v-list-tile-action class="ma-0 pa-0">
            <v-icon>attach_money</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Prices</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile @click="" :to="'/dashboard/wallet'">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Trade</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
        <v-list-group
          v-model="tradesMenu.model"
          :key="tradesMenu.text"
          append-icon=""
        >
          <v-list-tile slot="activator">
            <v-list-tile-action>
              <v-icon>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-content >
              <v-list-tile-title>
                {{ tradesMenu.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in tradesMenu.children"
            :key="i"
            :to="child.to"
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="pl-4">
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        
        
        <v-list-tile :to="'/dashboard/portfolio'">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Portfolio</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile @click="" :to="'/dashboard/chart'">
          <v-list-tile-action>
            <v-icon>bar_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Charts</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
        <v-list-tile class="mt-3" @click="mainSheet = true">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">EXCHANGES</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ user.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar color="white" :size="42">
        <img v-if="(this.user.imgUrl !== '')" :src="user.imgUrl" alt="" class="elevation-5">
        <span v-else class="primary--text headline">{{ user.name.charAt(0) }}</span>
      </v-avatar>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <!-- <v-layout justify-center align-center class="main-container"> -->
        <v-layout justify-center class="main-container">
          <v-flex>
            <v-fade-transition mode="out-in">
              <router-view></router-view>
            </v-fade-transition>
          </v-flex>
        </v-layout>
        <!-- Bottom sheet dialog -->
        <div class="text-xs-center">
          <v-bottom-sheet v-model="mainSheet" color="white">
            <v-list>
              <v-subheader>Select exchange</v-subheader>
              <v-list-tile
                v-for="tile in menuSheet"
                :key="tile.title"
                @click='openExchangeForm(tile.id)'
                :disabled="tile.disable"
              >
                <v-icon :color="tile.color">{{ tile.icon }}</v-icon>
                <v-spacer></v-spacer>
                <v-list-tile-title class="body-2 pl-2">{{ tile.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-bottom-sheet>
        </div>
        <!-- Bottom sheet dialog -->
        <!-- Bottom sheet dialog BtcMarkets-->
        <div class="text-xs-center">
          <v-bottom-sheet v-model="btcSheet">
            <v-list>
              <v-subheader>BtcMarkets</v-subheader>
              <v-spacer></v-spacer>
                <v-form v-model="formValid" class="pl-3">
                  <v-flex xs4>
                    <v-text-field 
                      v-model="btcMarkets.publicKey"
                      :rules="formValidation"
                      label="Public Key"
                      required
                    ></v-text-field>
                  </v-flex>  
                  <v-flex xs4>
                    <v-text-field
                      v-model="btcMarkets.privateKey"
                      :rules="formValidation"
                      label="Private Key"
                      required
                    ></v-text-field>
                  </v-flex> 
                </v-form>
              <v-btn @click="connectCoin('btcmarkets')" block :disabled=!formValid color="primary">Connect</v-btn>
            </v-list>
          </v-bottom-sheet>
        </div>
        <!-- Bottom sheet dialog -->
      </v-container>
    </v-content>
    <v-snackbar
      :timeout="6000"
      color="error"
      v-model="hasExchangeAlert"
    >
      {{ exchangeAlert }}
      <v-btn dark flat @click.native="hasExchangeAlert = false">Close</v-btn>
    </v-snackbar>
    <v-footer app fixed>
      <span>Incliti &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    tradesMenu: {
      icon: 'keyboard_arrow_up',
      'icon-alt': 'keyboard_arrow_down',
      text: 'Trades',
      model: false,
      children: [
        { text: 'BtcMarkets', to: '/dashboard/wallet' }
      ]
    },
    formValid: false,
    formValidation: [
      v => !!v || 'Field is required'
    ],
    hasExchangeAlert: false,
    exchangeAlert: 'This exchange has been added already.',
    drawer: true,
    mainSheet: false,
    btcSheet: false,
    coinbSheet: false,
    btcFormPublicKey: '',
    btcFormPrivateKey: '',
    menuSheet: [
      { icon: 'business', title: ' BtcMarkets', color:'green', disable: false, id:'btcmarkets' },
      { icon: 'donut_small', title: ' Coinbase', color:'blue', disable: true, id:'coinbase' }
    ],
    exchangeOptions: [{name: 'BtcMarkets'}, {name:'Coinbase'}],
    exchanges: [],
    btcMarkets: {
      exchange: 'btcmarkets',
      publicKey: '',
      privateKey: '',
      dateMili: Date.now()
    },
    coinbase: {
      exchange: 'coinbase',
      publicKey: '',
      privateKey: '',
      dateMili: Date.now()
    }
  }),
  computed: {
    ...mapGetters([
      'userExchanges'
    ])
  },
  watch:{
    userExchanges:(oldValue, newValue)=>{
    }
  },
  methods:{
    openExchangeForm: function(id){
      //verifies if exchange had been added
      const hasExchange = (this.userExchanges.filter( exc => exc.exchange == id).length) > 0
      console.log(hasExchange)

      if(hasExchange){
        //Hides main sheet
        this.mainSheet = false;
        //Opens alert
        this.hasExchangeAlert = true;
      }else{
        if (id === 'btcmarkets'){
          //Hides main sheet
          this.mainSheet = false;
          //Opens coin sheet
          this.btcSheet = true
        }        
        if (id === 'coinbase'){
          //Hides main sheet
          this.mainSheet = false;
          //Opens coin sheet
          this.coinbSheet = true
        }   
      }
    },
    connectCoin(exchange){
      if(exchange === 'btcmarkets'){
        this.$store.dispatch('ADD_USER_EXCHANGE', this.btcMarkets )
        .then(() => {
          this.$store.dispatch('FETCH_USER_EXCHANGES')
        })
      }
    }
  },
  computed:{
    ...mapGetters([
      'userExchanges', 'user'
    ])
  },
  beforeCreate(){
    this.$store.dispatch('FETCH_USER_EXCHANGES');
    this.$store.dispatch('FETCH_PORTFOLIO_COINS');
  },
  created(){
    
  },
  mounted(){

  },
  
}
</script>

<style>
.main-container{
  padding: 1% 2%; 
}
</style>



