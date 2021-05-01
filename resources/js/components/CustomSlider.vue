<template>
  <section class="block bg-contrast slider-section gutter">
      <div class="slider-wrapper wrapper">

                <div 
                v-for="(item, index) in items" 
                :key="item.id"
                v-show="index === selectedIndex"
                class="noselect">

                    <div class="slider-container" v-touch:swipe.left="showNextSlide" v-touch:swipe.right="showPreviousSlide">
                        <div class="custom-slider-left">

                            <div class="slider-image-container">
                                    <transition name="fade" mode="out-in">
                                        <img class="slider-image" :src="items[selectedIndex].image.url" :alt="items[selectedIndex].image" :key="selectedIndex">
                                    </transition>
                                    <progress-ring class="prog-ring" :radius="86" :progress="progress" :stroke="4" :intervalAmount="slideInterval" />
                                    <div class="slider-image-behind"></div>
                                <div class="image-accompaniments"></div>
                            </div>

                            <div class="slider-details">
                                <transition name="fade" mode="out-in">
                                    <p class="slider-name" :key="selectedIndex">
                                        {{ `${items[selectedIndex].name}` }}
                                    </p>
                                </transition>
                                <transition name="fade" mode="out-in">
                                    <p class="slider-company" :key="selectedIndex">
                                        {{ `${items[selectedIndex].company}` }}
                                    </p>
                                </transition>
                            </div>
                        </div>
                        <div class="custom-slider-right">


                            <transition name="slide" mode="out-in">
                                <h1 class="slide-comments" :key="selectedIndex">
                                    {{ `${items[selectedIndex].comments}` }}
                                </h1>
                            </transition>

                            <div class="all-dots-container">
                                <div class="single-dot-container" v-for="(item, index) in items" :key="item.id" v-on:click="handleDotClick($event, index)">
                                    <div class="slider-dot" :class="{ selected: index === selectedIndex }"></div>
                                </div>
                            </div>

                            <!-- // next slide button \\ -->
                            <div class="next-slide-button" v-on:click="showNextSlide()">
                                <!-- <p>></p> -->
                                <img :src="arrowSVG">
                            </div>
                        </div>
                    </div>

                </div>

      </div>
  </section>
</template>

<script>
import ProgressRing from './ProgressRing';

export default {

    data() {
        return {
            selectedIndex: 0,
            slideCount: 0,
            slideInterval: 6000,
            show: false,
            isSelected: true,
            intervalId: -1,
            intervalId2: -1,
            circumference: 0,
            progress: 0,
            arrowSVG: require('../../svg/chevron-right.svg'),
            progressions: 0
        }
    },

    props: ["items"],

    components: {
        ProgressRing
    },

    created: function() {
        this.slideCount = this._props.items.length;
    },

    mounted: function() {
        this.autoplay();
        this.increaseProgress();
    },

    methods: {
        autoplay: function () {
            
            if (this.intervalId != -1) {
                clearInterval(this.intervalId);
            }

            this.intervalId = setInterval(function () {

                // reset selectedIndex after last slide
                if( this.selectedIndex >= this.slideCount - 1 ) {
                    this.selectedIndex = -1;
                }
                
                // increment selected index
                this.selectedIndex ++

                // reset progress
                this.progress = 0;
            }.bind(this), this.slideInterval);
        },
        handleDotClick: function (e, index) {
            // set selected to clicked dot's position
            this.selectedIndex = index;

            // reset progress, autoplay and interval timer
            this.progress = 0;
            this.autoplay();
        },
        showNextSlide: function () {
            if (this.selectedIndex >= this.slideCount -1) {
                // set selected Index to first slide
                this.selectedIndex = 0;

                // reset progress, autoplay and interval timer
                this.progress = 0;
                this.autoplay();
            } else {
                // increment selected index
                this.selectedIndex ++

                // reset progress, autoplay and interval timer
                this.progress = 0;
                this.autoplay();
            }
        },
        showPreviousSlide: function () {
            if (this.selectedIndex === 0) {
                // set selected Index to first slide
                this.selectedIndex = this.slideCount -1;

                // reset progress, autoplay and interval timer
                this.progress = 0;
                this.autoplay();
            } else {
                // increment selected index
                this.selectedIndex --;

                // reset progress, autoplay and interval timer
                this.progress = 0;
                this.autoplay();
            }
        },
        increaseProgress: function () {
            const interval = setInterval(() => {
                this.progress ++;
                
                if (this.progress === 100) {
                    clearInterval(interval);
                    this.progress = 0;
                    this.increaseProgress();
                }

            }, this.slideInterval / 100);
        }
    },
};
</script>

<style scoped lang="scss">
@import "../../sass/site.scss";

////////////////////////////////////////////////
// START transitions
//
.fade-enter-active, .fade-leave-active {
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

.slider-section {
    // padding-left: 30px;
    // padding-right: 30px;
    padding-top: 60px;
    padding-bottom: 151px;
    
    @include above( sm ) {
        padding-top: 96px;
        padding-bottom: 223px;
    }
    
    @include above( md ) {
        padding-top: 128px;
        padding-bottom: 287px;
    }

    @include above( 799px ) {
        padding-top: 168px;
        padding-bottom: 200px;
    }

    @include above( lg ) {
        padding-bottom: 260px;
    }
}

.slider-wrapper {
    display: flex;

    @include above( 799px ) {
        height: 217px;
    }
}

.slider-container {
    max-width: 1180px;
    background-color: #0f1e39;
    display: flex;
    flex-direction: column-reverse;

    @include above( 799px ) {
        flex-direction: row;
        height: 217px;
    }
}

.custom-slider-left {
    width: 100%;
    max-height: 217px;
    position: relative;
    // overflow: hidden;

    .slider-image-container {
        height: 217px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        // padding-top: 46px;

        .image-accompaniments {
            width: 228px;
            height: 8px;
            border-bottom: 2px solid #9c8a5a;
            -webkit-transform:
                rotate(135deg); 
            position: absolute;
            /* top: -20px; */
        }
    }

    .slider-image {
        height: 152px;
        width: 152px;
        border-radius: 50%;
        max-width: 217px;
        object-fit: cover;
        object-position: 50% 50%;
        z-index: 21;
    }

    .slider-image-behind {
        height: 151px;
        width: 151px;
        border-radius: 50%;
        max-width: 217px;
        z-index: 19;
        background-color: #0f1e39;
        position: absolute;
    }

    .slider-details {
        display: flex;
        flex-direction: column;
        padding: 18px 18px 30px 18px;
        margin-bottom: 48px;
        text-transform: capitalize;
        background-color: #0f1e39;
        align-items: center;

        .slider-name {
            font-size: 18px;
            color: #9c8a5a;
            line-height: 160%;
        }

        .slider-company {
            font-size: 14px;
            line-height: 100%;
        }
    }

    .prog-ring {
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 18;
    }

    @include above( 799px ) {
        min-width: 217px;
        max-width: 217px; 
        background-color: #9c8a5a;
        border-bottom: 2px solid #112B4A;

        .slider-image-container {
            height: 217px;  
            padding-top: 0;
            position: relative;

            .image-accompaniments {
                border-bottom: 2px solid #0f1e39;
            }

            &:after {
                position: absolute;
                content: "";
                width: 0px;
                height: 0px;
                border-top: 28px solid #0f1e39;
                border-right: 28px solid transparent;
                border-bottom: 28px solid transparent;
                border-left: 28px solid transparent;
                top: -29px;
                right: -29px;
                -webkit-transform:
                    rotate(225deg); 
            }
        }
        
        .slider-image-behind {
            height: 151px;
            width: 151px;
            border-radius: 50%;
            max-width: 217px;
            z-index: 19;
            background-color: #9c8a5a;
            position: absolute;
        }

        .slider-image {
            height: 152px;
            width: 152px;
        }
        
        .slider-image-behind {
            background-color: #9c8a5a;
        }
        

        .slider-details {
            background-color: transparent;
            padding: 10px 18px 10px 18px;
            border-bottom: 2px solid #112B4A;
            align-items: flex-start;
        }
    }
}

.custom-slider-right {
    padding: 60px 30px 30px 30px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    overflow-x: hidden; 
    overflow-y: hidden;
    justify-content: center;

    .next-slide-button {
        position: absolute;
        right: 0px;
        bottom: 0px;
        height: 46px;
        width: 46px;
        background-color: #11213e;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        color: #9c8a5a;
        display: none;

        &:hover {
            cursor: pointer;
        }
    }

    .slide-comments {
        font-size: 30px;
        color: #9c8a5a;
        max-width: 830px;
    }

    @include above( sm ) {
        padding: 54px 50px 50px 50px;
    }

    @include above( 799px ) {
        // padding: 50px;

        .next-slide-button {
            display: flex;
        }
    }
}

.all-dots-container {
    height: 46px;
    position: absolute;
    bottom: 0px;
    right: 46px;
    align-items: center;
    margin-right: 20px;
    display: none;

    .single-dot-container {
        height: 30px;
        width: 22px;
        display: flex;
        justify-content: center;
        align-items: center;

        .slider-dot {
            height: 8px;
            width: 8px;
            background-color: #152747;
            border-radius: 50%;
            display: inline-block;

            &.selected {
                background-color: #9c8a5a;
            }
        }

        &:hover {
            cursor: pointer;
        }
    }
    
    @include above( 799px ) {
        display: flex;
    }
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>