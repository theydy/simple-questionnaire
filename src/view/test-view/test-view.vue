<template>
    <div class="test">
      <this-question :type="0" :required="true" :checked-value='[1]'></this-question>
      <this-question :type='1' :required="true" :checked-value='[1,2,3]'></this-question>
      <this-question :type="2"></this-question>
    </div>
</template>

<script>
export default {
  components: {
    ThisQuestion: () => import('@/components/this-question/this-question')
  },
  data () {
    return {
    };
  },
  methods: {
    selectOptions (list) {
      console.log(list);
    }
  }
};
</script>

<style scoped>
</style>
