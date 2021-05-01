<template>  
    <svg :height="radius * 2"
         :width="radius * 2"
         class="circle-svg">

        <circle
        class="progress-ring__circle"
        stroke="#B9A674"
        fill="transparent"
        :stroke-dasharray="circumference + ' ' + circumference"
        :style="{ strokeDashoffset }"
        :stroke-width="stroke"
        :r="normalizedRadius"
        cx="50%"
        cy="50%"/>

    </svg>
</template>

<script>

export default {
    props: {
        radius: Number,
        progress: Number,
        stroke: Number,
        intervalAmount: Number
    },
    data() {
        const normalizedRadius = this.radius - this.stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;

        return {
            normalizedRadius,
            circumference,
        };
    },
    updated: function () {
        this.watchTransition();
    },
    computed: {
        strokeDashoffset() {
            return this.circumference - this.progress / 100 * this.circumference;
        }
    },
    methods: {
        watchTransition: function () {
            const circles = document.querySelectorAll('.progress-ring__circle');
        
            if (this.progress === 1) {
                for(const [index, item] of circles.entries()) {
                    circles[index].style.transition = `stroke-dashoffset 0.15s`;
                }
            }
            else if (this.progress === 99) {
                for(const [index, item] of circles.entries()) {
                    circles[index].style.transition = `stroke-dashoffset 0s`;
                }
            }
        }
    }
};

</script>

<style scoped lang="scss">

    .circle-svg {
        height: 217px;
        max-width: 100%;

        circle {
            max-width: 100%;
            max-height: 100%;
            z-index: 19;
            transition: stroke-dashoffset 0.35s;
            transform: rotate(-46deg);
            transform-origin: 50% 50%,
        }

    }
</style>