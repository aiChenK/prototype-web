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

function getTeams () {
    return GET('/api/prototype/team')
        .then(res => {
            return res.data
        })
}

function getTags () {
    return GET('/api/prototype/tag')
        .then(res => {
            return res.data
        })
}

export default new Vuex.Store({
    state: {
        isLogin: false,
        projects: [],
        teams: [],
        tags: []
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
        },
        getTeams(state, teams) {
            state.teams = teams
        },
        getTags(state, tags) {
            state.tags = tags
        }
    },
    actions: {
        async getProjects(context) {
            context.commit('setProjects', await getProjects())
        },
        async getTeams(context) {
            context.commit('getTeams', await getTeams())
        },
        async getTags(context) {
            context.commit('getTags', await getTags())
        },
        async initState(context) {
            this.dispatch("getProjects")
            this.dispatch("getTeams")
            this.dispatch("getTags")
        }
    }
})