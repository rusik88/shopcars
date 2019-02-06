<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3" >Orders</h1>
                <v-list subheader two-line>
                    <v-list-tile v-for="order in orders" :key="order.id" @click="clickDefault">
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
                           <v-btn :to="'/add/'+order.addId" class="primary">Open</v-btn> 
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>     
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                orders: [
                    {id: 'fds3', name: 'Ruslan', phone: '(097) 285-40-24', addId: '123', done: false}
                ]
            }
        },
        methods: {
            clickDefault() {},
            markDone(order) {
                order.done = true;
            }
        }
    }
</script>
