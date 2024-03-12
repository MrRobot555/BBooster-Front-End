import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import { client as apolloClient} from './main'
import { 
  GET_USER,
  SIGNIN_USER,
  GET_CURRENT_USER,
  GET_NETWORKS,
  SET_ENTRY_STATUS 
} from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null,
    networks : null,
    currentUser : null,
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  mutations: {
    setCurrentUser: (state, payload) => {
      state.currentUser = payload
    },
    clearUser: state => (state.currentUser = null),
    setNetworks: (state, payload) => {
      state.networks = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SCRIM (state, payload) {
      state.barColor = payload
    },
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      apolloClient
      .query({
        query: GET_CURRENT_USER
      })
      .then(({ data }) => {
        console.log('signal: ', data.getCurrentUser)
        commit('setCurrentUser', data.getCurrentUser)
      })
      .catch(err => {
        console.error(err)
      })
    },

    getNetworks: ({ commit }) => {
      console.log('getting networks')
      apolloClient
      .query({
        query: GET_NETWORKS
      })
      .then(({ data }) => {
        console.log('networks: ', data.getNetworks.networks_name)
        commit('setNetworks', data.getNetworks.networks_name)
      })
      .catch(err => {
        console.log(err)
      })
    },

    getUser: ({ commit }) => {
      apolloClient
      .query({
        query: GET_USER
      }).then(( {data} ) => {
        commit('setUser', data.getUser)
        console.log(data.getUser)
      }).catch(err => {
        console.log(err)
      })
    },

    signinUser: async ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          console.log('token: ', data.signinUser.token)
          localStorage.setItem('token', data.signinUser.token)
          router.go()
        })
        .catch(err => {
          console.error(err);
        })
    },

    setEntryStatus: async ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SET_ENTRY_STATUS,
          variables: payload
        })
        .then(({ data }) => {

        })
        .catch(err => {
          console.error(err);
        })
    },

    signoutUser: async ({ commit }) => {
      commit('clearUser')
      localStorage.setItem('token', '')
      await apolloClient.resetStore()
      router.push('/')
    }
  },

  getters : {
    user : state => state.user,
    currentUser : state => state.currentUser,
    networks : state => state.networks
  },
})
