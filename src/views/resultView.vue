<template>
<div>
  <p>ランキングを表示します</p>
  <!-- コンテンツ02 -->
  <div class="py-4 bg-light">
    <section id="about">
      <div class="container">
        <!-- 下段 -->
        <div class="row">
          <div v-for="(answer,index) in getAnswer" :key="answer">
            <div class="col-md-4">
              <!-- カード01 -->
              <CardElement :ranking="index+1" :productName="answer.name" :productImage="items[index].productImage"></CardElement>
            </div>
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
  data() {
    return {
      items: [
        {
          productName: "葛根湯",
          productImage: "img01.jpeg",
        },
        {
          productName: "麻黄湯",
          productImage: "img03.jpg",
        },
        {
          productName: "桂枝湯",
          productImage: "img04.jpeg",
        },
      ]
    }
  },
  computed: mapGetters(['getAnswer']),
  components: {
    CardElement,
  }
}
</script>