<template>
  <p :is="tag" :class="className"><slot></slot></p>
</template>

<script>
import classNames from 'classnames';

const CardText = {
  props: {
    tag: {
      type: String,
      default: "p"
    }
  },
  computed: {
    className() {
      return classNames(
        'card-text'
      );
    }
  }
};

export default CardText;
export { CardText as mdbCardText };
</script>

<style scoped>
</style>
