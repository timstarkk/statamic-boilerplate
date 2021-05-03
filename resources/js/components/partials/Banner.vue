<template>
    <section id="banner" :class="['banner', image ? 'has-image' : '', height, 'gutter']">
        
        <div v-if="image" :class="['banner__image', `banner-${overlay}`]" :style="{ backgroundImage: `url(${image})` }"></div>

        <div class="banner__inner wrapper banner-inner">
            <div v-if="subheading" id="banner-heading-group" class="hgroup" :style="{opacity: `${animateOpacityOnLoad}`}">
                <div class="">
                    <h1 class="banner-heading-inner page-banner">
                        {{ heading ? heading : title }}
                    </h1>
                </div>
                <h3 class="mt-12 banner-subheading">{{ subheading }}</h3>
            </div>

            <h1 v-else>{{ heading ? heading : title }}</h1>

            <div v-if="intro" class="markdown mar-t">
                {{ intro }}
            </div>

            <a v-if="button" class="btn mar-t" :href="bannerLink">{{ bannerText }}</a>

            <div class="pseudo-line"></div>
        </div> <!-- END banner__inner -->
	
    </section> <!-- END banner -->
</template>

<script>
export default {
    data() {
      return {
          animateOpacityOnLoad: 0
      }
    },

    props: {
        image: {
            type: String,
            default: null
        },
        overlay: {
            type: String,
            default: null
        },
        height: {
            type: String,
            default: null
        },
        heading: {
            type: String,
            default: null
        },
        subheading: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        intro: {
            type: String,
            default: null
        },
        button: {
            type: String,
            default: null
        },
        buttonLink: {
            type: String,
            default: null
        },
        buttonText: {
            type: String,
            default: null
        },
    },

    mounted: function () {
        let _this=this;
        
        setTimeout(function(){
            _this.animateOpacityOnLoad = 1;
        },0);
    },

    // methods: {
    // }
}
</script>

<style scoped lang="scss">
    @import "../../../sass/site.scss";

    .banner {
    display: flex;
    position: relative;
    min-height: 560px;
    background-color: #070c1a;
    color: $white;

    .page-banner {
    line-height: 1.2;
    }

    #banner-heading-group {
    //   opacity: 0;
      transition: opacity 1600ms cubic-bezier(.29,.4,.15,.91) 100ms;

    //   &.site-loaded {
    //     opacity: 1;
    //   }
    }

    .banner-subheading {
    line-height: 1.4;
    font-size: 18px;
    max-width: 282px;
    }

    .banner-heading-inner {
    margin-left: -4px;
    }


    &--short {	
    min-height: 12rem;
    }
    &--full {	
    min-height: 100vh;
    }

    &__inner {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    }

    &__image {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    &::after {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
    }

    &.banner-overlay-none::after {
        display: none;
    }
    &.banner-overlay-light::after {
        background: rgba(45, 97, 174, 90%);
    }
    &.banner-overlay::after {
        background-color: rgba(45, 97, 174, 80%);
        mix-blend-mode: multiply;
    }
    &.banner-overlay-dark::after {
        background: rgba(45, 97, 174, 70%);
    }
    }


    @include above( sm ) {
    min-height: 700px;

    .banner-subheading {
        font-size: 24px;
        max-width: 353px;
    }

    }

    @include above( md ) {
    min-height: 865px;

    .banner-subheading {
        max-width: 420px;
    }

    }

    @include above( 996px ) {

    .banner-subheading {
        max-width: none;
    }

    }
    }


    // START banner styling \\
    .page-banner {
    font-size: 60px;

    @include above( sm ) {
        font-size: 75px;
    }

    @include above( md ) {
        font-size: 90px;
    }
    }


    .banner-inner {
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
    max-height: 500px;
    padding-bottom: 56px;

    &:after {
        content: "";
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 140px;
        height: 2px;
        background-color: $primary;
    }

    .pseudo-line {
        height: 0px;
        width: 23px;
        position: absolute;
        bottom: 0px;
        left: 152px;
        border-bottom: 2px solid $primary;
    }

    @include above( sm ) {
        padding: 0 0 56px 56px;

        &:before {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 15px;
            height: 100%;  
            border-left: 2px solid $primary;
            border-right: 2px solid $primary;
        }

    }

    @include above( md ) {
        padding: 56px;
    }
    }
    // END banner styling \\
</style>