<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Add List</h1>
                <v-card v-for="add in myAdds" :key="add.id" class="elevation-10 mb-3">
                    <v-layout row>
                        <v-flex xs4> 
                            <v-card-media
                                :src="add.srcImage"
                                height="160px"
                            ></v-card-media>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2>{{ add.title }}</h2>
                                <p>{{ add.description }}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :to="'/add/'+add.id" class="info">Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
       computed: {
           myAdds() {
               return this.$store.getters.myAdds
           }
       }
    }
</script>
