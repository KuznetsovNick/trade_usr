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
  <input id="login" placeholder="your id">
  <button id="confirm_login" @click="conf">Enter</button>
</template>

<style scoped>

</style>