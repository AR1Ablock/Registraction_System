<template>
  <div>
    <h2 class="heading">Bus Schedule</h2>
    <section>
      <div v-if="error" class="error">{{ error }}</div>
      <p class="Users" v-for="user in users" :key="user.id">

      <section class="sct">
        <h3 class="sub_sec">
          Passenger Name:
          <span>
            {{ user.username }}
          </span>
        </h3>
      </section>

      <section class="sct">
        <h3 class="sub_sec">
          ID:
          <span>
            {{ user.id }}
          </span>
        </h3>
      </section>

      <section class="sct">
        <h3 class="sub_sec">
          Current City:
          <span>
            {{ user.Source_City }}
          </span>
        </h3>
      </section>

      <section class="sct">
        <h3 class="sub_sec">
          Destination City:
          <span>
            {{ user.Destination_City }}
          </span>
        </h3>
      </section>

      <section class="sct">
        <h3 class="sub_sec">
          Arrival Time:
          <span>
            {{ user.Bus_Arrival_time }}
          </span>
        </h3>
      </section>

      <section class="sct">
        <h3 class="sub_sec">
          Departure Time:
          <span>
            {{ user.Bus_Departure_time }}
          </span>
        </h3>
      </section>

      <section class="sct">
        <h3 class="sub_sec">
          Bus Number:
          <span>
            {{ user.bus_number }}
          </span>
        </h3>
      </section>

      <section class="sct">
        <h3 class="sub_sec">
          Booked At:
          <span>
            {{ user.Booked_at }}
          </span>
        </h3>
      </section>

      </p>
    </section>
  </div>
</template>

<style>
@import url(../assets/Style.css);

body {
  background-color: black;
  color: aliceblue;
}

.Users {
  border-top: solid #0072ff;
  border-radius: 1vmin;
  margin: 1vmin 0 10vmin 0;
}

.sct {
  background-color: dodgerblue;
  margin: 1vmin 0 1vmin 0;
}

.sub_sec {
  padding: 1.5vmin;
  border-radius: 1vmin;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 70%;
  background-color: brown;
  font-size: 2vmin;
  font-family: sans-serif;
  border-bottom-right-radius: 8vmin;
}
</style>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const error = ref('');

watch(error, (newv, oldv) => {
  if (newv) {
    setTimeout(() => {
      error.value = false;
    }, 1500);
  }
});


const users = ref([]);
const fetchBuses = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const response = await axios.get('http://localhost:3000/api/dashboard', {
      headers: { 'Authorization': token } // Include the token in the Authorization header
    }).catch(errr => {
      if (errr.response) {
        error.value = errr.response.data.message;
      }
    });


   // Format the 'Booked_at' field for each user
   users.value = response.data.map(user => ({
      ...user,
      Booked_at: new Date(user.Booked_at).toLocaleDateString()
    }));
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchBuses);
</script>
