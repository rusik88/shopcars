<template> 
    <div class="text-xs-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-btn raised class="primary" slot='activator'>Buy</v-btn>

        <v-card> 
          <v-card-title class="headline grey lighten-2" primary-title>Do you want to buy it?</v-card-title>

          <v-card-text>
            <v-form v-model='valid' @submit.prevent="onSubmit">  
              <v-text-field 
                  v-model="name" 
                  label="Your Name" 
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  :error="$v.name.$dirty && $v.name.$error"
                  type="text" 
              ></v-text-field>
              <div v-if="$v.name.$dirty && $v.name.$error" class="errorMessages"> 
                  <div v-if="!$v.name.required" >Name is required</div>
              </div> 
              <v-text-field 
                  v-model="phone" 
                  @input="$v.phone.$touch()"
                  @blur="$v.phone.$touch()"
                  :error="$v.phone.$dirty && $v.phone.$error"
                  label="Your Phone"
              ></v-text-field>
              <div v-if="$v.phone.$dirty && $v.phone.$error" class="errorMessages"> 
                  <div v-if="!$v.phone.required" >Phone is required</div>
              </div>
              
              <v-card-actions> 
                <v-spacer></v-spacer>
                <v-btn class="error" flat @click="closeModal">Close</v-btn> 
                <v-btn class='success' flat :loading='localLoading' :disabled='$v.$invalid || localLoading' type="submit">Buy</v-btn>
              </v-card-actions>
          </v-form>
          </v-card-text>
      </v-card>
      </v-dialog>


      <v-dialog v-model="finishOrder" max-width="500px">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Order is succesfull
          </v-card-title>
          <v-card-text>
            <v-alert
              :value="true"
              color="success"
              icon="info" 
              outline
            >{{ textSuccesfullOrder }}</v-alert>
          </v-card-text>
          <v-card-actions> 
            <v-spacer></v-spacer>
            <v-btn class='success' flat @click="finishOrder = false">Ok</v-btn> 
          </v-card-actions>
        </v-card>
      </v-dialog>


  </div>
</template>

<script>

import { required } from 'vuelidate/lib/validators';

  export default {
    props: ["ad"],
    data () {
      return {
        name: '',
        phone: '',
        dialog: false,
        valid: false,
        finishOrder: false
      }
    },
    computed: {
      localLoading() {
        return this.$store.getters.localLoading
      },
      textSuccesfullOrder() {
        return this.$store.getters.textSuccesfullOrder
      }
    },
    methods: { 
        onSubmit() { 
          if(!this.$v.$error && !this.$v.$pending) { 
            const customer = {
              name: this.name,
              phone: this.phone,
              ad_id: this.ad.id
            }

            this.$store.dispatch('orderAdd', customer).finally(() => {
              this.dialog = false;
              this.finishOrder = true;
            }); 
           
          }
        },
        closeModal() {
          this.dialog = false;
        }
    },
    validations: {
      name: {required},
      phone: {required}
    } 
  }
</script> 
