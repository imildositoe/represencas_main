<template>
  <div :is="tag" :class="className"><slot></slot></div>
</template>

<script>
import classNames from 'classnames';

const CardUp = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    color: {
      type: String
    },
    gradient: {
      type: String
    }
  },
  computed: {
    className() {
      return classNames(
        'card-up',
        this.color ? this.color + '-color' : '',
        this.gradient ? this.gradient + '-gradient' : ''
      );
    }
  }
};

export default CardUp;
export { CardUp as mdbCardUp };
</script>

<style scoped>
</style>
