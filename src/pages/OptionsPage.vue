<template>
  <div class="settings">
    <h2 class="settings__title">Settings</h2>
    <input
      class="settings__input"
      type="text"
      @input="getLocationByCityStr"
      v-model="searchLine"
      placeholder="Enter city name"
    />
    <div class="settings__error" v-if="!!getErrorGetWeather">
      {{ getErrorGetWeather }}
    </div>
    <SearchListUi v-if="!!getSearchArr" :itemsArr="getSearchArr" @emitItem="saveLoc" />
    <button class="settings__btn_close" @click="closeOptions">
      <span class="icon_close"></span>
    </button>
    <CityList @deleteItem="deleteLocation" />
  </div>
</template>

<script>
import CityList from "@/components/CityList.vue";
import SearchListUi from "@/components/SearchList.vue";

import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "OptionsComp",
  emits: ["hideOptions"],
  components: {
    CityList,
    SearchListUi,
  },
  data() {
    return {
      searchLine: "",
      timer: null,
    };
  },
  methods: {
    saveLoc(locObj) {
      this.getWeather(locObj);
      if (!this.getErrorGetWeather) {
        this.searchLine = "";
        this.setSearchArr([]);
      }
    },

    getLocationByCityStr() {
      this.setSearchArr([]);
      this.setErrorGetWeather("Searching...");
      clearTimeout(this.timer);

      if (!this.searchLine) return this.setErrorGetWeather(null);

      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.getCityLocation(this.searchLine);
        this.setErrorGetWeather(null);
      }, 1000);
    },

    closeOptions() {
      this.$emit("hideOptions");
    },

    ...mapActions(["getCityLocation", "getWeather"]),
    ...mapMutations([
      "setErrorGetWeather",
      "setLocations",
      "setSearchArr",
      "deleteLocation",
      "setLocationsOrder",
    ]),
  },
  computed: {
    ...mapGetters(["getSearchArr", "getSavedLocs", "getErrorGetWeather"]),
  },
  mounted() {
    if (!this.searchLine) this.setErrorGetWeather(null);
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.settings {
  position: relative;
  width: 100%;

  &__error {
    margin: 10px;
  }
  &__title {
    font-size: 15px;
    line-height: 16px;
    text-align: left;
    margin: 20px 10px;
  }
  &__input {
    border: none;
    display: block;
    font-size: 14px;
    line-height: 16px;
    background-color: #f8f8f8;
    margin: 5px;
    padding: 10px;
  }

  &__btn_close {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    height: 20px;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    & .icon_close {
      position: relative;
      display: block;
      background-color: black;
      width: 20px;
      height: 1px;
      transform: rotate(45deg);
      transform-origin: center;

      &::before {
        content: "";
        position: absolute;
        transform: rotate(90deg);
        transform-origin: center;
        background-color: inherit;
        width: inherit;
        height: inherit;
        left: 0;
      }
    }
  }
}
</style>
