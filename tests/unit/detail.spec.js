import { createLocalVue, shallowMount } from '@vue/test-utils'
import DetailView from '@/views/detailView.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('DetailView screen display', () => {
  // preparing props
  let name = "葛根湯"
  let explain = "テスト用説明"
  let efficacy = "テスト用効能"
  let image = "noImage.png"

  it('screen display test', () => {
    let wrapper = shallowMount(DetailView, {
      propsData: {
        name: name,
        explain: explain,
        efficacy: efficacy,
        image: image
      }
    })
    expect(wrapper.find('h3').text()).toBe(name)
    expect(wrapper.find('p').text()).toBe(explain)
    expect(wrapper.find('.col-md-7 span').text()).toBe(efficacy)
    //expect(wrapper.find('img').attributes()).toEqual(image)
  })
})