import { createLocalVue, shallowMount } from '@vue/test-utils'
import SearchView from '@/views/searchView.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('SearchView test', () => {
  const state = {
    medicines: [
      {
        id: 1,
        name: "漢方1",
        detailInfo:"漢方1の説明",
        nameKana: "かんぽういち"
      },
      {
        id: 2,
        name: "漢方2",
        detailInfo:"漢方2の説明",
        nameKana: "かんぽうに"
      }
    ]
  }
  const router = {push: jest.fn()}
  const actions = {
    getAllMedicines: jest.fn(),
  }
  const getters = {
    getMedicines: function() {
      return state.medicines
    }
  }
  const store = new Vuex.Store({
    state: state,
    actions: actions,
    getters: getters
  })
  let wrapper

  it('screen display (name, detailInfo, button)', () => {
    wrapper = shallowMount(SearchView, {
      mocks: {
        $router: router,
        $store: store
      }
    })
    const h3Elements = wrapper.findAll('h3');
    const detailInfoElements = wrapper.findAll('.bg-light div');
    for (let i = 0; i< h3Elements.length; i++) {
      // name(nameKana)
      expect([`${state.medicines[0].name}(${state.medicines[0].nameKana})`, 
      `${state.medicines[1].name}(${state.medicines[1].nameKana})`]).toContain(h3Elements.at(i).text());

      // detailInfo
      expect([state.medicines[0].detailInfo,  
      state.medicines[1].detailInfo]).toContain(detailInfoElements.at(i).text());
    }

    expect(wrapper.find('button, btn-primary').text()).toEqual('詳しく見る')
  })  

  it('initial actions', () => {
    wrapper = shallowMount(SearchView, {
      mocks: {
        $router: router,
        $store: store
      }
    })
    setTimeout(done => { 
      expect(actions.getAllMedicines).toBeCalled()
      done()
    })
  })  

  it('button push actions', () => {
    const state = {
      medicines: [
        {
          id: 1,
          name: "漢方1",
          detailInfo:"漢方1の説明",
          nameKana: "かんぽういち"
        }
      ]
    } 
    wrapper = shallowMount(SearchView, {
      mocks: {
        $router: router,
        $store: store
      }
    })
    wrapper.find('button', '.btn-primary').trigger('click') 
    setTimeout(done => {
      expect(router.push).toHaveBeenCalledWith({
        name: 'detail',
        params: {
          name: state.medicines[0].name,
          explain: "一言説明 --未実装--",
          efficacy: state.medicines[0].detailInfo,
          image: state.medicines[0].imagePath
        }
      })
      done()
    })
  })  
})
