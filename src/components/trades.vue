<script>
import io from 'socket.io-client';
import {Chart} from "chart.js/auto";
import {nextTick, shallowRef} from "vue";
import {instance} from "@/main.js";

export default {
  name: 'Trades',
  data() {
    return {
      socket: null,
      messages: [],
      chartRefs: [],
      stocks: [],
      dates: [],
      current_cost: [],
      qty_chosen: [],
      sum: [],
      balance: this.$store.getters.getUser.balance
    };
  },
  mounted() {
    this.socket = io('http://localhost:4000');

    this.socket.on('message', (message) => {
      this.handleSocket(message);
    });


  },
  beforeUnmount() {
    console.log("destroy");
    this.socket.disconnect();
  },
  methods: {
    handleSocket(data) {
      if (data.finish) {
        alert("trades finished");
        this.$router.push('/menu');
        return;
      }
      if (data.stocks) {
        this.stocks = data.stocks;
        this.dates = data.data;
        this.get_personal_stocks(data.stocks)
        this.$nextTick(() => {
          this.graphic();
        });
        return;
      }
      this.add_points(data);
    },

    graphic() {
      for (let i = 0; i < this.stocks.length; i++) {
        const ctx = document.getElementById(i.toString());
        if (!ctx) {
          return;
        }

        let x = [];
        let y = [];

        for (let j = 0; j < this.dates[i].length; j++) {
          x.push(this.dates[i][j].date);
          y.push(this.dates[i][j].open);
        }

        this.current_cost.push(this.dates[i][this.dates[i].length-1].open)
        this.sum.push(0)
        this.qty_chosen.push(0)

        const data = {
          labels: x,
          datasets: [{
            label: this.stocks[i],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: y,
          }]
        };

        const chartRef = shallowRef(null);

        chartRef.value = new Chart(ctx, {
          type: 'line',
          data: data
        });
        this.chartRefs.push(chartRef);
      }
    },

    add_points(data) {
      if (!data[0]) return;
      for (let i = 0; i < this.stocks.length; i++) {
        const currentChart = this.chartRefs[i].value;

        currentChart.data.datasets[0].data.push(data[i].open);
        currentChart.data.labels.push(data[i].date);

        this.current_cost[i] = data[i].open

        nextTick(() => {
          currentChart.update();
        });
      }
    },

    async get_personal_stocks(stocks){
      let res = await instance.post("/brokers/get_personal_stocks", {id: this.$store.getters.getUser.id, stocks: stocks})
      this.personal_stocks = res.data
      this.fill_personal_stocks()
    },

    fill_personal_stocks(){
      for(let i = 0; i < this.personal_stocks.data.length; i++){
        document.getElementById(`qty${i}`).innerHTML = `quantity: ${this.personal_stocks.data[i].qty}`
        document.getElementById(`balance${i}`).innerHTML = `profit: ${this.personal_stocks.data[i].balance.toFixed(2)}`
      }
    },

    change_qty(index, kol){
      this.qty_chosen[index] += kol
    },

    async confirm_deal(index){
      let res = await instance.post("/brokers/deal", {id: this.$store.getters.getUser.id,
        qty: this.qty_chosen[index], sum: this.qty_chosen[index]*this.current_cost[index], stock: this.stocks[index]})
      if(res.data.status === "ok"){
        this.$store.commit('setUserBalance', res.data.balance)
        this.balance = this.$store.getters.getUser.balance
        document.getElementById(`qty${index}`).innerHTML = `quantity: ${res.data.qty}`
        document.getElementById(`balance${index}`).innerHTML = `profit: ${res.data.stock_balance}`
        this.qty_chosen[index] = 0
      } else {
        alert(res.data.status)
        this.qty_chosen[index] = 0
      }
    }
  }

}
</script>

<template>
  <div id="graphics">
    <div v-for="index in stocks.length" :key="index" style="width: max-content; height: max-content">
      <canvas :id="`${index-1}`" style="width: 30rem; height: 15rem"></canvas>
      <div :id="`cost${index-1}`">{{current_cost[index-1]}}</div>
      <div :id="`qty${index-1}`"></div>
      <div :id="`balance${index-1}`"></div>
      <div id="controls">
        <button @click="change_qty(index-1, -1)">-</button>
        <div :id="`chosen${index-1}`">{{qty_chosen[index-1]}}</div>
        <button @click="change_qty(index-1, 1)">+</button>
      </div>
      <div :id="`sum${index-1}`">{{(-qty_chosen[index-1]*current_cost[index-1]).toFixed(2)}} ({{(balance-qty_chosen[index-1]*current_cost[index-1]).toFixed(2)}})</div>
      <button @click="confirm_deal(index-1)">Confirm</button>
    </div>
    <button @click="this.$router.push('/menu')" style="width: max-content">close</button>
  </div>

  <div style="position: fixed; top: 0; right: 0">Balance: {{balance}}$</div>
</template>
<style scoped>
#graphics{
  display: flex;
  flex-direction: column;
  gap: 30px;
}

#controls{
  display: flex;
  flex-direction: row;
  gap: 5px;
}
</style>