<template>
  <div class="radiobox">
    <div class="options">
      <div class="option"
        v-for="(item, index) in options"
        :key="index"
        @click="selectOption($event, index)"
      >
        <div class="box" :class="{'selected': selected === index}"></div>
        <label class="label">{{item.label}}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default () {
        return [];
      }
    },
    checkedValue: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      selected: ''
    };
  },
  methods: {
    selectOption ($event, index) {
      this.selected = index;
      this.$emit('change-value', this.checkedValue[this.selected]);
    }
  }
};
</script>

<style scoped>
.options {
  margin: 20px 0;
  border: 1px solid #ccc;
}
.option {
  padding: 15px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.option:last-child {
  border-bottom: none;
}
.box {
  display: inline-block;
  width: 21px;
  height: 21px;
  vertical-align: middle;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.box.selected {
  background: url(./check.png) no-repeat center;
  background-size: 21px 21px;
  border: 1px solid #1ea0fa;
}
.label {
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}
</style>
