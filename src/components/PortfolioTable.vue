<template id="portfolio-table">
  <v-card align-left>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn fab color="primary" slot="activator" class="mb-2 ">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md >
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Coin" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Price" v-model="editedItem.price"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Total Value" v-model="editedItem.totalValue"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Profit/Loss" v-model="editedItem.profitLoss"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Change" v-model="editedItem.change"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="tableData"
      hide-actions
      class="elevation-1 ma-0 pa-0"
    >
      <template slot="items" slot-scope="props" class="text-left">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.totalValue }}</td>
        <td class="text-xs-right">{{ props.item.profitLoss }}</td>
        <td class="text-xs-right">{{ props.item.change }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>
  

<script>
  export default {
    props:[
      'tableData'
    ],
    data: () => ({
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
        { text: 'Price', align: 'right', value: 'price' },
        { text: 'Total Value', align: 'right', value: 'totalValue' },
        { text: 'Profit/Loss', align: 'right', value: 'profitLoss' },
        { text: 'Change', align: 'right', value: 'change' },
        { text: 'Actions', align: 'center', value: 'name', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        price: 0,
        totalValue: 0,
        profitLoss: 0,
        change: 0
      },
      defaultItem: {
        name: '',
        price: 0,
        totalValue: 0,
        profitLoss: 0,
        change: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      //this.initialize()
    },

    methods: {
      initialize () {
        
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

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
<style>
.width{
  
}
</style>


