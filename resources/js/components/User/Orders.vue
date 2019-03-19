<template>
    <div> 
        <v-container v-if='!loading'>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <h1 class="text--secondary mb-3">Orders</h1>
                    <v-list subheader two-line>
                        <v-list-tile v-for="order in ordersAll" :key="order.id" @click="clickDefault">
                            <v-list-tile-action>
                                <v-checkbox 
                                    :input-value="order.done" 
                                    @change="markDone(order)" 
                                    color="success"
                                ></v-checkbox> 
                            </v-list-tile-action>
                            <v-list-tile-content @click="notifications = !notifications">
                                <v-list-tile-title>{{ order.name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                            <v-btn :to="'/ad/'+order.ad_id" class="primary">Open</v-btn> 
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>     
                </v-flex>
            </v-layout>
        </v-container>
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

            }
        },
        methods: {
            clickDefault() {},
            markDone(order) {
                order.done = order.done ? 0 : 1;
                this.$store.dispatch('updateOrderDone', order);
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            },
            ordersAll() {
                return this.$store.getters.ordersAll
            }
        },
        created() {
            if(this.ordersAll.length == 0) {
                this.$store.dispatch('allOrders');
            }
        }
    }
</script>
