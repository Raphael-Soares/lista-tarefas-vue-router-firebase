<template>
  <v-container class="pa-8" fluid>
    <h2 class="h2">Home Page</h2>
    <v-form>
      <v-text-field label="New task" v-model="NewTask" v-on:keydown.enter="AddTask">
        <v-icon slot="append" v-on:click="AddTask">mdi-send</v-icon>
      </v-text-field>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="task of tasks" :key="task.id">{{task.title}}</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-form>
  </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data(){
    return{
      NewTask: '',
      tasks: [],
      uid: '',

    }
  },
  mounted(){
    this.uid = fb.auth.currentUser.uid;
    this.takeTasksFromServer()
  },
  methods: {
    async AddTask(){
      await fb.tasksCollection.add({
        title: this.NewTask,
        createDate: new Date().toISOString().slice(0, 10),
        owner: this.uid
      })
      this.NewTask ='',
      this.takeTasksFromServer()
    },
    async takeTasksFromServer() {
      this.tasks = []
      const logTasks = await fb.tasksCollection.where('owner', "==", this.uid).get();
      for (const doc of logTasks.docs) {
        this.tasks.push({
          title: doc.data().title,
          id: doc.id
        })
      }
    }
  }

}
</script>

<style>

</style>