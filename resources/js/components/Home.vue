<template> 
    <div>
        <div v-if="!loading && ads.length > 0">
            <v-container fluid>
                <v-layout row>
                    <v-flex xs12> 
                        {{ promoAdsMethod() }}
                        <v-carousel v-if='promoAds.length > 0'>
                            <v-carousel-item
                            v-for="ad in promoAds"
                            :key="ad.id"
                            :src="ad.image"
                            >
                                <div class="carLink">
                                    <v-btn class="error" :to="'/ad/'+ad.id">{{ ad.title }}</v-btn>
                                </div>
                            </v-carousel-item>
                        </v-carousel>
                        <div v-else>Ads are empty</div>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-container grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12 sm6 lg3 md4  v-for="ad of ads" :key="ad.id">
                        <v-card>
                            <v-img
                            :src="ad.image"
                            height="200px" 
                            ></v-img>

                            <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{ ad.title }}</h3>
                                <div>{{ ad.description }}</div> 
                            </div>
                            </v-card-title>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat :to="'/ad/'+ad.id">Open</v-btn>
                                <buyAd :ad='ad'></buyAd>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <div v-else>
            <v-container>
                <v-layout>
                    <v-flex xs12 class="text-xs-center">
                        <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
                    </v-flex> 
                </v-layout>
            </v-container>
        </div>
    </div>  
</template> 

<script>
export default {
    data() {
        return {
            promoAds: []
        }
    },
    computed: {
        ads() {
            return this.$store.getters.ads;
        },
        loading() {
            return this.$store.getters.loading; 
        }
    },
    methods: {
        promoAdsMethod() {
            this.promoAds = this.ads.filter(ad => ad.promo == 1); 
        }
    }
}
</script>

<style scoped>
    .carLink {
        position:absolute;
        left:50%;
        bottom:50px;
        background:rgba(0,0,0,.5);
        transform:translate(-50%, 0);
        padding:5px 15px;
        border-radius:5px 5px 0 0;
    }
</style>

