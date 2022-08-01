<template>
<div>
  <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal01" @click="openModal()">
    分析スタート
  </button>
  <QuestionElement ref="child" v-on:completed="completed"></QuestionElement>
</div>
</template>

<script>
import QuestionElement from '../components/QuestionElement.vue'
export default {
  name: 'detail-data',
  components: {
    QuestionElement
  },
  created: function() {
    this.$store.dispatch('startAnalysis')
  },
  methods: {
    openModal: function() {
      this.$refs.child.openModal();
    },
    completed: function() {
      window.alert("質問が終了しました。\nおすすめの漢方を表示します");
      this.$router.push('/result')
    }
  }
}
</script>