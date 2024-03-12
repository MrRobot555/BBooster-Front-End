<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
    class="px-0 mx-0"
  >
    <v-row 
      justify="center"
      class="mx-0 px-0"
      >
      <v-col
        cols="12"
        md="8"
        class="mx-0 px-0"
      >
          <base-material-card class="px-0 mx-0 py-3">
          <template v-slot:heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <v-icon v-if="windowWidth > 350" class="mr-2">
                  mdi-account-outline
              </v-icon>
              <v-tab class="mr-3">
                <v-icon v-if="windowWidth > 500" class="mr-2">
                  mdi-pencil
                </v-icon>
                {{mainTitle1}}
              </v-tab>
              <v-tab class="mr-3">
                <v-icon v-if="windowWidth > 500" class="mr-2">
                  mdi-pencil
                </v-icon>
                {{mainTitle2}}
              </v-tab>

            </v-tabs>
          </template>

          <v-tabs-items
            v-model="tabs"
            class="transparent"
            touchless
          >
            <v-tab-item
            >
              <v-card-text>

                  <form>
                    <v-row
                      style="max-width: 500px;"
                      class="my-10"
                    >
                      <v-col
                        cols="auto"
                        class="text-center"
                      >
                        <input
                          ref="file"
                          type="file"
                          class="d-none"
                          @change="onChange"
                        >
                        <v-card
                          :class="image ? 'success--text' : 'grey--text'"
                          class="mx-auto mt-0 d-inline-flex v-card--account"
                          outlined
                          style="border: 4px solid rgba(0, 0, 0, 0.5)!important;"
                          height="106"
                          width="106"
                          @click="$refs.file.click()"
                        >
                          <v-img
                            v-if="image"
                            :src="image"
                            height="100%"
                            width="100%"
                          />
                          <v-icon
                            v-else
                            class="mx-auto"
                            size="96"
                          >
                            mdi-account
                          </v-icon>
                        </v-card>

                        <div class="font-weight-bold grey--text">
                          CHOOSE PICTURE
                        </div>
                      </v-col>

                      <v-col
                        md="8"
                        align-self="center"
                      >
                        <base-subheading
                          subheading="Please select your profile picture"
                          />
                      </v-col>
                    </v-row>
                    </form>

                        <base-material-tabs
                          color="success"
                          icons-and-text
                          class="my-5"
                          centered
                        >
                          <v-tab
                            v-for="(tab, i) in profileTypes"
                            :key="i"
                            class="mb-5"
                          >
                            {{ tab.text }}
                            <v-icon v-text="tab.icon" />
                          </v-tab>

                          <v-tab-item>
                            <v-card
                              flat
                              class="my-0 pt-10"
                            >
                              <v-card-text class="pt-0">
                                <validation-observer v-slot="{ handleSubmit }">
                                  <form @submit.prevent="handleSubmit(validateForm)">
                                    <v-container class="py-0">
                                      <v-row>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <v-text-field
                                            label="Email Address"
                                            class="purple-input"
                                            disabled
                                            :value="currentUser.email"
                                          />
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="6"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="First name"
                                              rules="required"
                                          >
                                            <v-text-field
                                              label="First Name"
                                              class="purple-input"
                                              v-model="personalData.first_name"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="6"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Last name"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              label="Last Name"
                                              class="purple-input"
                                              v-model="personalData.last_name"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col cols="12">
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Street name"
                                              rules="required"
                                          >
                                            <v-text-field
                                              label="Street / square / etc name"
                                              class="purple-input"
                                              v-model="personalData.address.street"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col cols="12">
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="House number"
                                              rules="required"
                                          >                                
                                            <v-text-field
                                              label="House number"
                                              class="purple-input"
                                              v-model="personalData.address.housenumber"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="City"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              label="City"
                                              class="purple-input"
                                              v-model="personalData.address.city"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Country"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              label="Country"
                                              class="purple-input"
                                              v-model="personalData.address.country"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Postal code"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              class="purple-input"
                                              label="Postal Code"
                                              type="number"
                                              v-model="personalData.address.ZIP"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          class="text-right"
                                        >
                                          <v-btn
                                            color="success"
                                            class="mr-0"
                                            type="submit"
                                            default
                                          >
                                            Update Profile
                                          </v-btn>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </form>
                                </validation-observer>
                              </v-card-text>

                            </v-card>
                          </v-tab-item>

                          <v-tab-item>
                            <v-card
                              flat
                              class="my-0 pt-10"
                            >
                              <v-card-text class="pt-0">
                                <validation-observer v-slot="{ handleSubmit }">
                                  <form @submit.prevent="handleSubmit(validateForm)">
                                    <v-container class="py-0">
                                      <v-row>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <v-text-field
                                            label="Email Address"
                                            class="purple-input"
                                            disabled
                                            :value="currentUser.email"
                                          />
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="6"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="First name"
                                              rules="required"
                                          >
                                            <v-text-field
                                              label="First Name"
                                              class="purple-input"
                                              v-model="personalData.first_name"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="6"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Last name"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              label="Last Name"
                                              class="purple-input"
                                              v-model="personalData.last_name"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col cols="12">
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Street name"
                                              rules="required"
                                          >
                                            <v-text-field
                                              label="Street / square / etc name"
                                              class="purple-input"
                                              v-model="personalData.address.street"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col cols="12">
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="House number"
                                              rules="required"
                                          >                                
                                            <v-text-field
                                              label="House number"
                                              class="purple-input"
                                              v-model="personalData.address.housenumber"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="City"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              label="City"
                                              class="purple-input"
                                              v-model="personalData.address.city"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Country"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              label="Country"
                                              class="purple-input"
                                              v-model="personalData.address.country"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Postal code"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              class="purple-input"
                                              label="Postal Code"
                                              type="number"
                                              v-model="personalData.address.ZIP"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>
                                
                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <v-checkbox
                                            label="Company address and personal address is the same"
                                            class="mt-0"
                                            v-model="personalData.is_company"
                                            @change="sameData($event)"
                                          />
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="6"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Company name"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              label="Company name"
                                              class="purple-input"
                                              v-model="personalData.company_name"
                                              :disabled="personalData.is_company"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col cols="12">
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Company seat - street"
                                              rules="required"
                                          >                                
                                            <v-text-field
                                              label="Company seat - street / square / etc name"
                                              class="purple-input"
                                              v-model="personalData.companySeat.street"
                                              :disabled="personalData.is_company"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col cols="12">
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Company seat - house number"
                                              rules="required"
                                          >                                
                                            <v-text-field
                                              label="Company seat - house number"
                                              class="purple-input"
                                              v-model="personalData.companySeat.housenumber"
                                              :disabled="personalData.is_company"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Company seat - city"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              label="Company seat - City"
                                              class="purple-input"
                                              v-model="personalData.companySeat.city"
                                              :disabled="personalData.is_company"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Company seat - Country"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              label="Company seat - Country"
                                              class="purple-input"
                                              v-model="personalData.companySeat.country"
                                              :disabled="personalData.is_company"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          md="4"
                                        >
                                          <validation-provider
                                              v-slot="{ errors }"
                                              name="Company seat - Postal code"
                                              rules="required"
                                          >                              
                                            <v-text-field
                                              class="purple-input"
                                              label="Company seat - Postal Code"
                                              v-model="personalData.companySeat.ZIP"
                                              :disabled="personalData.is_company"
                                              :error-messages="errors"
                                            />
                                          </validation-provider>
                                        </v-col>

                                        <v-col
                                          cols="12"
                                          class="text-right"
                                        >
                                          <v-btn
                                            color="success"
                                            class="mr-0"
                                            type="submit"
                                            default
                                          >
                                            Update Profile
                                          </v-btn>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </form>
                                </validation-observer>
                              </v-card-text>

                            </v-card>
                          </v-tab-item>
                        </base-material-tabs>
                
              </v-card-text>
            </v-tab-item>

            <v-tab-item
            >
              <v-card-text
                class="px-0 mx-0"
              >
                        <div class="wrapper" id="app">
                          <card-form
                            :form-data="cardData"
                            @input-card-number="updateCardNumber"
                            @input-card-name="updateCardName"
                            @input-card-month="updateCardMonth"
                            @input-card-year="updateCardYear"
                            @input-card-cvv="updateCardCvv"
                          />
                        </div>
              </v-card-text>
            </v-tab-item>

          </v-tabs-items>
        </base-material-card>


      </v-col>


    </v-row>
  </v-container>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import CardForm from '@/components/CreditCardForm'

  export default {
    name: 'UserProfile',
    components: {
      CardForm
    },

    data: () => ({
          mainTitle1: '',
          mainTitle2: '',
          windowWidth : null,
          tabs: 0,
          image: null,
          cardData: {
            cardName: '',
            cardNumber: '',
            cardMonth: '',
            cardYear: '',
            cardCvv: ''
          },
          personalData: {
            is_company: false,
            first_name: '',
            last_name: '',
            address: {
              country: '',
              city: '',
              street: '',
              housenumber: '',
              ZIP: '',
              userID: ''
            },
            company_name: '',
            companySeat: {
              country: '',
              city: '',
              street: '',
              housenumber: '',
              ZIP: '',
              userID: ''
            }
          },
          profileTypes: [
        {
          text: 'Personal',
          icon: 'mdi-account-tie',
        },
        {
          text: 'Company',
          icon: 'mdi-bank',
        },
      ],
    }),
    
    mounted () {
      this.$i18n.locale = 'en'
      if (window.innerWidth < 501) {
        this.mainTitle1 = 'Personal'
        this.mainTitle2 = 'Financial'
      } else {
        this.mainTitle1 = 'Personal Data'
        this.mainTitle2 = 'Financial Data'
      }
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
        if (this.windowWidth < 501) {
          this.mainTitle1 = 'Personal'
          this.mainTitle2 = 'Financial'
        } else {
          this.mainTitle1 = 'Personal Data'
          this.mainTitle2 = 'Financial Data'
        }
      })
    },
    computed: {
      ...mapGetters(["currentUser"]),
    },
    methods: {

      updateCardNumber (val) {
      },
      updateCardName (val) {
      },
      updateCardMonth (val) {
      },
      updateCardYear (val) {
      },
      updateCardCvv (val) {
      },
      onChange (val) {
        const value = val.target.files[0]
        if (!value) return (this.image = null)
        this.image = URL.createObjectURL(value)
      },
      sameData(event) {
        if (event) {
          this.personalData.company_name = `${this.personalData.first_name} ${this.personalData.last_name}`
          this.personalData.companySeat.country = `${this.personalData.address.country}`
          this.personalData.companySeat.city = `${this.personalData.address.city}`
          this.personalData.companySeat.street = `${this.personalData.address.street}`
          this.personalData.companySeat.housenumber = `${this.personalData.address.housenumber}`
          this.personalData.companySeat.ZIP = `${this.personalData.address.ZIP}`
        }
      },
      validateForm (scope) {
        alert('Form Submitted!')
      },
    }
  }
</script>

<style lang="scss">
  @import '@/sass/creditcard.scss';
</style>

<style scoped>
.v-card__subtitle, .v-card__text, .v-card__title {
  padding: 0!important;
}
.row {
  margin-right: 0!important;
  margin-left: 0!important;
}
.v-tab {
  height: 70px!important;
}
</style>