<template id="TableVuetify">
  <v-data-table v-if="calledFromHomePath" :headers="coinTableHeader" :items="coinTableItems" hide-actions class="elevation-2" >
    <template slot="items" slot-scope="props" class="table">
      <td class="text-xs-left pl-0">
        <v-btn color="grey" small flat dark>
          <img :src="props.item.imageUrl" height="30">
        </v-btn>              
        {{ props.item.name }}
      </td>
      <td class="text-xs-right">{{ props.item.priceUsd }}</td>
      <td class="text-xs-right">{{ props.item.priceAud }}</td>
      <td class="text-xs-right">{{ props.item.marketCapUsd }}</td>
      <td class="text-xs-right">{{ props.item.volumeUsd }}</td>
      <td class="text-xs-right">{{ props.item.totalSupply }}</td>
      <td class="text-xs-right pr-2">
        <v-btn round outline color="error" class="error--text center" v-if="isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
        <v-btn round outline color="green" class="green--text center" v-else ="!isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
      </td>
      <td class="text-xs-right pr-2">
        <v-btn round outline color="error" class="error--text center" v-if="isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
        <v-btn round outline color="green" class="green--text center" v-else ="!isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
      </td>
    </template>
    <template slot="no-data">
      <v-progress-circular indeterminate v-bind:size="200" v-bind:width="3" color="deep-orange accent-4"></v-progress-circular>
    </template>
    <template slot="footer">
      <td colspan="100%">
        <i class="text caption right pr-3">Data retrivied from <a rel="stylesheet" href="https://coinmarketcap.com/" target="_blank">CoinMarket</a></i>
      </td>
    </template>
  </v-data-table>

  <!-- If called from Coins page -->
  <v-card v-else-if="calledFromCoinsPath"> 
    <v-container fluid grid-list-md>
      <v-text-field
        append-icon="search"
        label="Search Coin"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
      <br>
      <v-data-iterator
        content-tag="v-layout"
        row
        wrap
        :items="filteredItems"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title class="pa-3 ma-0">
              <v-btn small flat dark class="pa-0 ma-0">
                <img class="pa-0 ma-0" :src="props.item.imageUrl" height="30">
              </v-btn> 
              <h4>{{ props.item.name }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Price US$:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.priceUsd }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Price A$:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.priceAud }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Market Cap US$:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.marketCapUsd }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Volume US$:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.volumeUsd }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Circulating Supply:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.totalSupply }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Change (24h)%:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.dayPercVar }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Change (7d)%:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.weekPercVar }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
    <!-- <v-card-title>
        Quick search:
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
        </v-card-title>
        <v-data-table
            v-bind:headers="coinTableHeader"
            v-bind:items="filteredItems"
            v-bind:search="search"
            :rows-per-page-items="[10,20,30,50,100]"
          >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left pl-0" v-model="props.item.name" counter>
              <v-btn color="grey" small flat dark>
                <img :src="props.item.imageUrl" height="30">
              </v-btn>              
              {{ props.item.name }}
            </td>
            <td class="text-xs-right">{{ props.item.priceUsd }}</td>
            <td class="text-xs-right">{{ props.item.priceAud }}</td>
            <td class="text-xs-right">{{ props.item.marketCapUsd }}</td>
            <td class="text-xs-right">{{ props.item.volumeUsd }}</td>
            <td class="text-xs-right">{{ props.item.totalSupply }}</td>
            <td class="text-xs-right pr-2">
              <v-btn color="error" class="white--text center" v-if="isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
              <v-btn color="green" class="white--text" v-else ="!isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
            </td>
            <td class="text-xs-right pr-2">
              <v-btn color="error" class="white--text" v-if="isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
              <v-btn color="green" class="white--text" v-else ="!isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
            </td>
            
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table> -->
   <!-- <v-data-table v-bind:headers="coinTableHeader" v-bind:items="allCoinsTableItems" v-bind:search="search" rows-per-page-text="10" rows-per-page-items="[5,10,15,{'fsjh', value: -1}]">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left pl-0">
          <v-btn color="grey" small flat dark>
            <img :src="props.item.imageUrl" height="30">
          </v-btn>              
          {{ props.item.name }}
        </td>
        <td class="text-xs-right">{{ props.item.priceUsd }}</td>
        <td class="text-xs-right">{{ props.item.priceAud }}</td>
        <td class="text-xs-right">{{ props.item.marketCapUsd }}</td>
        <td class="text-xs-right">{{ props.item.volumeUsd }}</td>
        <td class="text-xs-right">{{ props.item.totalSupply }}</td>
        <td class="text-xs-right pr-2">
          <v-btn color="error" class="white--text center" v-if="isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
          <v-btn color="green" class="white--text center" v-else ="!isNegative(props.item.dayPercVar)">{{ props.item.dayPercVar }}</v-btn>
        </td>
        <td class="text-xs-right pr-2">
          <v-btn color="error" class="white--text center" v-if="isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
          <v-btn color="green" class="white--text center" v-else ="!isNegative(props.item.weekPercVar)">{{ props.item.weekPercVar }}</v-btn>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table> -->


  </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'coinTableHeader',
        'coinTableItems',
        'allCoinsTableItems'
      ]),
      calledFromCoinsPath: function(){
        return this.getRoutePath() === '/coins'
      },
      calledFromHomePath: function(){
        return this.getRoutePath() === '/'
      },
      filteredItems: function(){
        if (this.search.length <= 0) {
          return this.allCoinsTableItems
          console.log(this.search)
          console.log(filter)
        }else{
          console.log(this.search)
        }
        let filter = this.allCoinsTableItems.filter( (i) => {
          return i.name.toLowerCase().includes(this.search.toLowerCase())  //this.search.toLowerCase())
        }) 
        console.log(filter)
        console.log(this.allCoinsTableItems)
        return filter
      }
    },
    data(){
      return{
        tmp: '',
        search: '',
        pagination: {},
        rowsPerPageItems: [1],
        pagination: {
          rowsPerPage: 48
        }
      }
    },
    methods: {
      max25chars: (v) => v.length <= 10 || 'Input too long!',

      isNegative: (number) =>{
        return number < 0 ? true : false
      },
      getRoutePath: ()=>{
        return window.location.pathname
      },
    }
  }
</script>

<style scoped>
.parent{
  display: flex;
  flex-direction: row;
}
.item{
  width: 100%;
  padding-top: 10px;

}
/* .item:nth-child(1){
  order: 1
} */

</style>

