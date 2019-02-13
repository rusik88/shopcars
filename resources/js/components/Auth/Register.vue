<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>  
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Registration</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form v-model="valid" ref="form" validation>
                                <v-text-field 
                                    v-model="name" 
                                    prepend-icon="account_box"
                                    :rules="nameRules"
                                    :counter="255"
                                    label="Name" 
                                    required
                                    type="text" 
                                ></v-text-field>
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
                                    :rules="passwordRules"
                                    label="Password" 
                                    required
                                    type="password"></v-text-field>
                                <v-text-field 
                                    v-model="confirmPassword" 
                                    prepend-icon="lock"
                                    name="confirmPassword"
                                    :rules="confirmPasswordRules"
                                    label="Confirm Password" 
                                    required
                                    type="password"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :disabled="!valid"  @click="onSubmit" color="primary">Create account</v-btn>
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
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                valid: false,
                nameRules: [
                    v => !!v || 'Name is required'
                ],
                emailRules: [  
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.length >= 6 || 'Password must be equal or more than 6 characters'           
                ],
                confirmPasswordRules: [
                    v => !!v || 'Confirm Password is required',
                    v => v === this.password || "Passwords should match"
                ]
            }
        },
        methods: {
            onSubmit() {
                if(this.$refs.form.validate()) {
                    const user = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.confirmPassword
                    }
                    
                   this.$store.dispatch('userRegister', user);
                }
            }
        }
    }
</script>
