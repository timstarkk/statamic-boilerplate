<template>
<header id="header" class="header">
	<div class="header__inner wrapper">

	<a id="logo" class="header__logo logo" href="/" :title="siteName + ` | Home`">
      <img src="../../../svg/logo.svg" alt="logo">
	</a> <!-- END header__logo -->

	<div class="filler"></div>

	<!-- <nav class="header__nav nav">

		<a  v-for="link in nav" :key="link.id" class="nav__link link" :href="link.url">
			<span class="meta meta-fix">{{ link.title }}</span>
		</a>
	

	</nav> END header__nav -->
	
	<button :class="['menu-button', `${menuState}Class`]" @click="clickButton">
		<span class="menu-button__bar"></span>
		<span class="menu-button__bar"></span>
		<span class="menu-button__bar"></span>
	</button> <!-- END menu-button -->

	<transition  name="fade">
        <div id="menu" class="menu js--modal" v-show="show">
            <div class="menu__inner wrapper">
                <nav class="menu__nav">

                    <a v-for="link in nav" :key="link.id" class="menu__link link" :href="link.slug">{{ link.title }}</a>
                            

                    <a v-if="sitePhone" class="menu__cta link" :href="'tel: ' + sitePhone">
                        <span class="text cta-title">PHONE</span>
                        <span class="text cta-description">{{ sitePhone }}</span>
                    </a>

                    <a v-if="siteEmail" class="menu__cta link" :href="'mailto: ' + siteEmail">
                        <span class="text cta-title">EMAIL</span>
                        <span class="text cta-description email-padding">Email Us</span>
                    </a>
                </nav>
            </div>
        </div> <!-- END menu -->
    </transition>

	</div> <!-- END header__inner -->
</header>

</template>

<script>

export default {
    data() {
      return {
        show: false,
        menuState: 'inactive'
      }
    },

    props: {
        siteName: {
            type: String,
            default: null
        },
        nav: {
            type: Array,
            default: null
        },
        themeOutput: {
            type: String,
            default: null
        },
        sitePhone: {
            type: String,
            default: null
        },
        siteEmail: {
            type: String,
            default: null
        }
    },

    // mounted: function () {
    //     let _this=this;

    //     setTimeout(function(){
    //         _this.$nextTick(function(){_this.width="100%"})
    //     },0);

    // },

    methods: {
        handleMenuAnimation: function(opening) {
            let menu = document.getElementById('menu');

            if (opening) {
            console.log('open');
            menu.classList.add('open-menu');
            } else {
            console.log('closing');
            menu.classList.remove('open-menu');
            }
        },
        clickButton: function(){
            this.show = !this.show;

            if( this.menuState === 'inactive') {
                this.menuState = 'active';
            } else {
                this.menuState = 'inactive';
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../../sass/site.scss";
    ////////////////////////////////////////////////
    // START transitions
    //
        .fade-enter-active, .fade-leave-active { // transitions applied directly to element will override this
            transition: opacity 0.7s ease-in-out;
        }

        .fade-enter, .fade-leave-to {
            opacity: 0;
        }

        .slide-enter-active, .slide-leave-active {
            transition: all 0.7s cubic-bezier(0.46, 0.01 , 0.32, 1);
        }

        .slide-enter {
            opacity: 0;
            transform: translateX(8rem);
        }

        .slide-leave-to {
            opacity: 0;
            transform: translateX(-8rem);
        }
    //
    // END transitions
    ////////////////////////////////////////////////

    /*
    |––––––––––––––––––––––––––––––––––––––––––––––––––
    | COMPONENTS: Site Header 
    |––––––––––––––––––––––––––––––––––––––––––––––––––
    */

    /* ===== VARIABLES ===== */

    $menu_bg: $contrast;
    $menu_color: $white;
    $menu_time: 300ms;

    // this is the space between the nav items and the top and bottom when the height is smaller than the nav
    $menu_buffer: 1em;

    $header_height: 200px;

    /* ===== LAYOUT ===== */

    .menu {
    // opacity: 0;
    // pointer-events: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    flex-flow: column;
    background-color: $menu_bg;
    padding: 0 30px;
    padding-top: 147px;
    line-height: 1;
    font-size: 2.4rem;
    transition: all .3s ease-in-out;
    visibility: visible;

    // &.open-menu {
    //     // visibility: visible;
    //     opacity: 1;
    //     pointer-events: all;
    // }


    // These ::before and ::afters are for fading the nav items
    // top and bottom as you scroll through them.
    &:before,
    &:after {
        position: absolute;
        z-index: 9;
        left: 0;
        width: 100%;
        min-height: $menu_buffer;
        content: '';
    }

    &:before {
        top: $header_height;
        // background: linear-gradient(rgba($menu_bg, 1) 0%, 
        //                             rgba($menu_bg, 0) 100%);
    }

    &:after {
        bottom: 0;
        background: linear-gradient(rgba($menu_bg, 0) 0%, 
                                    rgba($menu_bg, 1) 100%);
    }

    &__inner {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;

        // these match the fading buffers for the main nav
        &::before,
        &::after {
        display: block;
        opacity: 0;
        width: 100%;
        min-height: $menu_buffer;
        content: '';
        // pointer-events: none;
        }
    }

    /* === NAVIGATION LINKS === */
    &__nav {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        margin: -0.8rem;
        padding-left: 27px;
        z-index: 10;
    }

    &__link {
        display: inline-flex;
        padding: 0.7rem;
        text-transform: capitalize;
        font-family: $pt_serif;
        font-weight: normal;
        font-size: 36px;
        color: $primary;

        .icon {
        &:first-child {
            margin-right: 0.5em;
        }
        &:last-child {
            margin-left: 0.5em;
        }
        }
    }

    &__cta {
        display: inline-flex;
        margin-top: 42px;
        margin-bottom: 13px;
        padding-left: 16px;
        text-transform: capitalize;
        font-weight: normal;

        .cta-title {
        font-family: $pt_serif;
        color: $primary;
        font-size: 14px;
        }

        .cta-description {
        font-size: 16px;
        color: #d6d6d6;
        font-family: $sans_serif;
        padding-left: 29px;

        &.email-padding {
            padding-left: 33px;
        }
        }

        &:last-child {
        margin-top: 0;
        }
    }

    // ANIMATIONS
    @keyframes open_menu {
        from {
        opacity: 0;
        // transform: scale(1.05);
        }
        to {
        opacity: 1;
        // transform: scale(1);
        }
    }

    @keyframes close_menu {
        from {
        opacity: 1;
        // transform: scale(1);
        }
        to {
        opacity: 0;
        // transform: scale(1.05);
        }
    }

    // ACTIVE STATES
    // &[data-state="active"] {
        // 	// visibility: visible;
    //   // display: flex;
    //   // opacity: 1;
    //   display: flex;
    // }

    // &[data-state="deactivating"] {
    //   // animation: close_menu $menu_time ease-in-out;
        // 	// visibility: visible;
    //   // display: flex;
    //   display: flex;
    //   visibility: visible;
    // }

    // // &[data-state="inactive"] {
        // // 	// visibility: hidden;
    // //   // display: flex;
    // // }

    // &[data-state="activating"] {
    //   // animation: open_menu $menu_time ease-in-out;
    //   // display: flex;
    //   // opacity: 1;
    //   display: flex;
    //   visibility: visible;
    // }
    }



    /* === MENU BUTTON === */
    .menu-button {
    $self: &;
    display: block;
    z-index: 99;
    outline: none;
    border: none;
    border-radius: 50%;
    width: 2em;
    height: 2em;
    background-color: transparent;
    padding: 0.5em;
    // font size canges the whole size
    font-size: 24px;
    color: inherit;
    transition: background-color $menu_time ease;
    cursor: pointer;

    &__bar {
        display: block;
        position: absolute;
        top: 0;
        right: 0.5em;
        height: 3px;
        background-color: currentColor;
        transition: all $menu_time ease;

        &:nth-child(1) {
        top: calc(0.5em);
        bottom: unset;
        width: 32px;
        align-self: flex-end;
        }
        &:nth-child(2) {
        top: calc(1em - 3px);
        bottom: unset;
        width: 38px;
        }
        &:nth-child(3) {
        top: unset;
        bottom: calc(0.5em);
        width: 26px;
        }
    }
    
    // HOVER STATES
    &:hover,
    &:focus {
        // background-color: rgba(255, 255, 255, 0.1);
        color: $white;
    }

    // ACTIVE STATES
    &.activeClass {
        visibility: visible;
        color: $white;

        #{$self}__bar {
        visibility: visible;

        &:nth-child(1) {
            top: calc(1em - 3px);
            transform: rotate(45deg);
            width: 37px;
            left: 6px;
        }
        &:nth-child(2) {
            opacity: 0;
            width: 1em;
        }
        &:nth-child(3) {
            bottom: calc(1em - 3px);
            transform: rotate(-45deg);
            width: 37px;
            left: 6px;
        }
        }
    }

    &.inactiveClass {
        visibility: visible;

        #{$self}__bar {
        visibility: visible;

        &:nth-child(1) {
            transform: rotate(0);
        }
        &:nth-child(2) {
            opacity: 1;
        }
        &:nth-child(3) {
            transform: rotate(0);
        }
        }
    }
    }
</style>