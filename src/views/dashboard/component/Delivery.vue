<template>
    <base-material-card
      :color="isCompleted ? 'success' : 'info'"
      icon="mdi-check-bold"
      inline
      class="px-5 py-3"
      :class="{ 'progress-card' : !isCompleted}"
    >
      <template v-if="!isCompleted" v-slot:heading>
        <v-progress-circular
          :rotate="180"
          :size="100"
          :width="15"
          :value="orderProgressValue"
          color="pink"
        >
          <span class="progress-value">{{ orderProgressValue }}%</span>
        </v-progress-circular>
      </template>

      <template v-slot:after-heading>
        <div class="delivery-info">
          <div class="card-title font-weight-light">
            Product Name: {{ networkName }}
          </div>
          <div class="card-title font-weight-light">
            <span>Order Time: {{ moment(list.order_date).fromNow() }}</span> 
          </div>
        </div>
      </template>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-auto"
        label="Search"
        hide-details
        single-line
        style="max-width: 250px;"
      />

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['fullname', 'city']"
        :sort-desc="[false, true]"
        :item-class="statusBackground"
        multi-sort
      >

<!-- 
            fullname: item.client_name,
            phone: item.client_phone,
            city: 'Tokyo',
            status: item.status,
            acquireddate: this.moment(item.acquire_datetime).format('YYYY-MM-DD hh:mm'),
            recalltime: this.moment(item.recall_time).format('YYYY-MM-DD hh:mm'),
            /* mynotes: item.own_notes, */
            mynotes: 'awesome service', -->

      <template v-slot:item="{ item }">
        <tr
          :class="{
            'tocall-backgound': item.status === 'TO_CALL',
            'success-backgound': item.status === 'SUCCCESS',
            'callback-backgound': item.status === 'TO_CALL_BACK',
            'rip-backgound': item.status === 'RIP',
          }"
        >
          <td>{{ item.fullname }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.city }}</td>
          
          <td>
            <v-slider
              @input="codeAndSetStatusCode($event, item)"
              :value="decodeStatusCode(item.status)"
              step="1"
              max="3"
              ticks="always"
              tick-size="1"
              class="status-slider"
              hide-details
              :track-color="statusCodes[decodeStatusCode(item.status)].color"
              :track-fill-color="statusCodes[decodeStatusCode(item.status)].color"
              :thumb-color="statusCodes[decodeStatusCode(item.status)].color"
            >
            </v-slider>
            <div
              class="status-text-container"
            >
              <span
                class="status-text"
                :style="{'color': statusCodes[decodeStatusCode(item.status)].color}"
                v-if="!statusUpdate"
              >
                {{ decodeStatusMessage(item.status) }}
              </span>
              <span
                class="status-text"
                :style="{'color': statusCodes[decodeStatusCode(item.status)].color}"
                v-else
              >
                <v-progress-circular
                  indeterminate
                  size="10"
                  width="2"
                  class="status-spinner"
                ></v-progress-circular>
              </span>
            </div>            
          </td>

          <td>{{ item.acquireddate }}</td>
          <td>
            <date-time-picker
              label="Set call back time"
              :datetime="item.recalltime"
              @input="updateDatetime">
            </date-time-picker>
          </td>
        </tr>
      </template>

        <template v-slot:item.mynotes="notesData">
          <v-text-field
            class="purple-input"
            v-model="notesData.item.mynotes"
            @change="getdata('notes')"
          />
        </template>
        <template v-slot:item.feedback="feedbackData">
          <v-text-field
            class="purple-input"
            v-model="feedbackData.item.feedbackData"
            @change="getdata('feedback')"
          />
        </template>
      </v-data-table>
    </base-material-card>
</template>

<script>
  import { mapGetters } from "vuex"
  import DateTimePicker from "@/views/dashboard/component/DateTimePicker.vue"
  /* import store from './store' */

  export default {
    name: 'DashboardDataTables',
    components: {
      DateTimePicker
    },
    props: ['list'],
    data: () => ({
      statusUpdate: false,
      statusCodes: 
      [
        {
          key: 0,
          dbCode: 'TO_CALL',
          message: 'to call',
          color: 'red'
        },
        {
          key: 1,
          dbCode: 'SUCCESS',
          message: 'successful',
          color: 'green'
        },
        {
          key: 2,
          dbCode: 'TO_CALL_BACK',
          message: 'to recall',
          color: 'orange'
        },
        {
          key: 3,
          dbCode: 'RIP',
          message: 'R.I.P.',
          color: 'black'
        }      
      ],
      datetime:'2017-06-30 11:05:00',
      label:'Custom Component',
      dateD: '2021-05-01',
      timePickerOpen: false,
      notesInput: '',
      simulationInterval: {},
      orderProgressValue: 0,
      headers: [
        {
          text: 'Full name',
          value: 'fullname',
        },
        {
          text: 'Phone',
          value: 'phone',
        },
        {
          text: 'City',
          value: 'city',
        },
        {
          text: 'Status',
          value: 'status',
        },
        {
          text: 'Acquired',
          value: 'acquireddate',
        },
        {
          text: '(Re)call time',
          value: 'recalltime',
        },
        {
          text: 'My notes',
          value: 'mynotes',
        },
        {
          text: 'Feedback',
          value: 'feedback',
        },
      ],
      search: undefined,
    }),
    beforeDestroy () {
      clearInterval(this.simulationInterval)
    },
    mounted () {
      this.simulationInterval = setInterval(() => {
        if (this.orderProgressValue === 100) {
          return (this.orderProgressValue = 0)
        }
        this.orderProgressValue += 10
      }, 1000)
    },
    computed: {
      ...mapGetters(["currentUser", "networks"]),
      items() {
        const items = []
        for (const item of this.list.name_list) {
          console.log('acquire_datetime formatted: ', this.moment(item.acquire_datetime).format('YYYY-MM-DD hh:mm'))
          console.log('recall_time: ', item.recall_time)
          console.log('recall_time formatted: ', this.moment(item.recall_time).format('YYYY-MM-DD hh:mm'))
          const itemToPush = {
            fullname: item.client_name,
            phone: item.client_phone,
            city: 'Tokyo',
            status: item.status,
            acquireddate: this.moment(item.acquire_datetime).format('YYYY-MM-DD hh:mm'),
            recalltime: this.moment(item.recall_time).format('YYYY-MM-DD hh:mm'),
            /* mynotes: item.own_notes, */
            mynotes: 'awesome service',
            feedback: item.feedback,
            entryID: item._id,
          }
        // eslint-disable-next-line
        itemToPush['userID'] = this.list.userID._id
        // eslint-disable-next-line
        itemToPush['listID'] = this.list._id
        items.push(itemToPush)
        }
        return items
      },
      product() {
        return {
          name: 'Quantum',
          orderedAt: '2021-10-05'
        }
      },
      isCompleted() {
        return (this.list.order_quantity < this.list.name_list.length)
      },
      networkName() {
        const thisNetwork = this.networks.filter(searchName => {
          return searchName.id === this.list.network_id
        })
        return thisNetwork[0].name
      }
    },
    watch: {
      list: function() {
        this.statusUpdate = false;
      }
    },
    methods: {
      statusBackground(item) {
        console.log('ITEM: ', item)
        if (item.status === 'TO_CALL') {
          return 'tocall-backgound'
        }
        if (item.status === 'SUCCESS') {
          return 'success-backgound'
        }
        if (item.status === 'TO_CALL_BACK') {
          return 'to-call-back-backgound'
        }
        if (item.status === 'RIP') {
          return 'rip-backgound'
        }    
        return null
      },

      codeAndSetStatusCode(e, dbItem) {
         this.statusUpdate = true;
         const findIndex = this.statusCodes.filter(obj => {
          return obj.key === e
        })
        console.log('DB CODE: ', findIndex[0].dbCode)
        console.log('ENTRY: ', dbItem.entryID)

        const updateStatus = {
          entryID: dbItem.entryID,
          newStatus: findIndex[0].dbCode
        }
        this.$emit('setEntryStatus', updateStatus)
      },
      decodeStatusCode(statusData) {
        console.log('FINDING STATUS CODE: ', statusData)
        const findIndex = this.statusCodes.filter(obj => {
          return obj.dbCode === statusData
        })
        return findIndex[0].key
      },

      decodeStatusMessage(statusData) {
        console.log('FINDING MESSAGE: ', statusData)
        const findIndex = this.statusCodes.filter(obj => {
          return obj.dbCode === statusData
        })
        return findIndex[0].message
      },

      getdata() {
        console.log(this.items[0].mynotes)
      },
      updateDatetime(datetime){
        console.log('updating: ', datetime)
        this.datetime = datetime;
      },
      myLog(log) {
        console.log(log)
      }
    }
  }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.progress-value {
  font-weight: 900;
  font-size: 14px;
}
.v-progress-circular {
  height: 60px!important;
  width: 60px!important;
}
.delivery-info {
  position: relative;
  top: -10px;
}
.status-slider {
  height: 2em;
}
.status-text-container {
  width: 100%;
  min-width: 86px;
  display: flex;
  justify-content: center;
}
.status-text {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}
.status-spinner {
  height: 20px!important;
  width: 20px!important;
  margin: 0!important;
  padding: 0!important;
}

.tocall-backgound {
  background-color: #ffb5b0;
}
.success-backgound {
  background-color: #97ff9b;
}
.callback-backgound {
  background-color: #ffd79c;
}
.rip-backgound {
  background-color: #c0c0c0;
}
</style>
<style>
.progress-card .v-card--material__heading {
  max-height: 100%!important;
  padding: 0!important;
}

</style>
