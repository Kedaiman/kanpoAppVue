import { createLocalVue, shallowMount } from '@vue/test-utils'
import CardElement from '@/components/CardElement.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('CardElement screen display', () => {
  const router = {push: jest.fn()}
  // preparing props
  let ranking = 1
  let productName = "葛根湯"
  let productImage = "notExist.png"
  let detailInfo = "テスト用詳細情報"
  let wrapper = shallowMount(CardElement, {
    propsData: {
      ranking: ranking,
      productName: productName,
      productImage: productImage,
      detailInfo: detailInfo
    },
    mocks: {
      $router: router
    }
  })

  it('screen display test', () => {
    expect(wrapper.find('.card-header p').text()).toEqual(ranking + "位")
    expect(wrapper.find('.card-title').text()).toEqual(productName)
    //expect(wrapper.find('img').attributes().src).toEqual(productImage)
  })

  it('click button to see detail', done=> {
    wrapper.find('button', '.btn-secondary').trigger('click') 
    setTimeout(() => {
      expect(router.push).toHaveBeenCalledWith({
        name: 'detail',
        params: {
          name: productName,
          explain: "一言説明 --未実装--",
          efficacy: detailInfo,
          image: "noImage.png"
        }
      })
      done()
    })
  })
})