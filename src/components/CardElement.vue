<template>
<!-- カード01 -->
<div class="card mb-3">
  <div class="card-header">
    <p>{{ranking}}位</p>
  </div>
  <!-- カードの本文エリア -->
  <div class="card-body d-flex justify-content-between">
    <h4 class="card-title">{{productName}}</h4>
    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal01" @click="detailTo()">
      詳しく見る
    </button>
  </div>
  <img v-bind:src="require(`@/assets/img/${productImage}`)" alt="" class="img-fluid">
</div>
</template>

<script>
export default {
  name: 'resultComponent',
  props: {
    ranking: {
      type: Number,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    productImage: {
      type: String,
      required: true
    },
    detailInfo: {
      type: String,
      required: true
    }
  },
  methods: {
    detailTo: function() {
      this.$router.push({
        name: "detail", 
        params: {
          name: this.productName,
          explain: this.detailInfo, 
          efficacy: "発汗を促すことで熱を下げ、かぜを治そうとします。 最近の西洋医学的な基礎研究でも、抗炎症作用などが確かめられています。 基本的に急性期に用いる薬で、使うのは発病後1～2日が目安とされています。 「葛根湯」はかぜに限らず、鼻炎、頭痛など、炎症が起こって熱が出るような急性の病気の初期にも広く使われます。",
          image: this.productImage
        }
      })
    }
  }
}
</script>