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
  <img v-bind:src="require(`@/assets/img/${this.productImageData}`)" alt="" class="img-fluid">
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
    productNameKana: {
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
  data() {
    let productImage = this.productImage
    try {
      require(`@/assets/img/${this.productImage}`)
    } catch (e) {
      productImage = 'noImage.png'
    }
    return {
      productImageData: productImage
    }
  },
  methods: {
    detailTo: function() {
      this.$router.push({
        name: "detail", 
        params: {
          name: this.productName,
          nameKana: this.productNameKana, 
          efficacy: this.detailInfo,
          image: this.productImageData
        }
      })
    }
  }
}
</script>