<template>
  <div class="block">
    <carousel :navigationEnabled="true" :perPage="1" :autoplay="true" :autoplayTimeout="4000" :loop="true" :autoplayHoverPause="true">
      <slot></slot>
    </carousel>
  </div>
</template>

<script>

export default {
  // data() {
  //   return {
  //     name: "",
  //     company: "",
  //     comments: ""
  //   }
  // },

  // mounted: function () {
  // },

  // methods: {
  // }
};
</script>