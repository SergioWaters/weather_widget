import { locationsState } from './modules/locations'
import { modalState } from './modules/modal'
import { vuexLocal } from './modules/persist'
import { createStore } from 'vuex'

export const store = createStore({
  modules: {
    locationsState,
    modalState,
  },
  plugins: [
    vuexLocal.plugin,
  ]
})