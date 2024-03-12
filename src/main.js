import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import vuetify from './plugins/vuetify'
import i18n from './i18n'

import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import moment from 'moment'


Vue.prototype.moment = moment

Vue.config.productionTip = false
Vue.use(VueApollo)

const wsLink = new WebSocketLink({
  uri : 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      authorization: localStorage.getItem('token'),
    },
  },
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const allLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const authLink = setContext((_, { headers }) => {
    // get the authentication token from ApplicationSettings if it exists

    const token = localStorage.getItem('token')

    // return the headers to the context so HTTP link can read them
    return {
        headers: {
            ...headers,
            authorization: token
        }
    }
})

export const client = new ApolloClient({
  link: authLink.concat(allLink),
  cache: new InMemoryCache({
    appTypename: true
  }),
  fetchOptions: {
    credentials: 'include'
  }
})

const apolloProvider = new VueApollo({
  defaultClient: client
})

new Vue({
  router,
  apolloProvider,
  store,
  vuetify,
  i18n,
  render: h => h(App),
  // eslint-disable-next-line vue/order-in-components
  created() {
    this.$store.dispatch('getCurrentUser')
    this.$store.dispatch('getNetworks')
    console.log('before_data: ', this.$store.getters.currentUser)

  },
}).$mount('#app')
