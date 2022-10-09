<template>
    <html lang="ja">
        <body>
            <main class="container">
                <div class="d-grid gap-3"> 
                    <template v-for="(value) in getMedicines">
                        <div class="bg-light p-2 rounded" :key="value.name">
                            <h3>{{value.name}}({{value.nameKana}})</h3>
                            <div>{{value.detailInfo}}</div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal01" @click="detailTo(value.name, value.nameKana, value.detailInfo, value.imagePath)">
                                詳しく見る
                            </button>
                        </div>
                    </template> 
                </div>
            </main>
        </body>
    </html>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'searchComponent',
  beforeCreate: async function() {
    await this.$store.dispatch('getAllMedicines')
  },
  methods: {
    detailTo: function(name, nameKana, efficacy, image) {
      this.$router.push({
        name: "detail", 
        params: {
          name: name,
          nameKana: nameKana, 
          efficacy: efficacy,
          image: image
        }
      })
    }
  },
  computed: mapGetters(['getMedicines'])
}
</script>

<style>
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
    font-size: 3.5rem;
    }
}
</style>
