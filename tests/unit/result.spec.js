import { createLocalVue, shallowMount } from '@vue/test-utils'
import ResultView from '@/views/resultView.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ResultView', () => {
  let getters

  beforeEach(() => {
    getters = {
      getAnswer: jest.fn(),
    }
    const store = new Vuex.Store({
      state: {},
      getters: getters 
    })
    shallowMount(ResultView, {
      mocks: {
        $store: store
      }
    })
  })

  it('success', () => {
    expect(getters.getAnswer).toBeCalled()
  })
})