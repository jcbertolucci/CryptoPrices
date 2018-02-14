<template>
  <v-card height="350px">
    <v-navigation-drawer permanent absolute v-model="drawer">
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

