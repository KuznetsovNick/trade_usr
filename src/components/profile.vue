<script>
import {instance} from "@/main.js";

export default {
  name: 'Profile',
  data() {
    return {
    }
  },
  methods: {
    async redact_name(){
      let new_name = document.getElementById("redacted_name").value
      if(new_name){
        await instance.post("/brokers/set_name", {id: this.$store.getters.getUser.id, name: new_name})
        this.$store.commit('setUserName', new_name)
        this.$router.push('/menu');
      } else {
        alert("Name is empty")
      }
    }
  }
}
</script>

<template>
  <input id="redacted_name">
  <button @click="redact_name">save</button>
  <button @click="this.$router.push('/menu')">close</button>
</template>

<style scoped>

</style>