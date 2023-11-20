<script>
export default {
  name: 'Menu',
  data() {
    return {
      name: this.$store.getters.getUser.name,
      balance: Math.round(this.$store.getters.getUser.balance*100)/100
    }
  },
  methods: {
  }
}
</script>

<template>
  <h3>Broker: {{name}}</h3>
  <h3>Balance: {{balance}}$</h3>
  <div style="display: flex; gap: 5px">
    <button class="element" @click="this.$router.push('/profile');">redact profile</button>
    <button class="element" @click="this.$router.push('/trades');">trade</button>
    <button class="element" @click="this.$router.push('/')">logout</button>
  </div>
</template>

<style scoped>

</style>