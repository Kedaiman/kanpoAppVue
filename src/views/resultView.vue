<template>
<div>
  <p>ランキングを表示します</p>
  <!-- コンテンツ02 -->
  <div class="py-4 bg-light">
    <section id="about">
      <div class="container">
        <!-- 下段 -->
        <div class="row">
          <div v-for="(answer,index) in getAnswer" :key="answer" class="col-md-4">
            <CardElement :ranking="index+1" :productName="answer.name" :productNameKana="answer.nameKana" :productImage="answer.imagePath" :detailInfo="answer.detailInfo"></CardElement>
          </div>
       </div>
        <!-- /下段 -->
      </div>
    </section>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardElement from './../components/CardElement.vue'
export default {
  name: 'resultComponent',
  computed: mapGetters(['getAnswer']),
  components: {
    CardElement,
  }
}
</script>