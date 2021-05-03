import Vue                 from 'vue';
import VueCarouselSlider   from './VueCarouselSlider';
import CustomSlider        from './CustomSlider';
import ProgressRing        from './ProgressRing';
import Home                from './pages/Home';
import About               from './pages/About';
import Contact             from './pages/Contact';
import Blog                from './pages/Blog';
import Banner              from './partials/Banner';
import Navbar              from './partials/Navbar';
import Vue2TouchEvents     from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);
new Vue({
  el: '#site',
  components: {
    VueCarouselSlider,
    CustomSlider,
    ProgressRing,
    Home,
    About,
    Contact,
    Blog,
    Banner,
    Navbar
  }
});