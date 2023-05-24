import { vuexLocal } from './persist';
import { getLocationApi, getWeatherApi } from '@/api';

export const locationsState = {
  state: {
    savedLocs: {},
    savedLocsOrder: [],
    searchArr: [],
    errorGetWeather: String,
    locationsError: String
  },
  getters: {
    getSearchArr: (s) => s.searchArr,
    getSavedLocs: (s) => s.savedLocs,
    getSavedLocsOrder: (s) => s.savedLocsOrder,
    getError: (s) => s.locationsError,
    getErrorGetWeather: (s) => s.errorGetWeather
  },
  mutations: {
    addWeatherByLoc(state, loc) {
      loc.locId = loc.name + loc.country + loc?.state;
      state.savedLocsOrder.includes(loc.locId) ?
        state.errorGetWeather = "This Location is in your list already" : (
          state.savedLocsOrder = [loc.locId, ...state.savedLocsOrder],
          state.savedLocs = {
            ...state.savedLocs,
            [loc.locId]: loc
          })
    },
    setLocations(state, arr) {
      state.savedLocs = arr;
    },
    setLocationsOrder(s, a) {
      s.savedLocsOrder = a;
    },
    setSearchArr(state, arr) {
      state.searchArr = arr;
    },
    deleteLocation(state, loc) {
      state.savedLocsOrder = [...state.savedLocsOrder.filter(i => i !== loc)]
      delete state.savedLocs[loc]
    },
    setError(state, mess) {
      state.locationsError = mess
    },
    setErrorGetWeather(state, mess) {
      state.errorGetWeather = mess
    }
  },
  actions: {
    getCityLocation(ctx, str) {
      getLocationApi(str)
        .then(r => {
          ctx.commit('setError', '');
          ctx.commit('setSearchArr', r.data)
          if (!r.data.length && r.status == 200) {
            ctx.commit('setErrorGetWeather', 'the city not found')
          }
        })
        .catch(e => ctx.commit('setError', e.message))
    },
    getWeather(ctx, loc) {
      getWeatherApi(loc)
        .then(r => {
          const result = { ...loc, ...r.data }
          ctx.commit('setErrorGetWeather', '');
          ctx.commit('addWeatherByLoc', result)
        })
        .catch(e => ctx.commit('setError', e.message))
    },
  },
  plugins: [
    vuexLocal.plugin,
  ]
}