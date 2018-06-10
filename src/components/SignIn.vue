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
            <!-- <v-snackbar
              :timeout="10000"
              :top="true"
              v-model="activateMsgSnack"
            >
              {{ firebaseMsg }}
               <v-btn flat color="pink" @click="redirectUser">Close</v-btn> 
              <v-btn flat color="pink">Close</v-btn>
            </v-snackbar>   -->
            <!-- <v-layout row id="alert-component" v-if="error">
                <v-flex xs12 sm6 offset-sm3>
                  <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                </v-flex>
              </v-layout> -->
            <v-flex xs12 sm8 md4>
              
              <v-layout row id="alert-component" v-if="error">
                  <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
              </v-layout>

              <v-form v-model="valid" ref="form" lazy-validation>
                <v-card class="elevation-12" align-center>
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Log In</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    
                    </v-snackbar>
                    <v-form>
                      <v-progress-circular v-if="loading" indeterminate :size="50" color="primary"></v-progress-circular>
                      <v-text-field prepend-icon="person" name="login" label="Email" type="email" v-model="email"
                                    :rules="emailRules" required></v-text-field>

                      <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" :rules="[v => !!v || 'Item is required']"
                                    required></v-text-field>

                     <!--  <v-text-field prepend-icon="lock" name="password" label="Confirm Password" id="confirmPassword" type="password" v-model="passwordConf" :rules="[v => !!v || 'Item is required']" 
                                    required></v-text-field> -->
                    </v-form>
                  </v-card-text>
                  </v-btn>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outline color="primary" @click="onSignInGoogle">
                      <i class="fab fa-google"></i>
                      <v-card-text>Login with google</v-card-text>                   
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>  
                  <v-card-actions class="mt-4">
                    <p class="ml-4">Don't have an account? <router-link to="/signup">Register</router-link> </p>
                    <v-spacer></v-spacer>      
                    <v-btn @click="clear">clear</v-btn>
                    <v-btn color="primary" @click="onSignIn" :disabled="!valid">Sign In</v-btn>
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
import * as firebase from 'firebase'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

  export default{
    props: {
      source: String
    },
    data(){
      return{
        /* loader: null, */
        loading : false,
        loginMsg : "Your are logged in!",
        snackbar: false,
        /* fullName: '', */
        email: '',
        password:  '',
        /* passwordConf: '', */
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        select: null
      }
    },
    computed: {
      error(){
        return this.$store.getters.error
      },
      user(){
        return this.$store.getters.user
      },
      firebaseMsg(){
        return this.$store.getters.firebaseMsg
      },
      activateMsgSnack(){
        return this.$store.getters.activateMsgSnack
      }
    },
    watch: {
      user(value) {
        if(value !== null && value !== undefined) {
          /* this.$router.push('/portfolio') */
          this.$router.push('/dashboard')
        }
      },
      firebaseMsg(value){
        console.log(value)
        return value
      },
      activateMsgSnack(value){
        console.log(value)
        return true
      }

    },
    methods: {
      onDismissed(){
        this.$store.dispatch('CLEAR_ERROR')
      },
      onSignIn(){
        this.$store.dispatch('SIGN_USER_IN', {email: this.email, password: this.password})
      },
      onSignInGoogle(){
        this.$store.dispatch('SIGN_USER_IN_GOOGLE')
      },
      goHome(){
        this.$router.push(this.$route.query.redirect || '/')
      },
      clear() {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style>
/* #google-icon{
  margin: 0 10px 0 0;
  border: 0 10px 0 0;
} */
#alert-component{
  padding-bottom: 5px;
}
</style>