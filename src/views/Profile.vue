<template>
  <v-container class="pa-8" fluid>
    <h2 class="h2">Profile</h2>
    <v-form>
      <v-container>
        <v-text-field label="Name" v-model="name"></v-text-field>
        <v-text-field label="Last Name" v-model="lastname"></v-text-field>
        <v-btn color="primary" v-on:click="saveProfile">Save</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data(){
    return {
      name: '',
      lastname:'',
      uid: '',
      hasProfile: false
      
    }
  },
  async mounted() {
    this.uid = fb.auth.currentUser.uid;
    const userProfile = await fb.profileCollection.where("uid", "==", this.uid).get();
    if(userProfile.docs.length > 0) {
      this.hasProfile = true
      const profile = userProfile.docs[0]
      this.profileId = profile.id
      this.name = profile.data().name
      this.lastname = profile.data().lastname

    }


  },
  methods: {
    async saveProfile() {
      if (this.hasProfile) {
        await fb.profileCollection.doc(this.profileId).update({
          name: this.name,
          lastname: this.lastname
        })
      }
      else {
        await fb.profileCollection.add({
          uid: this.uid,
          name: this.name,
          lastname: this.lastname
        })
      }
    }
  }

}
</script>

<style>

</style>