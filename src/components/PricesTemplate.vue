<template>
  <div class="wrapper ma-0 pa-0">
    <v-container fluid ma-0>
      <v-layout row>
        <v-flex xs2>
          <h3>Currency:</h3>
        </v-flex>
        <v-flex xs10>
          <v-select
          single-line
          bottom
          :items="pairs"
          v-model="selectedPair"
          v-bind:label="selectedPair.name"
          single-line
          item-text="name"
          item-value="symbol"
          return-object
          class="wrapper ma-0 pa-0"
        ></v-select>
        </v-flex>  
      </v-layout>  
    </v-container>  
      
    
    <v-container id="container" fluid grid-list-md pa-0 ma-0>
      <v-data-iterator
        content-tag="v-layout"
        row
        :search="searchText"
        :items="marketCoinItems"
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
            <v-card-title>
              <h4>{{ props.item.name }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Price:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.priceAud }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Change day(%):</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.coinInfo.CHANGEPCTDAY }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Low Day:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.coinInfo.LOWDAY }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>High Day:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.coinInfo.HIGHDAY }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Volume Day:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.coinInfo.VOLUMEDAY }}</v-list-tile-content>
              </v-list-tile>
              <v-card-title><h4>Chart</h4></v-card-title>
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-content>To be implemented</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
          <!--EXCHANGES -->
          <br>
          <br>
          <h4>Exchanges</h4>
          <v-list dense>
            <v-list-tile v-for="item in props.item.exchanges" :key="item.MARKET">
              <v-list-tile-content>{{ item.MARKET }}</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ item.PRICE }}</v-list-tile-content>
            </v-list-tile>
          </v-list>  
 
        </v-flex>
      </v-data-iterator>
    </v-container>
  </div>  
</template>

<script>
  export default {
    props: ['searchText'],
    data: () => ({
      dialog: false,
      pairs:[
        /* {name: 'Australian Dollar', symbol: 'AUD'}, */
        {name: 'American Dollar', symbol: 'USD'}
      ],
      rowsPerPageItems: [5],
      pagination: {
        rowsPerPage: 5
      }
      
    }),
    watch:{
      searchText: function(newVal, oldVal) { // watch it
        return newVal
      },
      marketCoinItems: function(newVal, oldVal){
        let coinsWithExchanges = newVal.filter(coin=> coin.exchanges.length > 0)
        return coinsWithExchanges
      }
    },
    computed:{
      marketCoinItems() {
        let coinsWithExchanges = this.$store.getters.marketCoinItems.filter(coin=> coin.exchanges.length > 0)
        return coinsWithExchanges
      },
      selectedPair: {
        get: function () {
          return this.$store.getters.selectedPair
        },
        set: function (newValue) {
          console.log(newValue)
          this.$store.dispatch("UPDATE_PAIR", newValue)
        }
      }
    }  
  }
</script>

<style>
.wrapper{
  min-height: 100%;
}
#container{
  height: stretch;
}
#progress-circular{
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
}
#container h4{
  font-weight: 500;
  display:block;
}
#container h4 span{
  padding-left: 50%;
  font-weight: 600;
  text-align: right;
  display:block
}


</style>

