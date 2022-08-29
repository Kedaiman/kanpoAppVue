import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    analysisId: "",
    nowQuestion: {
      count: 0,
      content: "",
      options: [],
      isNextExist: true
    },
    answer: []
  },
  getters: {
    getNowQuestion(state) {
      return () => {
        return {
          name: '質問' + state.nowQuestion.count,
          question_contents: state.nowQuestion.content,
          selection_count: state.nowQuestion.options.length,
          selection_contents: state.nowQuestion.options,
          isNextExist: state.nowQuestion.isNextExist
        }
      }
    },
    getAnswer(state) {
      return state.answer
    }
 },
  mutations: {
    updateAnalysisId(state, analysisId) {
      state.analysisId = analysisId
    },
    updateNowQuestion(state, payload) {
      state.nowQuestion.content = payload.questionContent
      state.nowQuestion.options = payload.optionList
      state.nowQuestion.isNextExist = payload.isNextExist
    },
    updateAnswer(state, payload) {
      state.answer = payload
    },
    initialize(state) {
      state.analysisId = ""
      state.nowQuestion.count = 0
      state.nowQuestion.content = ""
      state.nowQuestion.options = []
      state.nowQuestion.isNextExist = true
      state.answer = []
    },
    decrementCount(state){
      if (state.nowQuestion.count > 0) {
        state.nowQuestion.count--;
      }
    },
    incrementCount(state) {
      state.nowQuestion.count++;
    }
  },
  actions: {
    async startAnalysis({commit}) {
      const url = '/startAnalysis'
      const response = await fetch(url, {method: "get"})
      const responseObj = await response.json()
      commit('updateAnalysisId', responseObj.analysisId)
      commit('incrementCount')
      commit('updateNowQuestion', responseObj)
    },
    updateNowQuestion({commit}, payload) {
      commit('updateNowQuestion', payload)
    },
    async getAnswer({state, commit}) {
      const url = '/getResult/' + state.analysisId
      const response = await fetch(url, {method: "GET"})
      const responseObj = await response.json()
      commit('updateAnswer', responseObj)
      return responseObj;
    },
    async sendAnswer({state, commit, dispatch}, answerNum) {
      const url = '/sendAnswer'
      const data = {
        analysisId: state.analysisId, 
        answerNum: answerNum
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    
      const responseObj = await response.json()
      // 次の質問が存在している場合
      if (responseObj.isNextExist) {
        await dispatch('updateNowQuestion', responseObj)
        commit('incrementCount')
      } else {
        await dispatch('getAnswer')
      }
      return responseObj;
    },
    async backQuestion({state, commit, dispatch}) {
      const url = '/backQuestion/' + state.analysisId
      const response = await fetch(url, {method: 'GET'});
    
      const responseObj = await response.json()
      // storeの質問情報を前の質問に戻す
      await dispatch('updateNowQuestion', responseObj)
      // count--
      commit('decrementCount')
      return responseObj;
    },
    initialize({commit}) {
      commit('initialize')
    }
  },
  modules: {
  }
})
