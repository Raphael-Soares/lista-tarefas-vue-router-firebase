<template>
  <v-container fill-height fluid text-center>
      <v-container>
        <v-row>                         
            <v-col class="primary--text text-center mx-auto pb-4" cols="1" sm="4" offset="4">
                <h1 class="h1">login</h1>
            </v-col>
        </v-row>
        <v-row class="elevation-3 mx-auto">
            <v-col cols="auto">
                <v-img 
                    max-height="200" 
                    max-width="200" 
                    src="@/assets/images/to do list icon.png"
                    ></v-img>
            </v-col>
            <v-col>
                <v-form>
                    <v-text-field type="email" label="Email" v-model="user.email"></v-text-field>
                    <v-text-field 
                    label="Password" 
                    v-model="user.password" 
                    :type=" show ? 'text' : 'password'" 
                    :append-icon=" show ? 'mdi-eye' : 'mdi-eye-off'" 
                    v-on:click:append="show = !show"></v-text-field>
                    <v-btn v-on:click="login" color="primary">Login</v-btn>
                    <v-btn v-on:click="reset" class="ml-2" color="warning">Cancel</v-btn>
                </v-form>
            </v-col>
        </v-row>

        <v-snackbar color="red" v-model="errorLogin" danger multi-line timeout="2000">Invalid user/password</v-snackbar>

        <v-dialog v-model="NewAccount" persistent max-width="300">
            <v-card>
                <v-card-title>
                    Account not found
                </v-card-title>

                <v-card-text>
                    Create a new account?
                </v-card-text>

                <v-card-actions>

                    <v-spacer>
                        <v-btn color="green darken-1" text v-on:click="CreateNewAccount">Yes</v-btn>
                        <v-btn color="red darken-1" text v-on:click="newAccount = false">No</v-btn>
                    </v-spacer>

                </v-card-actions>
            </v-card>
        </v-dialog>

      </v-container>

  </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
    data(){
        return {
            user: {email:'', password:''},
            show: false,
            errorLogin: false,
            NewAccount: false
        }
    },
    methods : {
        reset() {
            this.user= {}
        },
        async CreateNewAccount() {
            this.NewAccount = false
            await fb.auth.createUserWithEmailAndPassword(
                this.user.email, 
                this.user.password
                )
                this.login()
        },
        async login() {
           try {
               await fb.auth.signInWithEmailAndPassword(
                   this.user.email, 
                   this.user.password
                   );
               this.$router.push({name:"Home"})
           } catch(error){
               const errorCode = error.code
               switch(errorCode){
                   case "auth/wrong-password":
                       this.errorLogin = true
                       break
                    case "auth/invalid-email":
                        this.errorLogin = true
                        break
                    case "auth/user-not-found":
                        this.NewAccount = true
                        break
                    default :
                        this.errorLogin = true
               }
           
           }
        },

      

    }
}


</script>

<style>

</style>