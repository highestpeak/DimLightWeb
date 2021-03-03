<template>
  <div style="display: flex;">
    <slot name="button-group-inline-left"></slot>
    <b-button-group style="margin:0 auto;">
      <b-button squared variant="outline-secondary"
        v-for="(view,index) in viewOptions" :key="index"
        @click="changeView(index)"
        :pressed.sync='view.state'>
        <font-awesome-icon v-if="iconOption" :icon="view.icon" :size="size"/>
        {{view.text}} 
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
  name: 'ViewGroup',
  props: {
    iconOption: {
      type: Boolean,
      default: true
    },
    viewOptions: {
      type: Array
      // default: function () {
      //   return [
      //     {index: 0, state: false, icon: ['fas', 'list']}
      //     // {index: 0, state: false, text: 'view name'}
      //   ]
      // }
    },
    size: {
      type: String,
      default: '3x'
    }
  },
  data() {
    return {
      currViewIndex: 0
    }
  },
  methods: {
    changeView: function (index) {
      this.viewOptions[this.currViewIndex].state = false
      this.currViewIndex = index
      this.$emit('change-view', index)
    }
  }
}
</script>

<style>

</style>