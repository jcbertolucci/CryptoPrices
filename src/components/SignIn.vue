<template>
  <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-btn
            color="primary"
            dark
            fab
            fixed
            bottom
            right
            class="mb-5 pb-5"
            @click="goHome"
          >
            <v-icon >home</v-icon>
          </v-btn>
          <v-layout align-center justify-center>
            <v-snackbar
              :timeout="10000"
              :top="true"
              v-model="snackbar"
            >
              {{ loginMsg }}
              <v-btn flat color="pink" @click="redirectUser">Close</v-btn>
            </v-snackbar>  
            <v-flex xs12 sm8 md4>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-card class="elevation-12">
                  <v-toolbar dark color="accent">
                    <v-toolbar-title>Please Log In</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    
                    </v-snackbar>
                    <v-form>
                      <v-progress-circular v-if="loading" indeterminate :size="50" color="primary"></v-progress-circular>
                      <v-text-field prepend-icon="person" name="login" label="Email" type="email" v-model="email"
                                    :rules="emailRules" required></v-text-field>

                      <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" :rules="[v => !!v || 'Item is required']"
                                    required></v-text-field>

                      <v-text-field prepend-icon="lock" name="password" label="Confirm Password" id="confirmPassword" type="password" v-model="passwordConf" :rules="[v => !!v || 'Item is required']" 
                                    required></v-text-field>
                    </v-form>
                  </v-card-text>
                  </v-btn>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="clear">clear</v-btn>
                    <v-btn color="primary" @click="signUserIp" :disabled="!valid">Sign In</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>  
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
/* eslint-disable */
import TitlesTemplate from './Titles.vue'
import * as firebase from 'firebase'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

  export default{
    props: {
      source: String
    },
    data(){
      return{
        loader: null,
        loading : false,
        loginMsg : "Your are logged in!",
        snackbar: false,
        fullName: '',
        email: '',
        password:  '',
        passwordConf: '',
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        select: null,
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      }
    },
    methods: {
      signUserIn(){
        if (this.$refs.form.validate()) {
          this.snackbar = false
          this.loading = true

          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$store.dispatch('UPDATE_USER', user)
            this.loading = false
            this.loginMsg = "Thanks for registring"
            this.snackbar = true
            /* console.log(this.user.uid)
            console.log(this.user.email) */
            
          })
          .catch(
            error => {
              this.loading = false
              this.loginMsg = error.message
              this.snackbar = true
            }
          )
          
        }

      },
      goHome(){
        this.$router.push(this.$route.query.redirect || '/')
      },
      clear() {
        console.log('clear')
        this.$refs.form.reset()
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    components:{
      'title-vue': TitlesTemplate
    }
  }
</script>

<style>
</style>

