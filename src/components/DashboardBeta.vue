<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="" :to="'/dashboard/coin'">
          <v-list-tile-action>
            <v-icon>attach_money</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Prices</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="" :to="'/dashboard/wallet'">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Trade</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Portfolio</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>bar_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Charts</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="mt-3" @click="alert('clicked')">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">EXCHANGES</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ user.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list-tile-avatar>
        <img v-if="(this.user.imgUrl !== '')" :src="user.imgUrl" alt="" class="elevation-5">
        <div v-else class="rounded-div elevation-5" >{{ user.name.charAt(0).toUpperCase() }}</div>
      </v-list-tile-avatar>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center class="main-container">
          <v-flex shrink>
            <v-fade-transition mode="out-in">
              <router-view></router-view>
            </v-fade-transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>Incliti &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true
  }),
  computed:{
    user: {
      get(){
        return this.$store.getters.user
      },
    }

  },
  created(){
  },
  
}
</script>

<style>
.main-container{
  padding: 1% 2%; 
}
.rounded-div{
  align-items: center;
  justify-items: center;
  width: 40px;
  height: 40px;  
  border-radius: 50%;
  background-color: white;
  color: var(--primary);
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

</style>



