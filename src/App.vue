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
      </b-navbar>
    </header>
    <router-view/>
  </div>
</template>

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
