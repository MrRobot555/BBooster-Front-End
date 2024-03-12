<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
      {{ fetchedAndLiveUser }}
    <v-row>
      <v-col cols="12">
        <base-material-card
          icon="mdi-progress-clock"
          title='Your order is running...'
        >
          <div>
            <span>Targeted networks:
              <span 
                v-for="(network, index) in reverseNetworks" 
                :key="index" 
                class="network" 
                :class="{ red: network.id === '0', orange: network.id === '1', purple: network.id === '2', green: network.id === '3' }"
              >
                {{network.name}}
              </span>
            </span>
          </div>

          <v-row 
            v-for="(level, index) in sortedCandidates" 
            :key="index"
          >
            <sieve 
              :level='level' 
              :index='index'
              :sieveTitles="sieveTitles[index]"
            />
          </v-row>

        </base-material-card>
      </v-col>

      <v-col
        v-for="(list, listIndex) in fetchedAndLiveUser.lists"
        :key="listIndex"
        cols="12"
      >
        <delivery
          :list="list"
          @setEntryStatus="setEntryStatus"
      />
      </v-col>

      <v-col cols="12">
        <base-material-card
          icon="mdi-earth"
          title="Global Sales by Top Locations"
        >
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="mt-10"
            >
              <v-simple-table class="ml-2">
                <tbody>
                  <tr
                    v-for="(sale, i) in sales"
                    :key="i"
                  >
                    <td>
                      <v-img
                        :src="sale.flag"
                        width="18"
                      />
                    </td>
                    <td v-text="sale.country" />
                    <td v-text="sale.salesInM" />
                    <td v-text="((sale.salesInM / totalSales) * 100).toFixed(2) + '%'" />
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-world-map
                :country-data="countryData"
                high-color="#838383"
                low-color="#BBBBBB"
              />
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="primary"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon color="info">
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Website Views
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon color="info">
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Daily Sales
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            increase in today's sales
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="green"
                  icon
                  v-on="on"
                >
                  <v-icon color="info">
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Completed Tasks
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-twitter"
          title="Followers"
          value="+245"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="primary"
          icon="mdi-poll"
          title="Website Visits"
          value="75.521"
          sub-icon="mdi-tag"
          sub-text="Tracked from Google Analytics"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-store"
          title="Revenue"
          value="$ 34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-sofa"
          title="Bookings"
          value="184"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Get More Space..."
        />
      </v-col>

      <v-col cols="12">
        <div
          class="font-weight-light mt-1"
          style="font-size: 25px"
        >
          Manage Listings
        </div>
      </v-col>

      <v-col
        sm="12"
        md="4"
      >
        <base-material-card
          color="transparent"
          image
          hover-reveal
        >
          <template v-slot:image>
            <v-img src="https://demos.creative-tim.com/vue-material-dashboard-pro/img/card-2.jpg" />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  class="mx-1"
                  v-bind="attrs"
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-view-split-vertical</v-icon>
                </v-btn>
              </template>

              <span>View</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="success"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="success--text">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="error"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="error--text">
                    mdi-close
                  </v-icon>
                </v-btn>
              </template>

              <span>Remove</span>
            </v-tooltip>
          </template>

          <v-card-title class="justify-center font-weight-light">
            Cozy 5 Stars Apartment
          </v-card-title>

          <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
            The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the life in Barcelona.
          </v-card-text>

          <template v-slot:actions>
            <div class="display-2 font-weight-light grey--text">
              $899/night
            </div>

            <v-spacer />

            <span class="caption grey--text font-weight-light">
              <v-icon small>mdi-map-marker</v-icon>

              Barcelona, Spain
            </span>
          </template>
        </base-material-card>
      </v-col>

      <v-col
        sm="12"
        md="4"
      >
        <base-material-card
          color="transparent"
          hover-reveal
          image
        >
          <template v-slot:image>
            <v-img src="https://demos.creative-tim.com/vue-material-dashboard-pro/img/card-3.jpg" />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  class="mx-1"
                  v-bind="attrs"
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-view-split-vertical</v-icon>
                </v-btn>
              </template>

              <span>View</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="success"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="success--text">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="error"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="error--text">
                    mdi-close
                  </v-icon>
                </v-btn>
              </template>

              <span>Remove</span>
            </v-tooltip>
          </template>

          <v-card-title class="justify-center font-weight-light">
            Office Studio
          </v-card-title>

          <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
            The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.
          </v-card-text>

          <template v-slot:actions>
            <div class="display-2 font-weight-light grey--text">
              $1.119/night
            </div>

            <v-spacer />

            <span class="caption grey--text font-weight-light">
              <v-icon small>mdi-map-marker</v-icon>

              London, UK
            </span>
          </template>
        </base-material-card>
      </v-col>

      <v-col
        sm="12"
        md="4"
      >
        <base-material-card
          color="transparent"
          hover-reveal
          image
        >
          <template v-slot:image>
            <v-img src="https://demos.creative-tim.com/vue-material-dashboard-pro/img/card-1.jpg" />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  class="mx-1"
                  v-bind="attrs"
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-view-split-vertical</v-icon>
                </v-btn>
              </template>

              <span>View</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="success"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="success--text">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="error"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon class="error--text">
                    mdi-close
                  </v-icon>
                </v-btn>
              </template>

              <span>Remove</span>
            </v-tooltip>
          </template>

          <v-card-title class="justify-center font-weight-light">
            Beautiful Castle
          </v-card-title>

          <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
            The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.
          </v-card-text>

          <template v-slot:actions>
            <div class="display-2 font-weight-light grey--text">
              $459/night
            </div>

            <v-spacer />

            <span class="caption grey--text font-weight-light">
              <v-icon small>mdi-map-marker</v-icon>

              Milan, Italy
            </span>
          </template>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { gql } from "graphql-tag"
import { mapGetters } from "vuex"
import sieve from '@/views/dashboard/component/Sieve.vue'
import delivery from '@/views/dashboard/component/Delivery.vue'
import { SUBSCRIBE_USER } from '@/queries'


/* const SUBSCRIBE_USER = gql`
  subscription getUserSub($param: String!) {
    getUserSub(email: $param) {
      first_name
      last_name
      lists {
        network_name
      }
    }
  }
`; */

const SUBSCRIBE_LIVEFEED = gql`
  subscription {
    getLiveFeed(nothing: "") {
      client_name
      client_level
      network_id
      last_touch
      _id
    }
  }
`;

export default {
  name: "DashboardDashboard",
  components: {
    sieve,
    delivery
  },
  apollo: {
    $subscribe: {
      getUser: {
        query: SUBSCRIBE_LIVEFEED,
/*         variables() {
          return {
            param: this.currentUser.email,
          };
        }, */
        result({ data }) {
          /* this.getUser = data.getUserSub; */
          this.liveFeed = data.getLiveFeed
        },
      },
      getUserSub: {
        query: SUBSCRIBE_USER,
        variables() {
          return {
            email: this.currentUser.email
          }
        },
        result({ data }) {
          this.liveUser = data.getUserSub
        }
      }
    },
  },

  data() {
    return {
      liveUser: null,
      sieveTitles: [ 
        {
          main: 'INTERESTED', 
          sub: 'INTERESTED'
        },
        {
          main: 'EXPLAINING PRODUCT',
          sub: 'EXPLAINED'
        },
        {
          main: 'ANSWERING QUESTIONS',
          sub: 'ANSWERED'
        },
        {
          main: 'PRICE NEGOTIATION',
          sub: 'PRICE'
        },
        {
          main: 'OBJECTION HANDLING',
          sub: 'ACCEPTED'
        }
      ],
      liveFeed : [],
      param: "michael@jackson.com",
      getUser: null,
      newItems: null,
      countryData: {
        US: 2920,
        DE: 1390,
        AU: 760,
        GB: 690,
        RO: 600,
        BR: 550,
      },
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      headers: [
        {
          sortable: false,
          text: "ID",
          value: "id",
        },
        {
          sortable: false,
          text: "Name",
          value: "name",
        },
        {
          sortable: false,
          text: "Salary",
          value: "salary",
          align: "right",
        },
        {
          sortable: false,
          text: "Country",
          value: "country",
          align: "right",
        },
        {
          sortable: false,
          text: "City",
          value: "city",
          align: "right",
        },
      ],
      items: [
        {
          id: 1,
          name: "Dakota Rice",
          country: "Niger",
          city: "Oud-Tunrhout",
          salary: "$35,738",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          country: "Curaçao",
          city: "Sinaai-Waas",
          salary: "$23,738",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          country: "Netherlands",
          city: "Overland Park",
          salary: "$56,142",
        },
        {
          id: 4,
          name: "Philip Chanley",
          country: "Korea, South",
          city: "Gloucester",
          salary: "$38,735",
        },
        {
          id: 5,
          name: "Doris Greene",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
          salary: "$63,542",
        },
      ],
      sales: [
        {
          country: "USA",
          flag: "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/US.png",
          salesInM: 2920,
        },
        {
          country: "Germany",
          flag: "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/DE.png",
          salesInM: 1300,
        },
        {
          country: "Australia",
          flag: "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/AU.png",
          salesInM: 760,
        },
        {
          country: "United Kingdom",
          flag: "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/GB.png",
          salesInM: 690,
        },
        {
          country: "Romania",
          flag: "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/RO.png",
          salesInM: 600,
        },
        {
          country: "Brasil",
          flag: "https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/BR.png",
          salesInM: 550,
        },
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false,
      },
    };
  },

  computed: {
    fetchedAndLiveUser() {
      if (this.liveUser) {
        return this.liveUser
      }
      return this.currentUser
    },
    
    reverseNetworks() {
      if (!this.networks) { return [] }
      const reversedArr = this.networks
      return reversedArr.reverse()
    },

    sortedCandidates() {
      if (this.liveFeed.length < 1) {
        return [[0], [0], [0], [0], [0]]
      }
      const sorted = [[0], [0], [0], [0], [0]]
      sorted[0] = this.liveFeed.filter(this.filterZeroStars)
      sorted[1] = this.liveFeed.filter(this.filterOneStars)
      sorted[2] = this.liveFeed.filter(this.filterTwoStars)
      sorted[3] = this.liveFeed.filter(this.filterThreeStars)
      sorted[4] = this.liveFeed.filter(this.filterFourStars)
      return sorted
    },

    levelZeroCandidates() {
      if (this.liveFeed.length > 0) {
        return this.liveFeed.filter(this.filterZeroStars)
      } else {
        return []
      }
    },
    levelOneCandidates() {
      if (this.liveFeed.length > 0) {
        return this.liveFeed.filter(this.filterOneStars)
      } else {
        return []
      }
    },
    levelTwoCandidates() {
      if (this.liveFeed.length > 0) {
        return this.liveFeed.filter(this.filterTwoStars)
      } else {
        return []
      }
    },
    levelThreeCandidates() {
      if (this.liveFeed.length > 0) {
        return this.liveFeed.filter(this.filterThreeStars)
      } else {
        return []
      }
    },
    levelFourCandidates() {
      if (this.liveFeed.length > 0) {
        return this.liveFeed.filter(this.filterFourStars)
      } else {
        return []
      }
    },
    totalSales() {
      return this.sales.reduce((acc, val) => acc + val.salesInM, 0)
    },
    user() {
      return this.$store.getter.user
    },
    ...mapGetters(["currentUser", "networks"]),
  },

  created() {
    /*     this.handleGetUser(); */
  },

  methods: {
    setEntryStatus(newStatus) {
      console.log('updateStatus emitted: ', newStatus)
      this.$store.dispatch('setEntryStatus', newStatus)
    },
    filterZeroStars(candidate, level) {
      return candidate.client_level === "0";
    },
    filterOneStars(candidate, level) {
      return candidate.client_level === "1";
    },
    filterTwoStars(candidate, level) {
      return candidate.client_level === "2";
    },
    filterThreeStars(candidate, level) {
      return candidate.client_level === "3";
    },
    filterFourStars(candidate, level) {
      return candidate.client_level === "4";
    },
    complete(index) {
      this.list[index] = !this.list[index];
    },
    handleGetUser() {
      this.$store.dispatch("getUser");
    },
  },
};
</script>

<style scoped>
  .network {
    background-repeat: no-repeat;
    padding: 0;
    margin: 0;
    font-size: 10px;
    font-weight: 500;
    align-items: center;
    -webkit-box-align: center;
    color: #FFFF;
    letter-spacing: 0 !important;
    line-height: 1rem;
    text-transform: uppercase;
    font-family: "Roboto", sans-serif !important;
    white-space: nowrap;
    padding-right: 8px;
    padding-left: 8px;
    border-radius: 4px;
    margin-left: 4px;
    margin-right: 4px;

  }
  .red {
    background-color:red;
  }
  .orange {
    background-color: orange;
  }
  .purple {
    background-color: purple;
  }
  .green {
    background-color: green
  }
</style>
<style>
html {
  scroll-behavior: smooth;
}
</style>