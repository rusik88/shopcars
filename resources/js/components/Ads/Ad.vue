<template>
    <v-container > 
        <v-layout row>
            <v-flex xs12>
                <v-card v-if='!loading && ad != null'>
                    <v-img :src="ad.image" height="300px"></v-img>
                    <v-card-text>
                        <h1>{{ ad.title }}</h1>
                        <p>{{ ad.description }}</p> 
                    </v-card-text> 
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <adEdit :ad='ad' v-if="isUser"></adEdit>   
                        <v-btn class="error" v-if="isUser" @click="dialogDelete = true">Delete</v-btn>
                        <buyAd :ad='ad' v-if="!isUser"></buyAd>
                    </v-card-actions>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>
                            Do you want delete '{{ ad.title }}' ?
                        </v-card-title>
                        <v-divider class='mt-2 mb-2'></v-divider> 
                        <v-card-actions> 
                            <v-spacer></v-spacer>
                            <v-btn class="info" @click="dialogDelete = false">No</v-btn>
                            <v-btn class="error" :loading='localLoad' :disabled='localLoad' @click="deleteAd">Yes</v-btn> 
                        </v-card-actions>
                        <v-divider class='mt-2'></v-divider> 
                        </v-card>
                    </v-dialog>
                </v-card> 
                <div v-else class="text-xs-center pt-5">
                    <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                        ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import AdEdit from './AdEdit';

    export default {
        props: ['id'],
        data() {
            return {
               dialogDelete: false
            }
        },
        computed: {
            ad() {
                return this.$store.getters.ad;
            },
            loading() {
                return this.$store.getters.loading;
            },
            user() {
                return this.$store.getters.user;
            },
            isUser() {
                if(this.user) {
                    return this.ad.user_id === this.user.id;
                }
                else {
                    return false
                }
                
            },
            localLoad() {
                return this.$store.getters.localLoad
            }
        },
        methods: {
            deleteAd() {
                this.$store.dispatch('deleteAd', {id: this.id}); 
            }
        },
        components: {
            adEdit: AdEdit
        },
        mounted() {
            this.$store.dispatch('getAdById', this.id);
        }
    }
</script>
