<template>
    <div class="question-wrapper">
        <div class="question-title" :style="titleStyle">{{title.text}}</div>
        <div class="question-hint-line">
            调查
        </div>
        <div class="question-list">
            <div class="question-item" v-for="(item, index) in question" :key="index" ref="question">
                <div class="question-item_title">
                    <span class="question-item_require" v-if="item.require">*</span>
                    {{index + 1}}.{{item.title}}
                    <span class="question-item_mulit" v-if="item.type === 1">【多选题】</span>
                </div>
                <!-- single -->
                <div class="question-item_options" v-if="item.type === 0">
                    <div class="question-item_option" v-for="(i, idx) in item.options" :key="idx" @click="selectOptions($event, idx, item.type, index)">
                        <div class="question-item_box" :class="{'active': idx === question[index].checked}"></div>
                        <label class="question_item_option_label">{{i.label}}</label>
                    </div>
                </div>
                <!-- mulit -->
                <div class="question-item_options" v-if="item.type === 1">
                    <div class="question-item_option" v-for="(i, idx) in item.options" :key="idx" @click="selectOptions($event, idx, item.type, index)">
                        <div class="question-item_box"></div>
                        <label class="question_item_option_label">{{i.label}}</label>
                    </div>
                </div>
                <!-- text -->
                <div class="question-item_options" v-if="item.type === 2">
                    <div class="question-item_option">
                        <input class="question_item_option_input text" type="text" v-model="question[index].checked">
                    </div>
                </div>
                <div class="question-item_hint">
                    {{item.hint}}
                </div>
            </div>
        </div>
        <div class="question-submit" @click="submitQuestion">
            提交
        </div>
        <div class="question-bottom">
            ccc 提供技术支持
        </div>
    </div>
</template>

<script>
let log = console.log.bind(console);

const TYPE_SING = 0;
const TYPE_MULIT = 1;
const TYPE_TEXT = 2;
const DEFAULT_HINT = '本条目不能为空';

export default {
  data () {
    return {
      title: {
        text: '震惊！！！以后装饰公司再也不用愁没装修业主啦！！！',
        color: '#1ea0fa',
        fontSize: '24px'
      },
      question: [
        // 1
        {
          title: '贵装修公司用什么渠道挖掘业主订单？',
          require: true,
          type: TYPE_MULIT,
          checked: [],
          hint: DEFAULT_HINT,
          options: [
            {
              label: '业务员挖单'
            },
            {
              label: '熟人转介绍'
            },
            {
              label: '网络平台接单'
            }
          ]
        },
        // 2
        {
          title: '公司目前有在做网络推广吗？',
          require: true,
          type: TYPE_MULIT,
          checked: [],
          hint: DEFAULT_HINT,
          options: [
            {
              label: '有'
            },
            {
              label: '没有'
            }
          ]
        },
        // 3
        {
          title:
            '如果合作装修平台，可以让你一年多上百个，都是一个星期之内量房，一个月内准装修的客户你有兴趣接触吗？',
          require: true,
          type: TYPE_MULIT,
          checked: [],
          hint: DEFAULT_HINT,
          options: [
            {
              label: '没有兴趣'
            },
            {
              label: '有兴趣'
            },
            {
              label: '非常有兴趣'
            }
          ]
        },
        // 4
        {
          title: '贵公司名称（城市+名称）',
          require: true,
          type: TYPE_TEXT,
          checked: '',
          hint: DEFAULT_HINT,
          valid: [
            {
              reg: new RegExp('^.+[+]{1}.+$'),
              text: '请按照格式填写， 例如：xx+xx公司'
            }
          ]
        },
        // 5
        {
          title: '接单预算',
          require: true,
          type: TYPE_MULIT,
          checked: [],
          hint: DEFAULT_HINT,
          options: [
            {
              label: '5-15万'
            },
            {
              label: '15-30万'
            },
            {
              label: '有利润就可以做'
            }
          ]
        },
        // 6
        {
          title: '设计师人数',
          require: true,
          type: TYPE_MULIT,
          checked: [],
          hint: DEFAULT_HINT,
          options: [
            {
              label: '3人以内'
            },
            {
              label: '3-6人'
            },
            {
              label: '7-10人'
            },
            {
              label: '10人以上'
            }
          ]
        },
        // 7
        {
          title: '对于网络接单合作有想法的留下联系方式',
          require: true,
          type: TYPE_TEXT,
          checked: '',
          hint: DEFAULT_HINT,
          valid: [
            {
              reg: new RegExp('^1[3458][0-9]{9}$'),
              text: '请输入符合正确格式的手机号码'
            }
          ]
        }
      ]
    };
  },
  computed: {
    titleStyle () {
      return `color:${this.title.color};font-size:${this.title.fontSize}`;
    }
  },
  methods: {
    submitQuestion () {
      let answer = [];
      this.question.forEach((q, idx) => {
        if (q.require) {
          let val = q.checked + '';
          if (!val.length) {
            q.hint = DEFAULT_HINT;
            this.$refs.question[idx].classList.add('hint');
          } else {
            let flag = true;
            if (q.valid && q.valid.length) {
              for (let i = 0; i < q.valid.length; i++) {
                if (!q.valid[i].reg.test(val)) {
                  flag = false;
                  q.hint = q.valid[i].text;
                  break;
                }
              }
            }
            if (!flag) {
              this.$refs.question[idx].classList.add('hint');
            } else {
              answer.push(q.checked);
              this.$refs.question[idx].classList.remove('hint');
            }
          }
        } else {
          answer.push('');
          this.$refs.question[idx].classList.remove('hint');
        }
      });
      if (answer.length !== this.question.length) {
        alert('您有必填选项未选或填写格式错误，请检查后再次尝试提交。');
        return;
      }
      this.postData(answer);
    },
    postData (data) {
      log(data);
    },
    selectOptions (e, optionIdx, type, index) {
      let itemBox = e.currentTarget.querySelector('.question-item_box');
      if (type === TYPE_MULIT) {
        this.selectMulit(itemBox, optionIdx, index);
      } else if (type === TYPE_SING) {
        this.selectSingle(itemBox, optionIdx, index);
      }
    },
    selectSingle (itemBox, optionIdx, index) {
      if (itemBox) {
        this.question[index].checked = optionIdx;
      }
    },
    selectMulit (itemBox, optionIdx, index) {
      if (itemBox) {
        itemBox.classList.toggle('active');
        let checked = this.question[index].checked.slice();
        let i = checked.indexOf(optionIdx);
        if (i > -1) {
          checked.splice(i, 1);
        } else {
          checked.splice(optionIdx, 0, optionIdx);
        }
        this.$set(this.question[index], 'checked', checked);
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
.question-wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.question-title {
  text-align: center;
  margin: 20px;
  font-weight: bold;
  line-height: 32px;
  flex-basis: 32px;
}

.question-hint-line {
  padding: 10px 0 26px;
  margin: 0 10px 16px;
  border-bottom: 1px dashed #ccc;
  flex-basis: 21px;
}
.question-list {
  flex: 1;
  padding: 10px 14px;
  margin-top: 35px;
}
.question-item {
  box-sizing: border-box;
  margin: 5px;
  padding: 5px;
  border: 1px solid transparent;
}
.question-item.hint {
  border: 1px dashed red;
}
.question-item.hint .question-item_hint {
  opacity: 1;
}
.question-item_title {
  position: relative;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
}
.question-item_require {
  position: absolute;
  top: 2px;
  left: 5px;
  color: red;
}

.question-item_mulit {
  margin-left: 10px;
  font-weight: normal;
  color: #999;
}
.question-item_options {
  margin: 20px 0;
  border: 1px solid #ccc;
}
.question-item_option {
  padding: 15px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.question-item_option:last-child {
  border-bottom: none;
}

.question-submit {
  text-align: center;
  height: 43px;
  line-height: 43px;
  color: white;
  background: #1ea0fa;
  border-radius: 5px;
  margin: 25px 25px;
  cursor: pointer;
  flex-basis: 43px;
}

.question-bottom {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #999;
  font-size: 14px;
  background-color: #f0f0f0;
  flex-basis: 50px;
}

/* 之定义多选单选选择框样式 */
.question-item_box {
  display: inline-block;
  width: 21px;
  height: 21px;
  vertical-align: middle;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.question-item_box.active {
  background: url(./check.png) no-repeat center;
  background-size: 21px 21px;
  border: 1px solid #1ea0fa;
}

.question_item_option_label {
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}
.question_item_option_input.text {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
}

.question-item_hint {
  background-color: #ffe5e0;
  color: red;
  padding-left: 12px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 38px;
  opacity: 0;
}
</style>
