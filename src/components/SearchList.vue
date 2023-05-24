<template>
  <div class="wrapperr">
    <ul class="search-list">
      <li class="search-list__item"
        v-for="item in itemsArr" 
        :key="item.locId" 
        :data-lat="item.lat" 
        :data-lon="item.lon"
        :data-locId="item.locId"
        :data-name="item.name"
        :data-country="item.country"
        :data-state="item.state"
        @click="handle"
      >
        {{ item.name }}, {{ item.country }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchListUi",
  emits: ["emitItem"],
  methods: {
    handle(i){
      i.preventDefault()
      const d = i.target.dataset
      const item = {
        locId: d.locId,
        lon: d.lon,
        lat: d.lat,
        name: d.name,
        country: d.country,
        state: d.state
      };
      this.$emit("emitItem", item)
    }
  },
  props: {  
    itemsArr: Array,
  }
}
</script>

<style lang="scss" scoped>
.search-list {
  display: flex;
  flex-direction: column;

  &__item{
    list-style: none;
    font-size: 14px;
    line-height: 16px;
    margin: 5px;
    padding: 10px;
    cursor: pointer;
  }
}
</style>
