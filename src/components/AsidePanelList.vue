<template>
  <ul class="aside-list-panel-list">
    <li
    class="panel-block aside-list-panel-list-item"
    :class="{
      'has-text-white': isSelected(item.id),
      'has-background-primary': isSelected(item.id)
    }"
    v-for="item in list"
    :key="item.id">
      <slot v-bind:item="item"></slot>
      <b-button
      size="is-small"
      @click="$emit('list-item-click', item)">{{ buttonText }}</b-button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    selected: {
      type: Number
    },
    buttonText: {
      type: String,
      required: true
    }
  },

  computed: {
    isSelected: (instance) => (id) => {
      return id === instance.selected;
    }
  }
}
</script>