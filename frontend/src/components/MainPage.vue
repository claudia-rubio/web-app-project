<template>
  <div>
    <div>
      <label>Coin 1 </label>
      <input
      type="text" 
      v-model="coin1"
      > 
    </div>
    <div>
      <label>Coin 2 </label>
      <input
      type="text"
      v-model="coin2"
      >
    </div>
    <div>
      <label>Days from now to present </label>
      <input
      type="text"
      v-model="days"
      >
    </div>
      <button 
        class="btn btn-primary" 
        type="submit"
        @click="setCoin()"
      >
        Button
      </button>
      <div class="chart">
        <h2> Price </h2>
        <canvas id="PriceChart"></canvas>
        <h2> Market Cap</h2>
        <canvas id="MarketCapChart"></canvas>
      </div>
  </div>

  

</template>

<script>
import { mapState } from "vuex";
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment'; // or another adapter to avoid moment
Chart.register(...registerables);
export default {

  name: 'MainPage',
  data() {
    return {
      coin1: "",
      coin2: "",
      date1: "",
      date2: "",
      days: "",
      price1: [],
      price2: [],
      chart1: null,
      char2: null,
    }
  },
  created() {

  },
  computed: {
    ...mapState(["market", "count"]),
  },
  methods: {
    setCoin() {
      //console.log(this.coinToSearch);
      //this.$store.commit('increment');
      //this.$store.dispatch("getMarket");
      //var input = {
      //  coin1: this.coin1, 
      //  coin2: this.coin2
      //  };
      console.log(this.coin1);
      this.$store.dispatch("getCoin", {coin: this.coin1, days: this.days}).then(res => {
        this.price1 = res;

      
        this.$store.dispatch("getCoin", {coin: this.coin2, days: this.days}).then(res => {
          this.price2 = res;
        
          var labels1 = [];
          var data1 = [];
          var data2 = [];
          var cap1 = [];
          var cap2 = [];
          for(var i = 0; i < this.price1.prices.length; i++) {
            labels1.push(this.price1.prices[i][0]);
            data1.push(this.price1.prices[i][1]);
            data2.push(this.price2.prices[i][1]);
          }
          for(var j = 0; j < this.price1.market_caps.length; j++) {
            cap1.push(this.price1.market_caps[j][1]);
            cap2.push(this.price2.market_caps[j][1]);
          }
          var canvas1 = document.getElementById("PriceChart").getContext('2d');
          if (this.chart1) 
            this.chart1.destroy();
          this.chart1 = new Chart(canvas1, {
            type: 'line',
            data: {
            labels: labels1,
            datasets: [{
            label: this.coin1,
            data: data1,
            backgroundColor: [
            'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
            'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
            },
            {
            label: this.coin2,
            data: data2,
            backgroundColor: [
            'rgba(0, 137, 132, .2)',
            ],
            borderColor: [
            'rgba(0, 10, 130, .7)',
            ],
            borderWidth: 2
            }
            ]
            },
            options: {
            responsive: true
            }
          });
          var canvas2 = document.getElementById("MarketCapChart").getContext('2d');
          if(this.chart2)
            this.chart2.destroy();
          this.chart2 = new Chart(canvas2, {
            type: 'line',
            data: {
            labels: labels1,
            datasets: [{
            label: this.coin1,
            data: cap1,
            backgroundColor: [
            'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
            'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
            },
            {
            label: this.coin2,
            data: cap2,
            backgroundColor: [
            'rgba(0, 137, 132, .2)',
            ],
            borderColor: [
            'rgba(0, 10, 130, .7)',
            ],
            borderWidth: 2
            }
            ]
            },
            options: {
            responsive: true
            }
          });
        });
      });

    }
  }
  //props: {
  //  msg: String
  //}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.chart {
  margin-left: 15%;
  margin-right: 15%;
}
</style>
