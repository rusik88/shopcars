<template>
    <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn class='info mr-3' flat slot='activator'>Edit Ad</v-btn>

      <v-card> 
        <v-card-title class="headline grey lighten-2" primary-title>Edit by "{{ ad.title }}"</v-card-title>

        <v-card-text>
          <v-form @submit.prevent="onSubmit"> 
            <v-text-field 
                v-model="title" 
                label="Title" 
                 @input="$v.title.$touch()"
                 @blur="$v.title.$touch()"
                 :error="$v.title.$dirty && $v.title.$error"
                type="text" 
            ></v-text-field>
            <div v-if="$v.title.$dirty && $v.title.$error" class="errorMessages"> 
                <div v-if="!$v.title.required" >Title is required</div>
            </div> 
            <v-textarea
                v-model="description" 
                name="description"
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
                :error="$v.description.$dirty && $v.description.$error"
                label="Description"
            ></v-textarea>
            <div v-if="$v.description.$dirty && $v.description.$error" class="errorMessages"> 
                <div v-if="!$v.description.required" >Description is required</div>
            </div> 
            <v-layout row>
                <v-flex xs12>
                    <v-img :src="image" width="150"></v-img>
                </v-flex>
            </v-layout>
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
                    <v-switch
                    v-model="promo"
                    label="Add to promo?"
                    color="primary" 
                    ></v-switch> 
                </v-flex> 
            </v-layout>

            <v-divider class='mt-2 mb-2'></v-divider> 

            <v-card-actions> 
              <v-spacer></v-spacer>
              <v-btn class="error" flat @click="closeModal">Close</v-btn> 
              <v-btn class='success' :loading='localLoad' :disabled='$v.$invalid || localLoad' type="submit">Edit</v-btn>
            </v-card-actions>
        </v-form>
        </v-card-text>
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
        title: this.ad.title,
        description: this.ad.description,
        imageFile: null,
        promo: this.ad.promo,
        image: this.ad.image,
        dialog: false
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      localLoad() {
        return this.$store.getters.localLoad
      }
    },
    methods: { 
        triggerUpload() { 
            this.$refs.fileInput.click();
        },
        onFileChange() {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = e => { 
              this.image = reader.result;
          }
          reader.readAsDataURL(file);
          this.imageFile = file;
        },
        onSubmit() { 
          if(!this.$v.$error && !this.$v.$pending) { 
            const ad = {
              id: this.ad.id,
              image: this.imageFile, 
              title: this.title,
              description: this.description, 
              promo: this.promo ? 1 : 0
            };
            this.$store.dispatch('updateAd', ad);
            
            if(!this.localLoad) {
                this.dialog = false; 
            }
            
           
          }
        },
        closeModal() {
          this.dialog = false;
          this.title = this.ad.title;
          this.description = this.ad.description;
          this.promo = this.ad.promo,
          this.image = this.ad.image;
        }
    },
    validations: {
      title: {required},
      description: {required}
    } 
  }
</script> 
