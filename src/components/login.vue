<script>
import {instance} from "@/main.js";

export default {
  name: 'Login',
  data() {
    return {
    }
  },
  methods: {
    async conf(){
      let res = await instance.post("/brokers/get_broker", {id: document.getElementById("login").value})
      if(res.data) {
        this.$store.commit('setUser', res.data)
        this.$router.push('/menu');
      } else {
        alert("Broker not found")
      }
    }
  }
}
</script>

<template>
    <h3>Welcome to Trade</h3>
    <div style="display: flex; flex-direction: row; gap: 7px">
      <input id="login" class="element" placeholder="your id">
      <button id="confirm_login" class="element" @click="conf">Enter</button>
    </div>
</template>

<style scoped>

</style>