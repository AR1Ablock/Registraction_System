<template>
  <div>
    <h2 class="heading">Register</h2>
    <form class="frm" @submit.prevent="register">
      <input class="inpt" type="text" v-model="username" placeholder="Name" required>
      <input class="inpt" type="password" v-model="password" placeholder="Password" required>
      <p class="admin">Admin: <input type="checkbox" name="admin" id="chkbx" v-model="admin"></p>
      <button class="btn" type="submit">Register</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style>
@import url(../assets/Style.css);

@media (max-width:700px) {

  .admin{
    font-size: 3.5vmin;
  }
  
  .admin input#chkbx {
    height: 10px;
    width: 10px;
}
}

@media (max-width:500px) {
  
  .admin input#chkbx {
    height: 8px;
    width: 8px;
}
}

@media (max-width:400px) {

  .admin input#chkbx {
    height: 6px;
    width: 6px;
}
}

.admin{
  font-size: 2.5vmin;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
}
</style>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const admin = ref(false);
var role = ref('user');
const router = useRouter();
const error = ref('');

watch(admin,(old,New) => {
  old ? role.value = 'admin' : role.value = 'user';
});

watch(error,(newv,oldv) => {
if(newv){
setTimeout(() => {
  error.value = false;
}, 1500);  
}
});

const register = async () => {
  try {
    await axios.post('http://localhost:3000/api/register', {
      username: username.value,
      password: password.value,
      S_Role : role.value
    }).catch(errr =>{
        error.value = errr.response.data.message;
    });
    if(error.value !== 'Account Already Exist')
    router.push('/login');
  } catch (error) {
      console.error(error);
    }
  };
</script>
