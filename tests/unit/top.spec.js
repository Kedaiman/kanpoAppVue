import { createLocalVue, shallowMount } from '@vue/test-utils'
import TopView from '@/views/topView.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('TopView Start Button', () => {
  let wrapper
  let router
  let actions

  beforeEach(() => {
    router = {push: jest.fn()}
    actions = {
      initialize: jest.fn(),
      startAnalysis: jest.fn()
    }
    const store = new Vuex.Store({
      state: {},
      actions: actions
    })
    wrapper = shallowMount(TopView, {
      mocks: {
        $router: router,
        $store: store
      }
    })
  })

  it('success', done => {
    wrapper.find('button').trigger('click') 
    setTimeout(() => {
      expect(actions.initialize).toBeCalled()
      expect(actions.startAnalysis).toBeCalled()
      expect(router.push).toBeCalledWith("/question")
      done()
    })
  })

  it('fail', done => {
    wrapper = shallowMount(TopView, {
      mocks: {
        $router: router,
        $store: null
      }
    })
    wrapper.find('button').trigger('click')
    setTimeout(() => {
      expect(router.push).toBeCalledWith("/error")
      done()
    })
  })
})