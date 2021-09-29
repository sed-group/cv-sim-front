<template>
  <div class="nav-bar">
    <div class="nav-bar-item">
      <router-link :to="{ name: 'Home' }">File</router-link>
      <router-link :to="{ name: 'Help' }">Help</router-link>
    </div>

    <router-link :to="{ name: 'Home' }" id="cv-s-logo">
      <v-img src="../assets/logo.png" alt="CV-S logo" width="100"></v-img>
    </router-link>

    <div class="nav-bar-item">
      <router-link :to="{ name: 'Contact' }">Contact</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>

  </div>
</template>


<script>

export default {
  name: "Header"
}

</script>


<style scoped>

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1em;
  font-size: 18px;

  background-color: #eeeeee;
}

.nav-bar-item {
  display: flex;
  gap: 1em;
  margin: 0 1em;
}

.nav-bar-item a {
  font-weight: 900;
  text-decoration: none;
  padding: .25em .5em;
  border-radius: 4px;
}

.router-link-exact-active {
  color: white;
  background-color: #1976d2;
}

#cv-s-logo {
  background: none; /* to overtide active link color */
}


</style>