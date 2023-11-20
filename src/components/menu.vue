<script>
export default {
  name: 'Menu',
  data() {
    return {
      name: this.$store.getters.getUser.name,
      balance: this.$store.getters.getUser.balance
    }
  },
  methods: {
  }
}
</script>

<template>
  <h3>Broker: {{name}} {{balance}}$</h3>
  <button @click="this.$router.push('/profile');">redact profile</button>
  <button @click="this.$router.push('/trades');">trade</button>
  <button @click="this.$router.push('/')">logout</button>
</template>

<style scoped>

</style>