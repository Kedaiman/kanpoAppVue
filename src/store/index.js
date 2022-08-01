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
      state.nowQuestion.count++; 
      state.nowQuestion.content = payload.questionContent
      state.nowQuestion.options = payload.optionList
      state.nowQuestion.isNextExist = payload.nextExist
    },
    updateAnswer(state, payload) {
      state.answer = payload
    }
  },
  actions: {
    startAnalysis({commit}) {
      const url = 'http://localhost:8080/startAnalysis'
      fetch(url, {
        method: "get",
      })
      .then(response => response.text())
      .then(text => {
        const responseObj = JSON.parse(text) 
        commit('updateAnalysisId', responseObj.analysisId)
        commit('updateNowQuestion', responseObj)
      })
    },
    updateNowQuestion({commit}, payload) {
      commit('updateNowQuestion', payload)
    },
    async getAnswer({state, commit}) {
      const url = 'http://localhost:8080/getResult/' + state.analysisId
      const response = await fetch(url, {method: "get"})
      const responseObj = await response.json()
      commit('updateAnswer', responseObj)
      return responseObj;
    },
    async sendAnswer({state, dispatch}, answerNum) {
      const url = 'http://localhost:8080/sendAnswer'
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
      if (responseObj.nextExist) {
        await dispatch('updateNowQuestion', responseObj)
      } else {
        await dispatch('getAnswer')
      }
      return responseObj;
  }
  },
  modules: {
  }
})
