import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        isInShelf: 0,
        keyword:''
    },
    mutations: {
        SET_ISINSHELF(state, data) {
            state.isInShelf = data
        },SET_KEYWORD(state,data){
            state.keyword = data
        }
        
    }, actions: {
        setIsInShelf({ commit }, data) {
            return commit('SET_ISINSHELF', data)
        },
        setKeyword({ commit }, data) {
            return commit('SET_KEYWORD', data)
        }
    }
})