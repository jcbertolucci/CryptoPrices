<template>
  <v-card>
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
    <v-navigation-drawer permanent v-model="drawer">
      <v-toolbar flat class="transparent">
        <v-list class="padding">
          <v-list-tile avatar >
            <v-list-tile-avatar size="45px">
              <img :src="currentCoin.imageUrl">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="title grey--text"><strong>{{ currentCoin.name }}</strong></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense class="padding">
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon size="30px">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="body-2">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

  export default {
    /* eslint-disable */
    computed: {
      ...mapGetters([
        'currentCoin'
      ])
    },
    data(){
      return {
        drawer: true,
        items: [
          { title: 'Charts', icon: 'trending_up' },
          { title: 'Market', icon: 'shopping_basket' },
          { title: 'Social', icon: 'group' },
          { title: 'Historical data', icon: 'timeline' }
        ],
        right: null
      }
    }
  }  
</script>

<style scoped>
.padding{
  padding: 10px
}
</style>

