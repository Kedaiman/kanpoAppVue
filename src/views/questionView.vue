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
            <div class="carousel-caption">
              <h1>{{getNowQuestion().name}}</h1>
              <h2>{{getNowQuestion().question_contents}}</h2>
            </div>
          </div>
          <!-- / スライド01 -->
        </div>
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
                  <input class="form-check-input" checked type="radio" name="radios" id="health" v-bind:value="index" v-model="selected_index">
                  <label class="form-check-label" v-bind:for="index">
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
    <!-- ボタン表示 --> 
    <div class="py-4">
      <div class="container">
        <div class="row">
          <div v-show="checkTopQuestion()" class="col-6"></div>
          <button v-show="!checkTopQuestion() && !checkFinishQuestion()" class="btn btn-secondary col-6" @click="backQuestion()">前の質問</button>
          <button v-show="!checkFinishQuestion()" class="btn btn-primary col-6" @click="sendAnswer()">次の質問</button>
        </div>
      </div>
    </div>
    <!-- / ボタン表示-->
    <!-- 解答表示ボタン表示 -->
    <div class="py-4">
      <div class="container">
        <div class="row">
          <div v-show="checkFinishQuestion()" class="col-3"></div>
          <button v-show="checkFinishQuestion()" class="btn btn-danger col-6" @click="toAnswer()">解析結果表示</button>
          <div v-show="checkFinishQuestion()" class="col-3"></div>
        </div>
      </div>   
    </div>
    <!-- /解答表示ボタン表示 -->
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
      await this.$store.dispatch('sendAnswer', this.selected_index)
      this.$router.push('/question')
   },
    async backQuestion() {
      await this.$store.dispatch('backQuestion')
      this.$router.push('/question')
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