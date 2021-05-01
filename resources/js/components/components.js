import Vue                 from 'vue';
import VueCarouselSlider   from './VueCarouselSlider';
import CustomSlider        from './CustomSlider';
import ProgressRing        from './ProgressRing';
import Vue2TouchEvents     from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);

new Vue({
  el: '#site',
  components: {
    VueCarouselSlider,
    CustomSlider,
    ProgressRing
  }
});