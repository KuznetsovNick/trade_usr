<script>
import {instance} from "@/main.js";

export default {
  name: 'Profile',
  data() {
    return {
      name: this.$store.getters.getUser.name,
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
  <div style="display: flex; flex-direction: row; gap: 7px; margin: 20px">
    <input id="redacted_name" class="element" :value="name">
    <button @click="redact_name" class="element">save</button>
    <button @click="this.$router.push('/menu')" class="element">close</button>
  </div>
</template>

<style scoped>

</style>