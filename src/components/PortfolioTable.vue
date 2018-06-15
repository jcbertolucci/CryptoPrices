<template id="portfolio-table" v-if="coinsUser">
  <v-card align-left>
    <v-dialog v-model="dialog" max-width="600px">
      <v-btn fab color="primary" slot="activator" class="mb-2 ">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-card>
        <v-card flat class="card-header white--text" color="primary" >
          <v-layout row justify-space-around align-center>
            <v-flex xs11 ma-2 ml-3 text-left>
              <span class="headline">{{ formTitle }}</span>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs1 ma-2> 
              <v-btn flat icon color="white" @click="closeModal">
                <v-icon>close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
        <v-card-text>
          <v-container grid-list-md >
            <v-layout wrap>

              <v-flex xs12 sm12>
                <v-select
                  autocomplete
                  browserAutocomplete="off"
                  label="Select a coin to add to portfolio"
                  item-text="name"
                  item-value="value"
                  v-bind:items="coinsSearchList"
                  v-model="editedItem.name">
                </v-select>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  prepend-icon="view_headline"
                  v-model="editedItem.amount"
                  label="Amount"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  prepend-icon="monetization_on"
                  mask="$#.###"
                  label="Buy price"
                  v-model="editedItem.buyPrice"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 sm6>
                <v-select
                  autocomplete
                  label="Currency"
                  browserAutocomplete="off"
                  item-text="value"
                  item-value="value"
                  v-bind:items="currencySearchList"
                  v-model="editedItem.currency">
                </v-select>
              </v-flex>
              <v-flex xs6 sm6>
                <v-menu
                  ref="menu"
                  lazy
                  :close-on-content-click="false"
                  v-model="menu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  min-width="290px"
                  :return-value.sync="editedItem.buyDate"
                >
                  <v-text-field
                    slot="activator"
                    label="Bought on"
                    v-model="editedItem.buyDate"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="editedItem.buyDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="$refs.menu.save(editedItem.buyDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>                
              </v-flex>     
              <v-flex xs12>
                <v-text-field
                  name="description"
                  label="Description"
                  v-model="editedItem.description"
                  :counter="100"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="saveModal">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="newArray"
      hide-actions
      class="elevation-1 ma-0 pa-0"
    >
      <template slot="items" slot-scope="props" class="text-left">
        <td class="text-xs-left">{{ props.item.name }} <span class="space-between">({{ props.item.name }})</span> </td>
        <td class="text-xs-right">{{ props.item.buyDate }}</td>
        <td class="text-xs-right">{{ props.item.amount }}</td> 
        <td class="text-xs-right">{{ props.item.formatedBuyPrice }}</td>
        <td class="text-xs-right">{{ props.item.formatedCalculatedItem.totalValue }}</td>
        <td class="text-xs-right">{{ props.item.formatedCalculatedItem.currentPrice }}</td>
        <td class="text-xs-right">{{ props.item.formatedCalculatedItem.currentValue }}</td>
        <td class="text-xs-right">{{ props.item.formatedCalculatedItem.profitLoss }}</td>
        <td class="text-xs-right">{{ props.item.change}}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, no coins. Try adding a new one :)
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>
  

<script>
import {mapGetters} from 'vuex'
import utils from '../../src/utils/utils.js'

  export default {
    data: () => ({
      //Charts
      

      newCoinsUser: null,
      coinDescription: null,
      date: null,
      menu: false,
      currencySearchList: [{value: 'USD'}, {value: 'AUD'}],
      selectedCurrency: null,
      selectedCoin: null,
      coinsSearchList: [
        {name:'Bitcoin', value: 'BTC'},
        {name:'Ethereum', value: 'ETC'},
        {name:'Litecoin', value: 'LTC'},
        {name:'Iota', value: 'IOTA'},
        {name:'Ripple', value: 'XRP'},
      ],
      coin: {},
      coins: [],
      dialog: false,
      headers: [
        {
          text: 'Coin',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Bought on', align: 'right', value: 'boughtOn' },
        { text: 'Amount', align: 'right', value: 'amount' },
        { text: 'At Price', align: 'right', value: 'boughtAtPrice' },
        { text: 'Total Value', align: 'right', value: 'totalValue' },
        { text: 'Current Price', align: 'right', value: 'currentPrice' },
        { text: 'Current Value', align: 'right', value: 'currentValue' },
        { text: 'Profit/Loss', align: 'right', value: 'profitLoss' },
        { text: 'Change', align: 'right', value: 'change' },
        { text: 'Actions', align: 'center', value: 'name', sortable: false }
      ],
      /* items: tableData, */ //TODO
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        symbol: '',
        amount: null,
        buyPrice: null,
        formatedBuyPrice: null,
        currency: null,
        buyDate: null,
        description: '',
        calculatedItem: {
          totalValue: 0,
          currentValue: 0,
          currentPrice: 0,
          profitLoss: 0
        },
        formatedCalculatedItem: {
          totalValue: 0,
          currentValue: 0,
          currentPrice: 0,
          profitLoss: 0
        }

      },
      defaultItem: {
        name: '',
        symbol: '',
        amount: null,
        buyPrice: null,
        formatedBuyPrice: null,
        currency: null,
        buyDate: null,
        description: '',
        calculatedItem: {
          totalValue: 0,
          currentValue: 0,
          currentPrice: 0,
          profitLoss: 0
        },
        formatedCalculatedItem: {
          totalValue: 0,
          currentValue: 0,
          currentPrice: 0,
          profitLoss: 0
        }
      },
      textCoinSearch: ''
    }),
    computed: {
      ...mapGetters([
        'coinsUser'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'Add a coin to portfolio' : 'Editing coin'
      },
      newArray(){
        let symbol = ''
        let currency = ''
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let url = ''
        let array = this.coinsUser
        array.map((item)=>{
          symbol = item.name
          currency = item.currency
          url = `${proxyUrl}https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=${symbol}&tsym=${currency}`
          fetch(url)
          .then(response => response.json())
          .then(function(data){ 
            if(data.Data){
              item.calculatedItem.currentPrice = data.Data.AggregatedData.PRICE
              item.calculatedItem.currentValue =  (item.calculatedItem.currentPrice * item.amount)
              item.calculatedItem.totalValue = (item.buyPrice * item.amount)
              item.calculatedItem.profitLoss = (item.calculatedItem.currentValue - item.calculatedItem.totalValue)

              //Format numbers
              item.formatedBuyPrice = utils.formatNumbersCents(item.buyPrice)
              item.formatedCalculatedItem.currentPrice = utils.formatNumbersCents(data.Data.AggregatedData.PRICE)
              item.formatedCalculatedItem.currentValue =  utils.formatNumbersCents((item.calculatedItem.currentPrice * item.amount))
              item.formatedCalculatedItem.totalValue = utils.formatNumbersCents((item.buyPrice * item.amount))
              item.formatedCalculatedItem.profitLoss = utils.formatNumbersCents((item.calculatedItem.currentValue - item.calculatedItem.totalValue))
            }
          })
        })
        console.log(array)
        return this.coinsUser
      }
    },

    watch: {
      coinsUser: (value) =>{
        return value
      },
      dialog (val) {
        val || this.closeModal()
      },
      selectedCoin(val){
        this.selectedCoin = val
      },
      selectedCurrency(val){
        this.selectedCurrency = val
      }
    },
    mounted () {
      
    },

    methods: {
      openListCoin (event) {
        console.log(event)
      },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },

      closeModal () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      saveModal () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.$store.dispatch('SAVE_COIN_FIREBASE', this.editedItem)
          /* this.items.push(this.editedItem) */
        }
        this.closeModal()
      },
      calculateValues(){

      }
    }
  }
</script>
<style>
.card-header span{
  font-weight: 500
}
</style>


