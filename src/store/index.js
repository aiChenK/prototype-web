import Vue from 'vue'
import Vuex from 'vuex'
import {GET} from '@/utils/http'

Vue.use(Vuex)

function getProjects () {
    return GET('/api/prototype/project')
        .then(res => {
            return res.data
        })
}

export default new Vuex.Store({
    state: {
        isLogin: false,
        projects: []
    },
    mutations: {
        login(state) {
            state.isLogin = true
        },
        loginOut(state) {
            state.isLogin = false
        },
        setProjects(state, projects) {
            state.projects = projects
        }
    },
    actions: {
        async getProjects(context) {
            context.commit('setProjects', await getProjects())
        }
    }
})