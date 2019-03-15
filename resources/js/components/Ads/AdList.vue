<template>
    <v-container> 
        <v-layout row v-if='myAds.length > 0'>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Ad List</h1>
                <v-card v-for="ad in myAds" :key="ad.id" class="elevation-10 mb-3">
                    <v-layout row>
                        <v-flex xs4> 
                            <v-img
                                :src="ad.image"
                                height="160px"
                            ></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2>{{ ad.title }}</h2>
                                <p>{{ ad.description }}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :to="'/ad/'+ad.id" class="info">Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <div v-else>
            <v-container>
                <v-layout>
                    <v-flex xs12 class="text-xs-center">
                        <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
                    </v-flex> 
                </v-layout>
            </v-container>
        </div>
    </v-container>
</template>

<script>
    export default {
       computed: {
           myAds() {
               return this.$store.getters.myAds
           },
           user() {
               return this.$store.getters.user
           }
          
       }
    }
</script>
