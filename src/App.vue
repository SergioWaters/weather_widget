<template>
  <div class="container">
    <div class="wrapper">
      <OptionsComp
        v-if="isOptionsShown"
        @hideOptions="switchOptionsVisibility" />
      <WeatherPage
        v-if="!isOptionsShown"
        @showOptions="switchOptionsVisibility" />
    </div>
  </div>
</template>

<script>
import OptionsComp from "@/pages/OptionsPage.vue";
import WeatherPage from "@/pages/WeatherPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "openweather-widgetsw",
  components: {
    OptionsComp,
    WeatherPage,
  },
  data() {
    return {
      isOptionsShown: false,
    };
  },
  methods: {
    switchOptionsVisibility() {
      this.isOptionsShown = !this.isOptionsShown;
    },
  },
  computed: {
    ...mapGetters(["getSavedLocsOrder"]),
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  margin: 0 auto;
}
.wrapper {
  max-width: 320px;
  margin-top: 60px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
