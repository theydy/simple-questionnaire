<template>
    <div class="test">
      <div class="create-wrapper">
        <div class="show-list">
          <div class="question"
            v-for="(item, index) in question"
            :key="index"
          >
            <div class="title">
              {{index + 1}}.<input class="text" type="text" :value="item.content">
            </div>
            <template v-if="item.options">
              <div class="options">
                <div class="option"
                  v-for="(op, idx) in item.options"
                  :key="idx"
                >
                  <input class="text" type="text" :value="op.label">
                </div>
              </div>
            </template>
            <template v-else>
              <div class="options">
                <div class="option">
                  <input class="text" type="text">
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="operator">
          <button>单选题</button>
          <button>多选题</button>
          <button>问题题</button>
        </div>
      </div>
    </div>
</template>

<script>
const TYPE_SING = 0;
const TYPE_MULIT = 1;
const TYPE_TEXT = 2;
export default {
  components: {
    ThisQuestion: () => import('@/components/this-question/this-question')
  },
  data () {
    return {
      ret: [],
      question: [
        // 1
        {
          content: '贵装修公司用什么渠道挖掘业主订单？',
          required: true,
          type: TYPE_MULIT,
          checkedValue: [1, 2, 3],
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
          content: '公司目前有在做网络推广吗？',
          required: true,
          type: TYPE_MULIT,
          checkedValue: [1, 2],
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
          content: '如果合作装修平台，可以让你一年多上百个，都是一个星期之内量房，一个月内准装修的客户你有兴趣接触吗？',
          required: true,
          type: TYPE_MULIT,
          checkedValue: [1, 2, 3],
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
          content: '贵公司名称（城市+名称）',
          required: true,
          type: TYPE_TEXT,
          valid: [
            {
              reg: new RegExp('^.+[+]{1}.+$'),
              text: '请按照格式填写， 例如：xx+xx公司'
            }
          ]
        },
        // 5
        {
          content: '接单预算',
          required: true,
          type: TYPE_MULIT,
          checkedValue: [1, 2, 3],
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
          content: '设计师人数',
          required: true,
          type: TYPE_MULIT,
          checkedValue: [1, 2, 3, 4],
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
          content: '对于网络接单合作有想法的留下联系方式',
          required: true,
          type: TYPE_TEXT,
          valid: [
            {
              reg: new RegExp('^1[3458][0-9]{9}$'),
              text: '请输入符合正确格式的手机号码'
            }
          ]
        },
        // 6
        {
          content: '设计师人数',
          required: true,
          type: TYPE_SING,
          checkedValue: [1, 2, 3, 4],
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
        }
      ]
    };
  },
  methods: {
    submitQuestion () {
      this.ret = [];
      this.$refs.question.forEach(item => {
        item.submit();
      });
    },
    returnAnswer (ans) {
      this.ret.push(ans);
      if (this.ret.length === this.question.length) {
        console.log('ret', this.ret);
      }
    }
  }
};
</script>

<style scoped>
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
</style>
