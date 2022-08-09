<template>
  <main>
    <!-- メインビジュアル -->
    <div class="container">
      <div class="jumbotron mt-3">
        <h1>エラー</h1>
        <p class="lead">再度ホーム画面からやり直してください</p>
        <router-link class="btn btn-lg btn-primary" to="/top" role="button">HOME &raquo;</router-link>
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