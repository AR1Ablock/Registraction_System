<template>
  <div id="dv">
    <nav>
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/booking">Booking</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
// No additional script needed here for now.
</script>

<style>
/* Add your global styles here */
#app{
  display: flex;
  align-items: center;
  justify-content: center;
}

#dv {
  text-align: center;
  position: relative;
  top: 6vh;
  width: 80vw;
  border: none;
  box-shadow: rgba(0, 170, 255, 0.301) 0px 5px 24px 40px;
  border-radius: 5vmin;
  padding: 5vmin 0vmin 5vmin 0;
}

nav {
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-family: sans-serif;
  text-decoration: none;
  font-size: 2.3vmin;
}

nav * {
  color: rgb(0, 221, 255);
  background-color: rgb(16, 81, 185);
  border-radius: 1vmin;
  font-weight: bold;
  padding: .3vmin .5vmin .3vmin .5vmin;
  border: none;
  text-decoration: none;
}

nav *:hover{
  scale: 1.1;
  background-color: cornsilk;
  transition-timing-function: ease-in;
  transition: all .5s;
  cursor: pointer;
}
</style>
