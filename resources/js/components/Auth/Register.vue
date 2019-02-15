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
                            <v-form @submit.prevent="onSubmit"> 
                                <div class="form_element">
                                    <v-text-field 
                                        v-model="name" 
                                        prepend-icon="account_box"
                                        label="Name" 
                                        @input="$v.name.$touch()"
                                        @blur="$v.name.$touch()"
                                        required
                                        :error="$v.name.$dirty && $v.name.$error"
                                        type="text" 
                                    ></v-text-field> 
                                    <div v-if="$v.name.$dirty && $v.name.$error" class="errorMessages"> 
                                        <div v-if="!$v.name.required" >Name is required</div>
                                    </div> 
                                </div>
                                <div class="form_element">
                                    <v-text-field 
                                        v-model="email" 
                                        prepend-icon="email"
                                        label="Email" 
                                        required
                                        type="text" 
                                        @blur="$v.email.$touch()"
                                        :error="$v.email.$dirty && $v.email.$error" 
                                    ></v-text-field> 
                                    <div v-if="$v.email.$dirty && $v.email.$error" class="errorMessages"> 
                                        <div v-if="!$v.email.required" >Email is required</div>
                                        <div v-if="!$v.email.email" >Email is not format</div>
                                        <div v-if="!$v.email.checkEmail && !$v.$pending" >User has this Email</div> 
                                    </div>
                                </div> 
                                <div class="form_element">
                                <v-text-field 
                                    v-model="password" 
                                    prepend-icon="lock"
                                    label="Password" 
                                    required
                                    :error="$v.password.$dirty && $v.password.$error"
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()" 
                                    type="password"></v-text-field>
                                     <div v-if="$v.password.$dirty && $v.password.$error" class="errorMessages"> 
                                        <div v-if="!$v.password.required" >Password is required</div>
                                        <div v-if="!$v.password.minLength" >Password {{ password.length }} under {{ $v.password.$params.minLength.min }}</div>
                                     </div>
                                </div>
                                <div class="form_element">
                                    <v-text-field 
                                        v-model="confirmPassword" 
                                        prepend-icon="lock"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        @input="$v.confirmPassword.$touch()"
                                        @blur="$v.confirmPassword.$touch()" 
                                        :error="$v.confirmPassword.$dirty && $v.confirmPassword.$error"
                                        required
                                        type="password"></v-text-field>
                                        <div v-if="$v.confirmPassword.$dirty && $v.confirmPassword.$error" class="errorMessages"> 
                                            <div v-if="!$v.confirmPassword.required" >Confirm password is required</div>
                                            <div v-if="!$v.confirmPassword.repeatPassword && $v.confirmPassword.required">Passwords are not equal</div>
                                        </div>
                                </div>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn :disabled="$v.$invalid" type="submit" color="primary">Create account</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                        </v-card>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout> 
    </v-container>
</template> 

<script>

import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { HTTP } from '../../app.js';

export default {
    data() {
        return { 
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    },
    validations: {
        name: {required},
        email: {
            required, email,
            checkEmail(newEmail) {
                if(newEmail === '') return true;
                return new Promise((resolve, reject) => {
                    HTTP.post('register/email', {
                        email: newEmail
                    }).then(resp => { 
                        resolve(!resp.data.status);
                    });
                })
            }
        },
        password: {
            required,
            minLength: minLength(6)
        },
        confirmPassword: {
            required,
            repeatPassword: sameAs('password')
        }

    },
    methods: {
        onSubmit() { 
            if(!this.$v.$error && !this.$v.$pending) { 
                const user = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                this.$v.$touch();
                this.$store.dispatch('userRegister', user);
            }
            
        }
    }
}
</script>
