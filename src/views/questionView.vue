<template>
  <div class="py-4">
    <div class="container">
      <!-- カルーセル外枠 -->
      <div id="main_visual" class="carousel slide" data-bs-ride="carousel">
        <!-- カルーセル内枠 -->
        <div class="carousel-inner">
          <!-- スライド01 -->
          <div class="carousel-item active">
            <img class="img-fluid" :src="require(`@/assets/img/medicine03.jpeg`)" alt="">
            <div class="carousel-caption d-none d-md-block">
              <h1 v-show="!checkFinishQuestion()">{{getNowQuestion().name}}</h1>
              <h2 v-show="!checkFinishQuestion()">{{getNowQuestion().question_contents}}</h2>
              <h2 v-show="checkFinishQuestion()">質問は終了しました</h2>
            </div>
          </div>
          <!-- / スライド01 -->
        </div>
      </div>
    </div>
    <div class="container d-md-none">
      <div class="jumbotron mt-3">
        <h2 v-show="!checkFinishQuestion()">{{getNowQuestion().name}}</h2>
        <p v-show="!checkFinishQuestion()">{{getNowQuestion().question_contents}}</p>
        <p v-show="checkFinishQuestion()">質問は終了しました</p>
      </div>
    </div>
    <!-- / カルーセル外枠 -->
    <!-- オプション表示 -->
    <div class="py-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-4">
            <template v-for="(value, index) in getNowQuestion().selection_contents">
              <section v-bind:key="value">
                <div class="form-check">
                  <input v-show="!checkFinishQuestion()" class="form-check-input" checked type="radio" name="radios" id="health" v-bind:value="index" v-model="selected_index">
                  <label v-show="!checkFinishQuestion()" class="form-check-label" v-bind:for="index">
                    {{value}}
                  </label>
                </div>     
            </section>
            </template> 
          </div>
        </div>
      </div>
    </div>
    <!-- / オプション表示 -->
    <!-- 解答表示ボタン表示 -->
    <div class="py-4">
      <div class="container">
        <div class="row">
          <div v-show="checkFinishQuestion()" class="col-3"></div>
          <button v-show="checkFinishQuestion()" class="btn btn-lg btn-danger col-6" @click="toAnswer()">解析結果表示 &raquo;</button>
          <div v-show="checkFinishQuestion()" class="col-3"></div>
        </div>
      </div>   
    </div>
    <!-- /解答表示ボタン表示 -->
    <!-- ボタン表示 --> 
    <div class="py-4">
      <div class="container">
        <div class="row">
          <div v-show="checkTopQuestion()" class="col-6"></div>
          <button v-show="!checkTopQuestion() && !checkFinishQuestion()" class="btn btn-lg btn-secondary col-6" @click="backQuestion()">&laquo; 前の質問</button>
          <button v-show="!checkFinishQuestion()" class="btn btn-lg btn-primary col-6" @click="sendAnswer()">次の質問 &raquo;</button>
        </div>
      </div>
    </div>
 </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'questionComponent',
  data() {
    return {
      selected_index: 0
    }
  },
  methods: {
    async sendAnswer() {
      try {
        await this.$store.dispatch('sendAnswer', this.selected_index)
        this.$router.push('/question')
      } catch (e) {
        this.$router.push('/error')
      }
   },
    async backQuestion() {
      try {
        await this.$store.dispatch('backQuestion')
        this.$router.push('/question')
      } catch (e) {
        this.$router.push('/error')
      } 
  },
    checkTopQuestion() {
      return (this.$store.state.nowQuestion.count == 1)
    },
    checkFinishQuestion() {
      return this.getAnswer.length > 0
    },
    toAnswer: function() {
      this.$router.push('/result')
    }
  },
  computed: mapGetters(['getNowQuestion', 'getAnswer'])
}
</script>