<template>
<div>
  <div class="py-4">
    <section id="menu">
      <div class="container">
        <h3 class="mb-3">{{name}}</h3>
        <p>{{explain}}</p>
        <!-- タブ型ナビゲーション -->
        <div class="nav nav-tabs" id="tab-menus" role="tablist">
          <!-- タブ01 -->
          <a class="nav-item nav-link active" id="tab-menu01" data-bs-toggle="tab" href="#panel-menu01" role="tab" aria-controls="panel-menu01" aria-selected="true">効能</a>
       </div>
        <!-- /タブ型ナビゲーション -->

        <!-- タブパネル -->
        <div class="tab-content" id="panel-menus">
          <!-- パネル01 -->
          <div class="tab-pane fade show active border border-top-0" id="panel-menu01" role="tabpanel" aria-labelledby="tab-menu01">
            <div class="row p-3">
              <div class="col-md-7 order-md-2">
                <h4>効能</h4>
                <span>{{efficacy}}</span>
              </div>
              <div class="col-md-5">
                <img :src="require(`@/assets/img/${image}`)" alt="" class="img-fluid">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
    explain: {
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
  }
}
</script>