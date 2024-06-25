<template>
  <div>
    <h2 class="heading">Login</h2>
    <form class="frm" @submit.prevent="login">
      <input class="inpt" type="text" v-model="username" placeholder="Name" required>
      <input class="inpt" type="password" v-model="password" placeholder="Password" required>
      <button class="btn" type="submit">Login</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();
const error = ref('');

watch(error,(newv,oldv) => {
if(newv){
setTimeout(() => {
  error.value = false;
}, 1500);  
}
});


const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username: username.value,
      password: password.value
    }).catch(errr =>{
      if (errr.response) {
        error.value = errr.response.data.message;
    }
    });
    localStorage.setItem('token', response.data.token);
    router.push('/booking');
  } catch (err) {
    console.log(err.message);
  }
};
</script>

<style scoped>
@import url(../assets/Style.css);

::placeholder {
  font-family: sans-serif;
}


.btn {
  width: 25%;
  border: none;
  font-size: 2vmin;
  font-family: sans-serif;
  letter-spacing: 1px;
  border-radius: 10vmin;
  padding: 1.5vmin 1vmin;
  background-color: rgb(0, 123, 255);
  color: white;
  cursor: pointer;
}

.btn:hover {
  background-color: rgb(106, 0, 255);
  transform: scale(1.06);
  transition-timing-function: ease-in-out;
  transition: all .5s;
}

.btn:active {
  transform: scale(.8);
  transition-timing-function: ease-in-out;
  transition: all .4s;
}

.heading {
  color: rgb(0, 123, 255);
  font-size: 4vmin;
  font-family: sans-serif;
  font-style: italic;
  border: none;
}

.frm {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 5vmin;
}

.frm * {
  flex: 1;
}

.inpt {
  width: 50%;
  font-size: 2.5vmin;
  font-weight: bold;
  border: none;
  color: rgb(0, 110, 255);
  outline: none;
  background-color: rgb(238, 238, 238);
  padding: 1.5vmin;
  border-radius: 4vmin;
  border-left: 1.5vmin solid rgb(0, 123, 255);
}

.inpt:hover{
  scale: 1.05;
  transition-timing-function: ease;
  transition: all .5s;
}
</style>
