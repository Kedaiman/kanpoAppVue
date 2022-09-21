import { createLocalVue, shallowMount ,RouterLinkStub} from '@vue/test-utils'
import ErrorView from '@/views/errorView.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ErrorView screen display', () => {

  const localVue = createLocalVue();
  let wrapper = shallowMount(ErrorView, {})

  it('error word', () => {
    expect(wrapper.find('h1').text()).toBe('エラー')
  })

  it('explanation', () => {
    expect(wrapper.find('.lead').text()).toBe('再度ホーム画面からやり直してください')
  })

  it('button display', () => {
    expect(wrapper.find('.btn-primary').text()).toBe('HOME »')
  })

  it('router-link to /top', () => {
    wrapper = shallowMount(ErrorView,{
      localVue,
      stubs: { RouterLink: RouterLinkStub },
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe("/top")
  })
})