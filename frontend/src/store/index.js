import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    providers: [],
    clients: []
  },
  getters: {
    clients: state => state.clients,
    providers: state => state.providers
  },
  mutations: {
    ADD_PROVIDERS(state, providers) {
      state.providers = providers
    },
    ADD_CLIENTS(state, clients){
      state.clients = clients
    },
    ADD_CLIENT(state, client){
      state.clients.push(client)
    },
    DELETE_CLIENT(state, key){
      state.clients.splice(key, 1)
    },
    UPDATE_CLIENT(state, {key:key, client:client}){
      let stateClient = state.clients.find( client => client.email == client.email) 
      stateClient.name = client.name
      stateClient.email = client.email
      stateClient.providers = client.providers
      stateClient.phone = client.phone
    }
  },
  actions: {

     fetchProviders({ commit }) {
       return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/providers/')
          .then( response => {
              commit('ADD_PROVIDERS', response.data.providers)
              resolve(response)
          }).catch( err => reject(err))

       })
    },

    fetchClients({ commit }) {
      return new Promise((resolve, reject) => {
       axios.get('http://localhost:8000/api/clients/')
         .then( response => {
           commit('ADD_CLIENTS', response.data.clients)
           resolve(response)
         }).catch( err => reject(err))

      })
   },

   addClient({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:8000/api/clients/`,data)
        .then( response => {
          commit('ADD_CLIENT', response.data.client)
          resolve(response)
        }).catch( err => reject(err))

     })
   },
   deleteClient({commit}, data) {
    return new Promise((resolve, reject) => {
      axios.delete(`http://localhost:8000/api/clients/${data.id}`)
        .then( response => {
          commit('DELETE_CLIENT', data.key)
          resolve(response)
        }).catch( err => reject(err))

     })
   },
   updateClient({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.patch(`http://localhost:8000/api/clients/${payload.id}`, payload.data)
        .then( response => {
          commit('UPDATE_CLIENT', {key:payload.key, client :response.data.client})
          resolve(response)
        }).catch( err => reject(err))

     })
   }

  },
  modules: {

  }
})
