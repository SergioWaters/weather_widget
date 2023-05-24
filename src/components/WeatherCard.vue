<template>
  <div class="weather__card">
    <h3 class="title">{{ weather?.name }}, {{ weather.sys?.country }}</h3>
    <ul class="main__list">
      <li class="list__item">
        <img
          class="main__icon"
          :src="getIconUrl(weather.weather?.[0].icon)"
          :alt="weather.weather?.[0].description"
        />
        <span class="main__degrees">{{ round(weather.main?.temp) }}&deg;</span>
      </li>
      <li class="list__item">
        <span class="main__icon-description">{{ weather.weather?.[0].description }}</span>
        <span class="main__feels-like"
          >Feels like: {{ round(weather.main?.feels_like) }}&deg;</span
        >
      </li>
      <li class="list__item">
        <span class="main__wind">Wind: {{ weather.wind?.speed }}m/s</span>
        <span class="main__min-max-temp">
          min: {{ round(weather.main?.temp_min) }}&deg; max:
          {{ round(weather.main?.temp_max) }}&deg;
        </span>
      </li>
      <li class="list__item">
        <span class="main__humidity">Humidity: {{ weather.main?.humidity }}%</span>
        <span class="main__pressure">Pressure: {{ weather.main?.pressure }}hPa</span>
      </li>
      <li class="list__item">
        <span class="main__visibility"
          >Visibility: {{ weather?.visibility / 1000 }}km</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "WeatherCard",
  props: {
    weather: Object,
  },
  methods: {
    getIconUrl: (code) => `http://openweathermap.org/img/wn/${code}@2x.png`,
    round: (int) => Math.round(int),
  },
};
</script>

<style scoped lang="scss">
.weather__card {
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
}
.title {
  font-size: 20px;
}
.main__list {
  background: linear-gradient(180deg, #ff85e4 0%, #229efd 179.25%);
  border-radius: 15px;
  box-shadow: 5px 5px 5px #00000018;
  padding: 10px;
}
.list__item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: #ffffff48;
  box-shadow: 0 0 2px 2px #ffffff48;
  border-radius: 15px;

  & .main__icon {
    flex: 1;
  }

  & .main__degrees {
    display: block;
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    justify-content: center;
  }

  & span {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    padding: 5px;
    white-space: nowrap;
    text-align: right;
    font-size: 14px;

    &:last-child {
      justify-content: flex-start;
    }

    &.main__visibility {
      justify-content: center;
    }
  }
}
</style>
