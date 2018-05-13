<template>
    <div id="template-wallet-parent">
        <div id="content-top">
            <v-card id="card-top" flat>
                <div id="card-top-parent">
                    <div id="card-top-child-left">
                        <p>Linking your exchange account below allows you checking your account overview and operating assets</p>
                        <br>
                        <p class="grey--text caption">We are currently accepting linking accounts with <span class="span-highlighted">Coinbase</span> and <span class="span-highlighted">BTCMarkets</span></p>                                
                    </div>
                    <div id="card-top-child-right">
                        <v-avatar id="icon-left" :size="100" color="grey lighten-4">
                            <img src="data:image/png;base64,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">
                        </v-avatar>
                        <v-avatar id="icon-right" :size="100" color="grey lighten-4">
                            <img src="https://cdn-images-1.medium.com/max/1200/1*yvhnWkPk9aUmPElGe5mfqA.png">
                        </v-avatar>                         
                    </div>
                </div>
            </v-card>
        </div>
        <div id="content-bottom-left">
            <v-card class="content-card">
               <v-card-title class="elevation-2">
                <v-avatar size="50" class="pr-3">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEUYMhr///8AIwAAIQCssqwUMBcAIgANLBDn6ebIy8iaopnd390lPCWhqaFTYFQAGgAADwD3+fcAJgAAHwAAHQAAGwAOLBFFV0ZreWzO084bNh0AFQAAGAAAJwXs7uwGKQu7wLp9h30+Tz6IkYhib2FOXk1yfHPU2NRcaVuMlIyVnZUYNBezubMtQi01STTCx8EACwAAAADv8Si/AAAGxElEQVR4nO2da5eaSBBAeTUwisnQKAIqiIjjOD6y///PLYzJbNZ09QvJGFL3nJyTL9b0paurHwIaZkOYOklAjCFBgsRJw1bOaP75c+p6wxJsFD2Xzv2r4TErPrs5PVFkx9bQz+LPbklvxJlvGuF8qD3YUsxDI6Wf3YpeoanhuJ/diF5xHSPxPrsRveIlxsDmwVtIYAxb0Bi8H4IgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgfw6ExJYd2dY77X88Qu5yr2MTeGXb0TWwG0XuvQIrNYJalATzg/P0gTOpT4ZnWd3uOb4G3pTO+iPwerI/t4F/3x33pLCfg8MxNRnkx0k9m1G95xvIyl68HRxmYH892i6WmoHVWlHMgp0TshrxwaXczFaqaUW8qVVOfF7c8OW1Xqz6lSRWtl3nXL1rW9LyPFVpCrHIXiqwv9tE/TkS93QYi1txJT+eqeyQJDSr5AOv54X2WLeeWXx/5IRM3yb87LzlUi9kmkLstwM3O1mB9cqO5Zjhr5ijVpFEp6NSK955+jITpRShVPHCtaTbhU6uuhNmtJHVptFIvRktztni/s3CKyWGH4NLHanPkaBhXCRqafQTeeXBV5tE+yfdwOHEUE5VyHCRrXWb0ZJm0MNjcTTqEnhc24rdCBi+ftFL0A/CcslsiX1+6RbYHLlqVRUwvAPH7NeWkKjqeOUaXs5KDxf2Z2j6p9sxE3vOPQLn2+gxDE3/5lHVOLjcJ3BYWfKDsU9DM9xPf/pTRSC9hhFSydebXg2bliw//tJqozcJsllTWcWeDc3q648e3GhPr0ykFfs2NHfXwued7tmDLWtXTrF3w3C/agXvOAZ/MJHrxd4NzfzsGeTt/oLNCJg9hmH7Age70xIQ5HUqFtQ0DP0G6YF1+efQT+Bwu7q/Yegfq11SZ0EQzJNdNfFlVmHMc6bbwPmxKpN9G3iT7MrRWCbwWOL1LEqG4bp6W0a0KNrDTBIXBXUXNHHuUCWfXk+LiK4+Aq/cpZtI7JIv4vWbguFLtZwyyldhPyfaG753/Mpa/hqYFPa3WnjGsONvtlUMx0kBLulXtF5r7xnGpQGWfc/eCALnG9FeStIwLz3uaahHa719X15l3Gktjmp+HV6LtlJyho4nnF2950pjPF5Owl2CN91yu3ErONeQMcz37P36DfZJpmb+j1Lq9GxFecNxLJj3JQzTs8Ss0xLTSslvLLtZJ3bJCXPgFxuxocM4jYCYqhxSpIF8YLqHA4f8I0ahoTNTOdua7qQVU0PlfNeq4c1XxU0FkaEzVTu8i3a9CDa9WIPXzue+kEZgeFE+ZI5KKcGxQu5fsfZgsIRXKPiG45P6NwW2zDI7P6l/lUTBa/dScPqBa6j1XjdCJeZ+mU3BL9jgWeQXzvXiGlZabz2Lz8Jq4yx0AhMPqjZrzgKcZ5h+02lHE7MUCPrK34dfKaChmHNWRhzDcKP51TKhgr2GVo62zKA1aglH5BhOVM7O/4dXcwXXml3YDADozNWxwc/AhvlZ/+4Ayj2+r/Vvv7GB5vpL8COw4QS+LELiDUdQuN/hQE5AFXsD0wI27NCFhvHMOT3s0IVNe4FtxgG8bKDhpdMbQFclKOg/dwkcn9lRHXCDARqKNpZ8iAfOiRPhyQqXBXtOfAGLKWioNSf/B1jXzbrb7U0Wu8EheCcjZHiROjGHKaA9Rt7x0nlbdlzwjaWQoWDjLG4IdKtDlxL9zpQ9JYKpARluu76m1gWqKWf1IceSvbAHhzewXg87v818BhxLdb50Fnt3Bq5qIEN4jSAJkBz+qeulAyYiVcNxx3rQlJqEHbjj+AZrmKph2rGUNqWGvdMZay/nfwBcOlXDrqW0LaZsw87pD+wvVA1HvRl+FX+UDwmYqxo0/H2GnbMUDW9BQ21wHGqDhregoTZoqM3DGw6/lqKhkIc3xHEoBA1vwSzV5u81xCwV8vCGw+9DNBSChregoTZYS7VBw1vQUBs01ObhDYdfS4dvOPwsRUMhaHgLVhptsA+1eXjD4ffh8A2Hn6XDNxx+lqKhkIc3HP44HL4hZqkQNLwFs1Sbv9fwDlmq9rzFqnpikJadf5QgnqesyPDTrNIER1bgCnwmzrNYdH3AzGhfm8+i09PF36E9tRhBEARBEARBEARBEARBEARBEARBEARBEARBEARBEASg66vtHx1igL92MQxIYCTDvt3USwxH6xfj/hhcx0jvcS/y40JTQ+t3Df8YinlotD9Z/9nt6I04803DNI/ZUHuxyI5ma2j6c+p2/rWcR4N4Lp23T9S0hmaYOsnA5kUSJE76/jNT/wLRj5GPKj0IzQAAAABJRU5ErkJggg==">
                </v-avatar>
                <h2>BTC Markets</h2>
              </v-card-title>
              <v-divider></v-divider>
               <div class="container-inside-card">
                   <h3>API Key</h3>
                   <div class="item-inside-card" id="item-inside-card-top">
                   </div>
                   <h3>Account</h3>
                   <div class="item-inside-card" id="item-inside-card-middle"></div>
                   <h3>API Key</h3>
                   <div class="item-inside-card" id="item-inside-card-bottom"></div>
               </div>
            </v-card>
        </div>
        <div id="content-bottom-right">
            <!-- <div class="titles-wallet">
                <h2>Coinbase</h2>
            </div>
            <div class="content-card">
               <div class="container-inside-card">
                   <h3>API Key</h3>
                   <div class="item-inside-card" id="item-inside-card-top">
                   </div>
                   <h3>Account</h3>
                   <div class="item-inside-card" id="item-inside-card-middle"></div>
                   <h3>API Key</h3>
                   <div class="item-inside-card" id="item-inside-card-bottom"></div>
               </div>
            </div> -->
        </div>
    </div>  
</template>

<script>
export default {
  data(){
      return{
          alert: true
      }
  }
}
</script>
<style>

/* font-family: 'PT Sans', sans-serif;
font-family: 'Roboto', sans-serif;
font-family: 'Lato', sans-serif;
font-family: 'Raleway', sans-serif;
font-family: 'PT Serif', serif; */

#template-wallet-parent{
    display: grid;
    min-height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 3fr;
    grid-template-areas: "card-top card-top"
                          "card-bottom-left card-bottom-right"; 
    grid-gap: 20px;   
    padding: 0px 10px 20px 20px;                       
}
.content-card{
    /* border: 1px solid rgba(100, 100, 100, 0.24);
    border-radius: 10px; */
    min-height: 100%;
} 
.content-card h2{
  font-size: 35px;
}
.card-header{
    background-color: rgba(163, 162, 162, 0.192);
    height: 50px;
    border: 1px solid rgba(192, 190, 190, 0.192);
}
.container-inside-card{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.container-inside-card h3{
    color: #DD2C00;
    text-align: left;
    padding: 10px 0 2px 10px;
}
#item-inside-card-top{
    flex:1;
}
.item-inside-card{
    border: 1px solid whitesmoke;
    border-radius: 10px;
    background-color: white;
    margin: 0 5px 0 5px;
}
#item-inside-card-middle{
    flex:2;
}
#item-inside-card-bottom{
    flex:2;
}
.titles-wallet{
  /* border-bottom: 1px solid rgb(179, 177, 177); */
  /* margin-bottom: 15px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.titles-wallet h2{  
  position: absolute;
	bottom: 0px;
  font-size: 30px;
  color: #DD2C00;
}

.card-header h2{  
  padding-left: 10px;
  text-align: left;
  font-size: 30px;
  font-weight: 700;
  /* font-family: 'Montserrat', sans-serif; */
  /* font-family: 'PT Sans', sans-serif; */
  /* font-family: 'Raleway', sans-serif; */
  /* font-family: 'Roboto Slab', serif; */
}
#content-top{
    grid-area: card-top;
}
#card-top{
    width: 800px;
    margin: 20px auto 0 auto;
}
#card-top-parent{
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "card-top-left card-top-right";
}
#card-top-message{
    grid-area: card-top-message;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24);
}
#card-top-message p{
    padding: 5px 0 0 10px;
    color: #DD2C00;
    text-align: left;
}
#card-top-child-right{
    grid-area: card-top-right;
    text-align: center;
    align-self: center;
}
#card-top-child-left{
    grid-area: card-top-left;
    padding: 25px 25px 10px 25px;
}
#card-top-child-left p:first-child{
    line-height: 1.2em;
    font-size: 21px
}
#content-bottom-left{
    grid-area: card-bottom-left;
    height: 100%;
}
#content-bottom-right{
    grid-area: card-bottom-right;
}
#content-top{
    text-align: left;
}
#content-top p{
    font-size: 26px;
}
#icon-right{
    margin-left: 20px;
}
.span-highlighted{
    color: #DD2C00;
} 


</style>


