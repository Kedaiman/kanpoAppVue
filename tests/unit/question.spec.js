import { createLocalVue, shallowMount } from '@vue/test-utils'
import QuestionView from '@/views/questionView.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('QuestionView screen display', () => {
  const state = {
    nowQuestion: {
      count: 1,
      content: "質問内容1",
      options: ["(1)", "(2)", "(3)"],
      isNextExist: true
    },
    answer: []
  }
  const router = {push: jest.fn()}
  const actions = {
    sendAnswer: jest.fn(),
    backQuestion: jest.fn(),
  }
  const getters = {
    getNowQuestion: () => {
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
  }
  const store = new Vuex.Store({
    state: state,
    actions: actions,
    getters: getters
  })

  it('Screen display (first question)', () => {
    const wrapper = shallowMount(QuestionView, {
      mocks: {
        $router: router,
        $store: store
      }
    })
    // 質問内容の確認
    expect(wrapper.find('h1').text()).toBe("質問" + state.nowQuestion.count)
    expect(wrapper.find('h2').text()).toBe(state.nowQuestion.content)
    // オプションの確認
    expect(wrapper.findAll('label').length).toEqual(state.nowQuestion.options.length)
    expect(wrapper.findAll('label').at(0).text()).toEqual(state.nowQuestion.options[0])
    // ボタンの確認
    expect(wrapper.find('.btn-primary', "button").isVisible()).toBe(true)
    expect(wrapper.find('.btn-secondary', "button").isVisible()).toBe(false)   
    expect(wrapper.find('.btn-danger', "button").isVisible()).toBe(false)   
  })

  it('Screen display (second question)', () => {
    // state内容書き換え
    state.nowQuestion.count = 2
    state.nowQuestion.content = "質問内容2"
    state.nowQuestion.options = ["(1)", "(2)"]

    const wrapper = shallowMount(QuestionView, {
      mocks: {
        $router: router,
        $store: store
      }
    })

    // 質問内容の確認
    expect(wrapper.find('h1').text()).toBe("質問" + state.nowQuestion.count)
    expect(wrapper.find('h2').text()).toBe(state.nowQuestion.content)
    // オプションの確認
    expect(wrapper.findAll('label').length).toEqual(state.nowQuestion.options.length)
    expect(wrapper.findAll('label').at(0).text()).toEqual(state.nowQuestion.options[0])
    // ボタンの確認
    expect(wrapper.find('.btn-primary', "button").isVisible()).toBe(true)
    expect(wrapper.find('.btn-secondary', "button").isVisible()).toBe(true)   
    expect(wrapper.find('.btn-danger', "button").isVisible()).toBe(false)   
  })

  it('Screen display (finished question tree)', () => {
    // state内容書き換え
    state.nowQuestion.count = 3
    state.nowQuestion.content = "質問内容3"
    state.nowQuestion.options = ["(1)", "(2)"]
    state.nowQuestion.isNextExist = false
    state.answer = ["結果1", "結果2", "結果3"]

    const wrapper = shallowMount(QuestionView, {
      mocks: {
        $router: router,
        $store: store
      }
    })

    // 質問内容の確認
    expect(wrapper.find('h1').isVisible()).toBe(false)

    const h2List = wrapper.findAll('h2')
    for (let i = 0; i < h2List.length; i++) {
      if (h2List.at(i).isVisible()) {
        expect(h2List.at(i).text()).toEqual("質問は終了しました") 
      }
    }
    // オプションの確認
    const labelList = wrapper.findAll('.form-check-label')
    for (let i = 0; i< labelList.length; i++) {
      expect(labelList.at(i).isVisible()).toBe(false)
    }

    // ボタンの確認
    expect(wrapper.find('.btn-primary', "button").isVisible()).toBe(false)
    expect(wrapper.find('.btn-secondary', "button").isVisible()).toBe(false)   
    expect(wrapper.find('.btn-danger', "button").isVisible()).toBe(true)   
  })  
})


describe('QuestionView button operation', () => {
  const state = {
    nowQuestion: {
      count: 2,
      content: "質問内容2",
      options: ["(1)", "(2)", "(3)"],
      isNextExist: true
    },
    answer: []
  }
  const router = {push: jest.fn()}
  const actions = {
    sendAnswer: jest.fn(),
    backQuestion: jest.fn(),
    toAnswer: jest.fn()
  }
  const getters = {
    getNowQuestion: () => {
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
  }
  const store = new Vuex.Store({
    state: state,
    actions: actions,
    getters: getters
  })
  let wrapper

  it('Button operation (Next question)', () => {
    wrapper = shallowMount(QuestionView, {
      mocks: {
        $router: router,
        $store: store
      }
    })
    wrapper.find('button', '.btn-primary').trigger('click') 
    setTimeout(done => {
      expect(actions.sendAnswer).toBeCalled()
      expect(router.push).toBeCalledWith("/question?count=" + state.nowQuestion.count)
      done()
    })
  })  

  it('Button operation (Pre question)', () => {
    wrapper = shallowMount(QuestionView, {
      mocks: {
        $router: router,
        $store: store
      }
    })
    wrapper.find('button', '.btn-secondary').trigger('click') 
    setTimeout(done => {
      expect(actions.backQuestion).toBeCalled()
      expect(router.push).toBeCalledWith("/question?count=" + state.nowQuestion.count)
      done()
    })
  })  

  it('Button operation (getting answer)', () => {
    state.nowQuestion.isNextExist = false
    state.answer = ["結果1", "結果2", "結果3"]

    wrapper = shallowMount(QuestionView, {
      mocks: {
        $router: router,
        $store: store
      }
    })
    wrapper.find('button', '.btn-danger').trigger('click') 
    setTimeout(done => {
      expect(actions.toAnswer).toBeCalled()
      expect(router.push).toBeCalledWith("/result")
      done()
    })
  })  
})