<template>
  <main>
    <!-- 解析スタートボタン -->
    <div class="d-grid gap-2">
      <button class="btn btn-primary btn-lg" @click="toStart()">調査スタート</button>
    </div>
    <!-- メインビジュアル -->
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
    toStart() {
      this.$store.dispatch('initialize')
      this.$store.dispatch('startAnalysis')
      this.$router.push('/question')
    }
  }
}
</script>