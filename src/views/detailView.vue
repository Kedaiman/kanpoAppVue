<template>
  <!-- コンテンツ05 -->
  <div class="py-4">
    <section id="information">
      <div class="container">
        <h3 class="mb-3">{{name}}</h3>
        <div>{{nameKana}}</div>
        <div class="row">
          <!-- 左側セクション -->
          <div class="col-md-6">
            <section id="efficacy">
              <h4 class="mb-3">効能</h4>
              <div>{{efficacy}}</div>
            </section>
          </div>
          <!-- /左側セクション -->
          <!-- 右側セクション -->
          <div class="col-md-6">
            <section id="image">
              <img :src="require(`@/assets/img/${this.productImageData}`)" alt="" class="img-fluid">
            </section>
          </div>
          <!-- /右側セクション -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'resultComponent',
  props: {
    name: {
      type: String,
      required: true
    },
    nameKana: {
      type: String,
      required: true
    },
    efficacy: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  data() {
    let productImage = this.image
    try {
      require(`@/assets/img/${this.image}`)
    } catch (e) {
      productImage = 'noImage.png'
    }
    return {
      productImageData: productImage
    }
  }
}
</script>