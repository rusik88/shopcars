<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>  
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login form</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>  
                            <v-alert class="mb-3" :value="registerStatus" type="success">You can authorization</v-alert>
                            <v-alert class="mb-3" :value="logoutStatus" type="success">You successfully logged out</v-alert>
                            <v-form v-model="valid" ref="form" validation>
                                <v-text-field 
                                    v-model="email" 
                                    prepend-icon="email"
                                    :rules="emailRules"
                                    label="Email" 
                                    required
                                    type="text" 
                                ></v-text-field>
                                <v-text-field 
                                    v-model="password" 
                                    prepend-icon="lock"
                                    :counter="6"
                                    :rules="passwordRules"
                                    label="Password" 
                                    required
                                    type="password"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :loading = "loading" :disabled="!valid || loading"  @click="onSubmit" color="primary">Login</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                valid: false,
                registerStatus: false,
                logoutStatus: false,
                emailRules: [  
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.length >= 6 || 'Password must be equal or more than 6 characters'           
                ]
            }
        },
        mounted() {
            if(this.$route.query.register === 'yes') {
                this.registerStatus = true;
            }
            if(this.$route.query.logout === 'yes') {
                this.logoutStatus = true;
            }
        },
        methods: {
            onSubmit() {
                if(this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    }
                    this.$store.dispatch('userAuth', user); 
                }
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            },
            error() {
                return this.$store.getters.error
            }
        }
    }
</script>
