<template>
  <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <v-btn
                      icon
                      large
                      :href="source"
                      target="_blank"
                      slot="activator"
                    >
                      <v-icon large>code</v-icon>
                    </v-btn>
                    <span>Source</span>
                  </v-tooltip>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                    <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  <!--
  <div class="center" id="main-div">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="card">
            <img src="/src/assets/incliti2.png" width="200" height="50" class="center-logo rounded" alt="">
            <h1 class="center-title title">Register</h1>
            <br>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Full Name" v-model="fullName">
                <span class="icon is-small is-left">
                  <i class="fas fa-address-book"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Password" v-model="password">
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Confirm Password" v-model="passwordConf">
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
              </div>
            </div>
            <br>
            <div class="field">
              <div class="control">
                <div class="g-signin2 centered" data-width="200" data-height="50" data-longtitle="true" data-onsuccess="onSignIn"></div>
                <button class="button orange btn">Register</button>
              </div>
            </div>
            <br>
          </div>
        </div>
      </div>
    </div>      
  </div>  
  
      <v-container >
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 >
            <v-card>
              <v-snackbar
                v-model="snackbar"
                absolute
                top
                right
                color="success">
                <span>Registration successful!</span>
                <v-icon dark>check_circle</v-icon>
              </v-snackbar>
              <v-card-text>
                <v-container>
                  <form @submit.prevent="signUserUp()">
                    <v-layout row>
                      <v-flex xs8>
                        <v-text-field
                          name="email"
                          label="Email"
                          id="email"
                          v-model="email"
                          type="email"
                          required>
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs8>
                        <v-text-field
                          name="Password"
                          label="Password"
                          id="password"
                          v-model="password"
                          type="password"
                          required>
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs8>
                        <v-text-field
                          name="Password"
                          label="Confirm Password"
                          id="confirmPassword"
                          v-model="confirmPassword"
                          type="password"
                          :rules="[comparePasswords]"
                          required>
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex x12>
                        <v-btn class="deep-orange darken-2 white--text" type="submit">Sign Up</v-btn>
                      </v-flex>
                    </v-layout>
                  </form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  -->
</template>

<script>
/* eslint-disable */
import TitlesTemplate from './Titles.vue'
import * as firebase from 'firebase'

  export default{
    props: {
      source: String
    },
    data(){
      return{
        email: '',
        password:  '',
        confirmPassword: '',
        snackbar: false,
        drawer: null
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      }
    },
    methods: {
      signUserUp(){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user)
          this.snackbar = true
        })
        .catch(
          error => {
            console.log(error.message)
          }
        )
      },
    },
    components:{
      'title-vue': TitlesTemplate
    }
  }
  
</script>

<style>
/*
.center{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
}
.center-logo{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
}
.center-title{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0%;
  margin-top: 0%
}
.field{
  padding-left:20%;
  padding-right: 20%
}
.orange{
    width:100%;
    display:block;
    background-color: #e7410e;
    color: whitesmoke
}
.btn{
  color: whitesmoke
}
.btn:hover{
  color: whitesmoke
}
.centered{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 50%;
  margin: auto;
  margin-bottom: 5%
}
*/
</style>

