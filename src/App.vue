<template>
  <div id="app">
    <!--
    <nav>
      <router-link to="/start">Start</router-link>
    </nav>
    <transition>
      <router-view/>
    </transition>
    -->
    <header class="py-4">
      <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-brand to="/top">HOME</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/login">LOGIN</b-nav-item>
            <b-nav-item to="/search">SEARCH</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <div class="d-flex" v-if="checkSearch()">
          <input class="form-control me-2" v-model="searchWord">
          <button class="btn btn-outline-success" @click="doSearch()">Search</button>
        </div>
      </b-navbar>
    </header>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      searchWord: "" 
    }
  },
  methods: {
    checkSearch: function() {
      let regex = new RegExp("^/search")
      return regex.test(location.pathname)
    },
    doSearch: async function() {
      await this.$store.dispatch('getSearchWordMedicines', {searchWord: this.searchWord, pageSize: 100,currentPage: 0})
      console.log("aaa")
   },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
