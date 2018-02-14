<template>
  <footer class="footer parent accent" >
    <div class="item">
      <v-card class="item accent" flat>
        <v-toolbar-title class="white--text">Incliti <span class="caption">TM</span></v-toolbar-title>
      </v-card>
    </div>
    <div class="item">
      <v-card class="item accent" flat>
        <v-btn block class="white white--text" large outline @mouseenter="updateHoverState($event)" @mouseleave="updateHoverState($event)">Donate</v-btn>
        <span class="white--text caption">ETH: 0xf55f6fec2fb454fc69c5e809934312b34a69913c</span>
        <span class="white--text caption">BTC: 1DSkHwCd45X1TYGjowDJNJuQV8Uci9jLXy</span>
      </v-card>
    </div>
    <div class="item">
      <v-card class="item" color="white" flat>
        
      </v-card>
    </div>
  </footer>
</template>

<script> 
  export default{
    data(){
      return{
      }
    },
    methods:{
      updateHoverState: (event) => {
        //isHovered ? console.log('Hover') : console.log('Out of button')
        //let element = document.getElementById("btn-donate").className += " hover";
        event.type === 'mouseenter' ? event.target.classList.remove('btn--outline') : event.target.classList.add('btn--outline')
        event.type === 'mouseenter' ? event.target.classList.remove('white--text') : event.target.classList.add('white--text')

        event.type === 'mouseleave' ? event.target.classList.remove('black--text') : 
        
        

        //event.type === 'mouseenter' ? event.target.classList.remove('btn--depressed') : event.target.classList.add('btn--depressed')
        //event.type === 'mouseenter' ? event.target.background = '#fff' : event.target.classList.remove('orange--text')
        console.log(event.target)
        
      }
    }
  }
</script>

<style>
.parent{
  display: flex;
  justify-content:space-between
}
.item{
  width: 300px;
  align-self:inherit
}
.caption{
  justify-self: stretch
}


</style>

