<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">New Add</h1>
                <v-form class="mb-3" v-model="valid" ref="form" validation>
                    <v-text-field 
                        v-model="title"
                        :rules="[v => !!v || 'Title is required']"
                        label="Ad Title" 
                        required
                        name="title"
                        type="text" 
                    ></v-text-field>
                    <v-textarea 
                        v-model="description" 
                        name="description"
                        label="Ad description"
                        :rules="[v => !!v || 'Description is required']"
                        required
                        type="text"
                    ></v-textarea>
                </v-form>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn class="warning" @click="triggerUpload">
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <input @change="onFileChange" ref="fileInput" type="file" style="display:none" accept="image/*"> 
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img class="mt-3" :src="src" v-if="src"  height="100px">
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
                       <v-btn :loading="loading" :disabled="!valid || !image || loading" class="success" @click="createAd">Create Add</v-btn>
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
                valid: false,
                image: null,
                src: ''
                //loading: false 
            }
        },
        computed: {
            user() {
                return this.$store.getters.user;
            },
            loading() {
               return this.$store.getters.loading;
            }
        },
        methods: {
            createAd() {
                if(this.$refs.form.validate() && this.image) {
                    const ad = {
                        title: this.title,
                        user_id: this.user.id,
                        description: this.description,
                        promo: this.promo,
                        image: this.image
                    }

                    this.$store.dispatch('createAd', ad); 
                }
                
            },
            triggerUpload() {
                this.$refs.fileInput.click();
            },
            onFileChange(event) {
                const file = event.target.files[0];

                const reader = new FileReader();
                reader.onload = e => {
                    this.src = reader.result;
                }
                reader.readAsDataURL(file);
                this.image = file;

            }
        }
    }
</script>
