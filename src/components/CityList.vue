<template>
  <div class="wrapperr">
    <ul class="city-list">
      <li
        class="city-list_item"
        draggable="true"
        v-for="(element, index) in getSavedLocsOrder"
        :key="getSavedLocs[element]?.locId"
        :data-locId="getSavedLocs[element]?.locId"
        :data-lat="getSavedLocs[element]?.lat"
        :data-lon="getSavedLocs[element]?.lon"
        :data-name="getSavedLocs[element]?.name"
        @drag.prevent
        @dragover.prevent
        @dragstart="(e) => startHandle(e, getSavedLocs[element]?.locId, index)"
        @drop.prevent="(e) => dropHandle(e, getSavedLocs[element]?.locId, index)"
      >
        <button class="btn__move">
          <span class="icon_burger"></span>
        </button>
        {{ getSavedLocs[element]?.country }}, {{ getSavedLocs[element]?.name }}
        <button
          class="btn__delete"
          @click="() => deleteLocation(getSavedLocs[element].locId)"
        >
          <span class="icon_close"></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CityList",
  data() {
    return {
      startId: null,
      startIndx: null,
    };
  },
  computed: {
    ...mapGetters(["getSavedLocs", "getSavedLocsOrder"]),
  },
  methods: {
    startHandle(e, id, index) {
      this.startId = id;
      this.startIndx = index;
    },
    dropHandle(e, id, index) {
      let newOrderArr = this.getSavedLocsOrder;

      newOrderArr[index] = this.startId;
      newOrderArr[this.startIndx] = id;

      this.setLocationsOrder(newOrderArr);
    },
    ...mapMutations(["setLocations", "deleteLocation", "setLocationsOrder"]),
  },
};
</script>

<style lang="scss" scoped>
.city-list {
  .item_wrapper {
    pointer-events: visiblePainted;
  }

  &_item {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 14px;
    line-height: 16px;
    background-color: #f8f8f8;
    margin: 5px;
    padding: 10px;

    & .btn__move {
      cursor: grab;
      &:active {
        cursor: grabbing;
      }
    }
    & .btn__delete {
      cursor: pointer;
    }

    & .btn__delete,
    & .btn__move {
      background-color: transparent;
      border: none;
      width: 20px;
      height: 20px;
      pointer-events: all;
    }

    .icon_close {
      position: relative;
      display: block;
      background-color: black;
      width: 20px;
      height: 1px;
      transform: rotate(45deg);
      transform-origin: center;
      pointer-events: none;

      &::before {
        content: "";
        position: absolute;
        transform: rotate(90deg);
        transform-origin: center;
        background-color: inherit;
        width: inherit;
        height: inherit;
        left: 0;
        pointer-events: inherit;
      }
    }
    .icon_burger {
      position: relative;
      display: block;
      background-color: black;
      width: 20px;
      height: 1px;
      transform-origin: center;
      pointer-events: none;

      &::after,
      &::before {
        content: "";
        position: absolute;
        transform-origin: center;
        background-color: inherit;
        width: inherit;
        height: inherit;
        left: 0;
        pointer-events: inherit;
      }
      &::before {
        top: 6px;
      }
      &::after {
        bottom: 6px;
      }
    }
  }
}
</style>
