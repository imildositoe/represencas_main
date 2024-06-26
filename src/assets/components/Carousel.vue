<template>
  <div :is="tag" :class="className">
    <carousel-navigation v-if="showControls && multi" top @changeSlide="handleChangeSlide"></carousel-navigation>
    <carousel-indicators v-if="showIndicators && !thumbnails">
      <div v-for="(item, index) in items" :key="index">
        <carousel-indicator :index="index" :active="active(index)" @changeSlide="handleChangeSlide"/>
      </div>
    </carousel-indicators>
    <carousel-indicators v-if="showIndicators && thumbnails">
      <div v-for="(item, index) in items" :key="index">
        <carousel-indicator :index="index" :active="active(index)" @changeSlide="handleChangeSlide" :src="thumbnailsSrc[index]" />
      </div>
    </carousel-indicators>
    <carousel-inner>
      <slot></slot>
    </carousel-inner>
    <carousel-navigation :testimonial="testimonial" v-if="showControls && !multi" @changeSlide="handleChangeSlide"></carousel-navigation>
  </div>
</template>

<script>
import classNames from 'classnames';
import CarouselNavigation from './CarouselNavigation';
import CarouselInner from './CarouselInner';
import CarouselIndicators from './CarouselIndicators';
import CarouselIndicator from './CarouselIndicator';

const Carousel ={
  components: {
    CarouselNavigation,
    CarouselInner,
    CarouselIndicators,
    CarouselIndicator
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },
    interval: {
      type: [Number, Boolean],
      default: 10000
    },
    full: {
      type: Boolean,
      default: false
    },
    half: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    },
    multi: {
      type: Boolean,
      default: false
    },
    thumbnails: {
      type: Boolean,
      default: false
    },
    testimonial: {
      type: Boolean,
      default: false
    },
    showIndicators: {
      type: Boolean
    },
    showControls: {
      type: Boolean
    },
    slide: {
      type: Boolean
    }
  },
  data() {
    return {
      page: 0,
      items: [],
      thumbnailsSrc: []
    };
  },
  methods: {
    slideEffect() {
      let page = this.page;
      this.items.forEach(function(item, index) {
        let slideIndex = page - index;
        if (slideIndex < 0) {
          item.style.position = 'absolute';
          item.style.left = '100%';
        } else if (slideIndex > 0) {
          item.style.position = 'absolute';
          item.style.left = '-100%';
        } else {
          item.style.position = 'relative';
          item.style.left = 0;
        }
      });
    },
    changeSlide(index) {
      if (this.slide) {
        this.page = index;
        this.slideEffect();
      } else {
        this.items[this.page].classList.remove('active');
        this.page = index;
        this.items[this.page].classList.add('active');
      }
    },
    slidePage(target) {
      if (target === "next") {
        if (this.page < this.itemsNumber) {
          this.changeSlide(this.page + 1);
        } else {
          this.changeSlide(0);
        }
      } else if (target === "prev") {
        if (this.page == 0) {
          this.changeSlide(this.itemsNumber);
        } else {
          this.changeSlide(this.page - 1);
        }
      } else {
        this.changeSlide(target);
      }
    },
    autoSlide() {
      this.startSlide = setInterval(() => {
        this.slidePage('next');
      }, this.interval);
    },
    handleChangeSlide(showSlide) {
      this.slidePage(showSlide.slideIndex);
      clearInterval(this.startSlide);
      this.autoSlide();
    },
    active(index) {
      if (index == this.page) return true;
    }
  },
  mounted() {
    let items = [];
    let thumbnails = [];
    let itemsNumber = 0;
    this.$slots.default.forEach(function(slot){
      if (slot.elm.nodeType !== 3) {
        items.push(slot.elm);
        thumbnails.push(slot.componentInstance.src);
        itemsNumber++;
      }
    });
    this.items = items;
    this.itemsNumber = itemsNumber - 1;
    this.thumbnailsSrc = thumbnails;
    if (this.slide) {
      this.items.forEach(function(item, index) {
        item.classList.add('active', 'carousel-slide-item');
      });
      this.slideEffect();
    } else {
      this.items[this.page].classList.add('active');
    }
    this.autoSlide();
  },
  computed: {
    className() {
      return classNames(
        'carousel',
        this.half && 'half',
        this.full && 'full',
        this.fade && 'carousel-fade',
        this.multi && 'carousel-multi-item',
        this.thumbnails && 'carousel-thumbnails',
        this.testimonial && 'testimonial-carousel'
      );
    }
  },
};

export default Carousel;
export { Carousel as mdbCarousel };
</script>

<style>
.carousel-item {
  display: block !important;
  visibility: hidden;
  height: 0;
  opacity: 0.5;
  transition: transform 0ms ease-in-out, opacity .3s ease-in;
  transform: translate3d(0, 0, 0) !important;
}

.carousel-item.active {
  opacity: 1;
  left: auto;
  height: 100%;
  visibility: visible;
  transition: transform 0ms ease-in-out, opacity .3s ease-in;
  transform: translate3d(0, 0, 0) !important;
}

.carousel-multi-item .carousel-slide-item {
  transition: left 0.5s;
  top: 0;
}
</style>

<style scoped>
.full, .full .carousel-item{
  height: 100% !important;
}

.half {
  height: 50%;
}
</style>
