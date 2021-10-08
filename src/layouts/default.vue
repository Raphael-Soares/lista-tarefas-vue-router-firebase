<template>
<v-app>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon v-on:click.stop="sidebar= !sidebar"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-icon >mdi-account </v-icon>
  </v-app-bar>

  <v-navigation-drawer app :mini-variant.sync="sidebar">

    <v-list color="primary" dark>
      <v-list-item >
        <v-list-item-action>
          <v-icon></v-icon>
        </v-list-item-action>
        <v-list-item>To Do List</v-list-item>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list-item class="px-2"  v-for="item of SidebarItems" :key="item.title" :to="item.to">
      <v-list-item-avatar >
        <v-icon>{{item.icon}}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content> {{item.name}} </v-list-item-content>
    </v-list-item>

       <v-divider></v-divider>

  </v-navigation-drawer>

  <v-main>

    <router-view></router-view>

  </v-main>

  <v-footer app>

    <span>Lista de tarefas de Raphael Soares - 2info3</span>

  </v-footer>

</v-app>
</template>

<script>
export default {
  data(){
    return{
      sidebar: false,
      SidebarItems: [
        {name:'Home', icon:'mdi-home', to:'/home'},
        {name:'profile', icon:'mdi-account', to:'/profile'},
        {name:'Exit', icon:'mdi-exit-to-app', to:'/login'}
      ]
    }
  }

}
</script>

<style>

</style>