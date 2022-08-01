<template>
  <b-modal class="modal fade" v-bind:id="modalName" tabindex="-1" role="dialog" aria-labelledby="modal01-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal01-label">{{getNowQuestion().name}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>{{getNowQuestion().question_contents}}</p>

          <!-- 複数のラジオボタンを表示-->
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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="submitAnswer()">解答する</button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'questionElement',
  data() {
    return {
      id: 0,
      modalName: "modal" + this.id, 
      selected_index: 0
    }
  },
  methods: {
    openModal: function() {
      // 開く
      this.$bvModal.show(this.modalName)
    },
    closeModal: function() {
      // 開く
      this.$bvModal.hide(this.modalName)
    },
    async submitAnswer() {
      await this.$store.dispatch('sendAnswer', this.selected_index)

      this.$bvModal.hide(this.modalName)
      if (this.getAnswer.length) {
        this.$emit('completed') 
      } else {
        this.$bvModal.show(this.modalName) 
      }
    }
  },
  computed: mapGetters(['getNowQuestion', 'getAnswer'])
}
</script>