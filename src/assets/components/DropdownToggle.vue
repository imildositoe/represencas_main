<template>
  <button :is="tag" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :class="[className, {'ripple-parent': waves}]" @click.prevent="wave">
    <span :if="srOnly" class="sr-only">Toggle Dropdown</span>
    <slot></slot>
  </button>
</template>

<script>
import classNames from 'classnames';
import waves from '../mixins/waves';

const DropdownToggle = {
  props: {
    tag: {
      type: String,
      default: "button"
    },
    navLink: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "default"
    },
    outline: {
      type: String,
    },
    size: {
      type: String
    },
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    waves: {
      type: Boolean,
      default: true
    },
    wavesFixed: {
      type: Boolean,
      default: false
    },
    srOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className() {
      return classNames(
        this.navLink ? 'nav-link' : 'btn',
        this.outline ? 'btn-outline-' + this.outline : 'btn-' + this.color,
        this.size ? 'btn-' + this.size : '',
        this.block ? 'btn-block' : '',
        this.active ? 'active' : '',
        this.disabled ? 'disabled' : '',
        'dropdown-toggle'
      );
    }
  },
  mixins: [waves]
};

export default DropdownToggle;
export { DropdownToggle as mdbDropdownToggle };
</script>

<style scoped>
.btn {
  margin: 0;
}
</style>
