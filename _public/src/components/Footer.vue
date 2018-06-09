<template>
  <footer class="grey darken-3" >
      <v-layout row justify-space-between >
      <v-flex xs4 class="grey darken-4" align-center>
          <v-toolbar-title mt-5 class="white--text align-center">Incliti <span class="caption">TM</span></v-toolbar-title>
      </v-flex> 
      <v-flex xs3 mr-4 class="grey darken-3">
            <v-btn block outline  class="white--text" >Donate</v-btn>
            <span class="white--text caption">BTC: 1DSkHwCd45X1TYGjowDJNJuQV8Uci9jLXy</span>
      </v-flex> 
      </v-layout>
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

