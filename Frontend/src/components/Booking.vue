<template>
  <div>
    <h2 class="heading">Booking</h2>
    <form class="frm" @submit.prevent="register">
      <input class="inpt" type="text" v-model="source" placeholder="Current City Name" required>
      <input class="inpt" type="text" v-model="destination" placeholder="Target City Name" required>
      <button class="btn" type="submit">Book</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style>
@import url(../assets/Style.css);
</style>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const source = ref('');
const destination = ref('');
const error = ref('');

watch(error, (newv, oldv) => {
  if (newv) {
    setTimeout(() => {
      error.value = false;
    }, 1500);
  }
});

const register = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the token from local storage
    await axios.post('http://localhost:3000/api/booking', {
      SourceCity: source.value,
      TargetCity: destination.value,
    }, {
      headers: { 'Authorization': token } // Include the token in the Authorization header
    }).catch(errr => {
      if (errr.response) {
        error.value = errr.response.data.message;
      }
    });
    if (error.value.toString() !== 'Booking Failed, User Not Logged or User Not in Database' && error.value.toString() !== 'No Logged-in User Found, Booking Failed') {
      router.push('/dashboard');
    }
  } catch (error) {
    console.error(error);
  }
};


</script>