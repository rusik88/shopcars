<template>
    <v-container > 
        <v-layout row>
            <v-flex xs12>
                <v-card v-if='!loading'>
                    <v-img :src="ad.image" height="300px"></v-img>
                    <v-card-text>
                        <h1>{{ ad.title }}</h1>
                        <p>{{ ad.description }}</p>
                    </v-card-text> 
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <adEdit :ad='ad' v-if="isUser"></adEdit>  
                        <v-btn class="success">Buy</v-btn>
                    </v-card-actions>
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
               
            }
        },
        computed: {
            ad() {
                const id = this.id;
                return this.$store.getters.adById(id);
            },
            loading() {
                return this.$store.getters.loading;
            },
            user() {
                return this.$store.getters.user;
            },
            isUser() {
                return this.ad.user_id === this.user.id;
            }
        },
        components: {
            adEdit: AdEdit
        }
    }
</script>
