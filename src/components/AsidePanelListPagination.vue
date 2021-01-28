<template>
  <b-pagination
    :total="pagination.total"
    v-model="pagination.current_page"
    :range-before="2"
    :range-after="3"
    order="is-centered"
    size="is-small"
    :per-page="pagination.per_page"
    icon-prev="chevron-left"
    icon-next="chevron-right"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
    @change="$emit('change', $event)">
  </b-pagination>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
  }
}
</script>