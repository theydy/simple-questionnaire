<template>
  <div class="input">
    <div class="options">
      <div class="option">
          <input class="text" type="text" v-model="value">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    };
  },
  watch: {
    value (newValue) {
      this.$emit('changeInputValue', newValue);
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
.text {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
}
</style>
