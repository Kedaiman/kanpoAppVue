<template>
  <main>
    <!-- 解析スタートボタン -->
    <div class="d-grid gap-2 col-6 mx-auto">
      <button class="btn btn-primary btn-lg" @click="toStart()">調査スタート &raquo;</button>
    </div>
    <!-- メインビジュアル -->
    <div class="container d-md-none">
      <div class="jumbotron mt-3">
        <h2>漢方おすすめアプリ</h2>
        <p class="lead">あなたの現状に最適な漢方を教えます</p>
      </div>
    </div>
    <div class="py-4">
      <div class="container">
        <!-- カルーセル外枠 -->
        <div id="main_visual" class="carousel slide" data-bs-ride="carousel">
          <!-- カルーセル内枠 -->
          <div class="carousel-inner">
            <!-- スライド01 -->
            <div class="carousel-item active">
              <img class="img-fluid" :src="require(`@/assets/img/medicine01.jpg`)" alt="観葉植物写真">
              <div class="carousel-caption d-none d-md-block">
                <h1>漢方おすすめアプリ</h1>
                <h2>あなたの現状に最適な漢方を教えます</h2>
              </div>
            </div>
            <!-- / スライド01 -->
          </div>
        </div>
        <!-- / カルーセル外枠 -->
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'topComponent',
  methods: {
    async toStart() {
      try {
        this.$store.dispatch('initialize')
        await this.$store.dispatch('startAnalysis')
        this.$router.push('/question')
      } catch (e) {
        this.$router.push('/error')
      }
    }
  }
}
</script>