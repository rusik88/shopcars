<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">New Add</h1>
                <v-form class="mb-3" v-model="valid" ref="form" validation>
                    <v-text-field 
                        v-model="title"
                        :rules="[v => !!v || 'Title is required']"
                        label="Add Title" 
                        required
                        name="title"
                        type="text" 
                    ></v-text-field>
                    <v-textarea 
                        v-model="description" 
                        name="description"
                        label="Add description"
                        :rules="[v => !!v || 'Description is required']"
                        required
                        type="text"
                    ></v-textarea>

                </v-form>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn class="warning">
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img class="mt-3" src="https://cdn.vuetifyjs.com/images/carousel/planet.jpg" height="100px">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch
                        v-model="promo"
                        label="Add to promo?"
                        color="primary" 
                        ></v-switch>
                    </v-flex> 
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                       <v-spacer></v-spacer> 
                       <v-btn :disabled="!valid" class="success" @click="createAdd">Create Add</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex> 
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                description: '',
                promo: false,
                valid: false
            }
        },
        methods: {
            createAdd() {
                if(this.$refs.form.validate()) {
                    //logic
                    const add = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo
                    }
                    console.log(add);
                }
            }
        }
    }
</script>
