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
            <v-flex xs12 sm8 md6  >
              <v-layout row id="alert-component" v-if="error">
                  <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
              </v-layout>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-card class="elevation-12">
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Sign Up</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field prepend-icon="person" name="login" label="Full Name" type="text" v-model="fullName" :rules="nameRules" :counter="10"
                                    required>
                      </v-text-field>

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
                    <p class="ml-4">Have an account already? <router-link to="/signin">Log In</router-link> </p>
                    <v-spacer></v-spacer>
                    <v-btn @click="clear">clear</v-btn>
                    <v-btn color="primary" @click="signUserUp" :disabled="!valid">Sign Up</v-btn>
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
    data(){
      return{
        fullName: '',
        email: '',
        password:  '',
        passwordConf: '',
        valid: true,
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'userAuth',
        'firebaseMsg'
      ]),
      error(){
        return this.$store.getters.error
      },
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      }
    },  
    watch:{
      user(value){
        if(value !== null && value !== undefined){
          this.$router.push('/signin')
        }
      },
      firebaseMsg(value){
        this.snackbar = true
        console.log(value)
      }
    },
    methods: {
      onDismissed(){
        this.$store.dispatch('CLEAR_ERROR')
      },
      signUserUp(){
        
        if (this.$refs.form.validate()) {
          new Promise((resolve, reject) => {
            this.$store.dispatch('SIGN_USER_UP', {email: this.email, password: this.password})
            resolve('Success')
            reject('Error')
          })
          .then((val) => {
            /* this.$router.push(this.$route.query.redirect || '/signin') */
          }).catch((val) => {
            console.log(val)
          })
        }
      },
      goHome(){
        this.$router.push(this.$route.query.redirect || '/')
      },
      clear() {
        this.$refs.form.reset()
      }
    },
    created(){
    }
  }
</script>

<style>
.card-registered{
  min-height: 100px;
  min-width: 500px
}
.registered-message{
  font-family: 'Roboto', sans-serif;
  font-size: 50px;
}
</style>

