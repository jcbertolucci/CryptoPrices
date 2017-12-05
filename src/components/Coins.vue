<template id="CoinsTemplate reset-space">
  <div class="reset-space">
    <div class="tab reset-space border border-top-0 border-left-0 border-right-0">
      <button class="tablinks" v-for="coin in coins" v-bind:class="{active: coin.isActive}" @click="openCoin(coin)">{{coin.name}} 
        <p>{{coin.price}}</p>
      </button>
    </div>
    <div class="reset-space" v-for="coin in coins" v-if="coin.isActive">
      <div class="div-prices align-center reset-space top-padding">
        <div class="text-center">
          <h1 class="font-weight-normal">A${{coin.price}}</h1>
          <h6 class="font-weight-light">{{coin.name}} Price</h6>
        </div>
        <div class="text-center">
          <h1 class="font-weight-normal">{{coin.priceVar}}</h1>
          <h6 class="font-weight-light">Since Last Month(AUD)</h6>
        </div>
        <div class="text-center">
          <h1 class="font-weight-normal">{{coin.perVar}}</h1>
          <h6 class="font-weight-light">Since Last Month(%)</h6>
        </div>
      </div>
      <div>
        <graph-template :coin="currentCoin"></graph-template>
      </div>      
    </div>
  </div>  
</template>

<script>
/* eslint-disable */
import GraphTemplate from "./CoinGraph.vue";

export default {
  components: {
    'graph-template': GraphTemplate
  },
  data() {
    return {
      currentCoin:'',
      coins: [
        {
          name: "Bitcoin",
          price: "189.56",
          priceVar: "50.00",
          perVar: "56%",
          isActive: true
        },
        {
          name: "Litecoin",
          price: "400.00",
          priceVar: "A$3.00",
          perVar: "12%",
          isActive: false
        },
        {
          name: "Ripple",
          price: "3300.00",
          priceVar: "A$15.45",
          perVar: "1%",
          isActive: false
        },
        {
          name: "Monero",
          price: "200.00",
          priceVar: "A$56.00",
          perVar: "2%",
          isActive: false
        },
        {
          name: "Ethereum",
          price: "200.00",
          priceVar: "A$12.35",
          perVar: "90%",
          isActive: false
        }
      ],
    };
  },
  methods: {
    openCoin: function(coin) {
      //deactivate all elements
      this.coins.forEach(element => {
        element.isActive = false;
      });
      //activate clicked coin
      coin.isActive = true;
      //set the currentCoin to bind it to child component
      this.currentCoin = coin;
    }
  }
};
</script>

<style scoped>
.reset-space {
  padding: 0px;
}
.top-padding {
  padding-top: 20px;
}
div h1 {
  color: hsl(256, 67%, 23%);
  font-family: "Lato";
}
div h6 {
  color: hsl(256, 67%, 30%);
  font-family: "Lato";
  letter-spacing: 3px;
}
/* Style the tab */
div.tab {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
  grid-auto-rows: minmax(20px, auto);

  overflow: hidden;
  border: none;
  font-family: "";
  font-size: 24px;
}
div.div-prices {
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-gap: 1em;
  grid-auto-rows: minmax(20px, auto);
  letter-spacing: 3px;
}
div.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  color: hsl(0, 4%, 70%);
  transition: 0s;
}
/* Change background color of buttons on hover */
div.tab button:hover {
  --color: rgb(224, 65, 7);
}
/* Create an active/current tablink class */
div.tab button.active {
  color: rgb(224, 65, 7);
}
div.tab p {
  font-size: 16px;
}
/* Style the tab content */
.tabcontent {
  display: none;
  border: 1px solid #ccc;
  border-top: none;
}
</style>