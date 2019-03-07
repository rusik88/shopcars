<template>
  <v-app>
      <v-navigation-drawer 
        app
        temporary
        v-model="drawer"
        >
            <v-list>
                <v-list-tile  :to="link.url" v-for="link of links" :key="link.title">
                    <v-list-tile-action>
                    <v-icon>{{ link.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title v-text="link.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
               
            </v-list>
        </v-navigation-drawer>
      <v-toolbar app dark color="primary">
            <v-toolbar-side-icon 
                @click="drawer = !drawer"
                class="hidden-md-and-up"
            ></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" class="pointer">ShopCars</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat :to="link.url" v-for="link of filteredlink" :key="link.title">
                    <v-icon left>{{ link.icon }}</v-icon>
                    {{ link.title }} 
                </v-btn>
                <v-btn flat v-if="authStat" @click="logout" :loading="loading"> 
                    <v-icon left>exit_to_app</v-icon>
                    Logout
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
      <v-content>
          <v-container fluid>
              <router-view></router-view>
          </v-container>
      </v-content>
    <template v-if="error"> 
        <v-snackbar  :multi-line="true" :timeout="5000" @input="closeError" :value="true" color="error">
            {{ error }}
            <v-btn flat dark @click="closeError"> Close</v-btn>
        </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import { HTTP, HTTP_LOCAL } from './app.js';

    export default { 
        data() {
            return {
                drawer: false, 
                links: [
                    {title: 'Login', icon: 'lock', url: '/login', auth: false},
                    {title: 'Registration', icon: 'face', url: '/register', auth: false},
                    {title: 'Orders', icon: 'bookmark_border', url: '/orders', auth: true},
                    {title: 'New ad', icon: 'note_add', url: '/new', auth: true},
                    {title: 'My ads', icon: 'list', url: '/list', auth: true}
                ]
            }
        },
        methods: {
            closeError() {
                this.$store.dispatch('clearError'); 
            },
            logout() {
                this.$store.dispatch('userLogout');
            }
        },
        computed: {
            error() {
                return this.$store.getters.error;
            },
            isuserLoggedIn() {
                return this.$store.getters.isuserLoggedIn
            },
            authStat() {
                return this.$store.getters.authStat;
            },
            filteredlink() {
                return this.links.filter(link => {
                    return link.auth == this.authStat
                });
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        created() {
            if(this.$store.getters.getToken) {
               this.$store.dispatch('init');  
            }

            this.$store.dispatch('fetchAds');
        }
    }
</script>

<style scoped>
    .pointer {
        cursor:pointer;
    }
</style>