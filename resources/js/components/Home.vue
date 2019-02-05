<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                        v-for="add in adds"
                        :key="add.id"
                        :src="add.srcImage"
                        >
                            <div class="carLink">
                                <v-btn class="error" :to="'/add/'+add.id">{{ add.title }}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 sm6 lg3 md4  v-for="add of adds" :key="add.id">
                    <v-card>
                        <v-img
                        :src="add.srcImage"
                        height="200px"
                        ></v-img>

                        <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{ add.title }}</h3>
                            <div>{{ add.description }}</div>
                        </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat :to="'/add/'+add.id">Open</v-btn>
                            <v-btn raised class="primary">Buy</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                adds: [
                {
                    title: 'First Add',
                    description: 'Hello I am description',
                    promo: false,
                    id: 1,
                    srcImage: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
                },
                {
                    title: 'Second Add',
                    description: 'Hello I am description',
                    promo: true,
                    id: 2,
                    srcImage: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
                },
                {
                    title: 'Third Add',
                    description: 'Hello I am description',
                    promo: true,
                    id: 3,
                    srcImage: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
                },
                {
                    title: 'Fourth Add',
                    description: 'Hello I am description',
                    promo: true,
                    id: 4,
                    srcImage: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
                }
                ]
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

