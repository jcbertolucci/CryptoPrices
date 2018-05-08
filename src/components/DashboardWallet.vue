<template>
    <div id="template-wallet-parent">
        <div id="content-top">
            <v-layout >
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-layout row wrap class="pa-4">
                            <v-flex xs4>
                                <v-avatar :size="200" color="grey lighten-4">
                                    <img src="http://www.img.lirent.net/2014/10/Android-Lollipop-wallpapers-q.png">
                                </v-avatar>
                            </v-flex>
                            <v-flex xs8>
                                <p>Link your exchange account with us to start operating</p>
                                <br>
                                <br>
                                <span class="grey--text">We are currently accepting linking accounts with <br><span class="span-highlighted">Coinbase</span> and <span class="span-highlighted">BTCMarkets</span></span>                                
                            </v-flex>
                        </v-layout>        
                    </v-card>    
                </v-flex>
            </v-layout>    
        </div>
        <div id="content-bottom-left">Left</div>
        <div id="content-bottom-right">Right</div>
    </div>  
</template>

<script>
export default {
  data(){
      return{
      }
  }
}
</script>
<style>
#template-wallet-parent{
    display: grid;
    min-height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "card-top card-top"
                          "card-bottom-left card-bottom-right"; 
}
#content-top{
    grid-area: card-top;
    padding-top: 50px;
}
#content-bottom-left{
    grid-area: card-bottom-left;
}
#content-bottom-right{
    grid-area: card-bottom-right;
}
#content-top{
    text-align: left;
}
#content-top p{
    font-size: 24px;
    align-self: end;
}
.span-highlighted{
    color: orangered;
} 


</style>


