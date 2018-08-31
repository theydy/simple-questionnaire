<template>
  <div class="question" :class="{'valid-error': !validError }">
    <div class="title">
      <span class="require" v-if="required">*</span>
      {{index + 1}}.{{content}}
      <span class="mulit-hint" v-if="mulitHint">【多选题】</span>
    </div>
    <component
      :is="getComponentName"
      :options="options"
      :checked-value="checkedValue"
      @change-value="changeValue"
    ></component>
    <div class="valid-hint">
      {{currentHint}}
    </div>
  </div>
</template>

<script>
const TYPE_SING = 0;
const TYPE_MULIT = 1;
const TYPE_TEXT = 2;

export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: TYPE_SING
    },
    hint: {
      type: String,
      default: '此条目不能为空'
    },
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
    },
    valid: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      answer: '',
      currentHint: '',
      validError: true
    };
  },
  computed: {
    mulitHint () {
      return this.type === TYPE_MULIT;
    },
    getComponentName () {
      let type = {
        [TYPE_SING]: 'ThisRadiobox',
        [TYPE_MULIT]: 'ThisCheckbox',
        [TYPE_TEXT]: 'ThisInput'
      }
      return type[this.type];
    }
  },
  components: {
    ThisCheckbox: () => import('@/components/this-checkbox/this-checkbox'),
    ThisRadiobox: () => import('@/components/this-radiobox/this-radiobox'),
    ThisInput: () => import('@/components/this-input/this-input')
  },
  methods: {
    changeValue (value) {
      this.answer = value;
      this.validData()
    },
    validData () {
      if (this.type === TYPE_MULIT || this.type === TYPE_SING) {
        this.validError = this.validDataCheck();
      } else {
        this.validError = this.validDataText();
      }
    },
    validDataCheck () {
      if (!this.required) {
        return true;
      }
      if (this.answer === '' || this.answer.length === 0) {
        this.currentHint = this.hint;
        return false;
      }
      return true;
    },
    validDataText () {
      if (this.answer === '') {
        if (!this.required) {
          return true;
        } else {
          this.currentHint = this.hint;
          return false;
        }
      }
      let flag = true;
      if (this.valid.length) {
        for (let i = 0; i < this.valid.length; i++) {
          if (!this.valid[i].reg.test(this.answer)) {
            this.currentHint = this.valid[i].text || '验证错误';
            flag = false;
            break;
          }
        }
      }
      return flag;
    },
    submit () {
      this.validData();
      if (this.validError) {
        this.$emit('returnAnswer', this.answer);
      }
    }
  }
};
</script>

<style scoped>
.question {
  box-sizing: border-box;
  margin: 5px;
  padding: 5px;
  border: 1px solid transparent;
}
.question.valid-error {
  border: 1px dashed red;
}
.title {
  position: relative;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
}
.require {
  position: absolute;
  top: 2px;
  left: 5px;
  color: red;
}
.mulit-hint {
  margin-left: 10px;
  font-weight: normal;
  color: #999;
}
.valid-hint {
  background-color: #ffe5e0;
  color: red;
  padding-left: 12px;
  border-radius: 4px;
  font-size: 12px;
  height: 38px;
  line-height: 38px;
  opacity: 0;
}
.valid-error .valid-hint {
  opacity: 1;
}
</style>
