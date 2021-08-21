<template>
  <div class="container"> 
    <div class="form-group form-container">
      <div>
        <label>Coin 1 </label>
        <input
        class="form-control"
        type="text" 
        v-model="coin1"
        > 
      </div>
      <div>
        <label>Coin 2 </label>
        <input
        class="form-control"
        type="text"
        v-model="coin2"
        >
      </div>
      <div>
        <label>From date: </label>
        <div>
          <date-picker class="form-control"
            v-model="time"/>
        </div>
        <label>To date: </label>
        <br/>
        <input
        class="form-control"
        type="text"
        disabled=true
        :placeholder="today"
        >
      </div>
    </div>
      <button 
        class="btn btn-primary" 
        type="submit"
        @click="setCoin()"
      >
        Button
      </button>
      <div class="chart">
        <canvas id="PriceChart"></canvas>
        <canvas id="MarketCapChart"></canvas>
      </div>
  </div>

  

</template>

<script>
import { mapState } from "vuex";
import { Chart, registerables } from 'chart.js';
import DatePicker from "vue3-datepicker"
import dateUtils from 'vue-dateutils';
import 'chartjs-adapter-moment'; // or another adapter to avoid moment
Chart.register(...registerables);
export default {
  components: { DatePicker },
  name: 'MainPage',
  data() {
    return {
      time: new Date(),
      today: "",
      coin1: "",
      coin2: "",
      date1: "",
      date2: "",
      days: null,
      price1: [],
      price2: [],
      chart1: null,
      char2: null,
    }
  },
  created() {
    this.today = dateUtils.dateToStr("YYYY-MM-DD", new Date());
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
      this.days = this.calculateDays();
      this.$store.dispatch("getCoin", {coin: this.coin1, days: this.days}).then(res => {
        if (res.error) {
          alert(res.error);
          return;
        }
        this.price1 = res;
        this.$store.dispatch("getCoin", {coin: this.coin2, days: this.days}).then(res => {
          if (res.error) {
            alert(res.error);
            return;
          }
          this.price2 = res;
        
          var labels = [];
          var data1 = [];
          var data2 = [];
          var cap1 = [];
          var cap2 = [];
          for(var i = 0; i < this.price1.prices.length; i++) {
            labels.push(dateUtils.dateToStr("YYYY-MM-DD", new Date(this.price1.prices[i][0])));
            data1.push(this.price1.prices[i][1]);
            data2.push(this.price2.prices[i][1]);
          }
          for(var j = 0; j < this.price1.market_caps.length; j++) {
            cap1.push(this.price1.market_caps[j][1]);
            cap2.push(this.price2.market_caps[j][1]);
          }
          var canvas1 = document.getElementById("PriceChart").getContext('2d');
          var canvas2 = document.getElementById("MarketCapChart").getContext('2d');
          if (this.chart1) 
            this.chart1.destroy();
          if(this.chart2)
            this.chart2.destroy();
          this.chart1 = this.createNewChart(canvas1, labels, data1, data2, "Price");
          this.chart2 = this.createNewChart(canvas2, labels, cap1, cap2, "Market Cap");
        });
      });

    },
    calculateDays() {
      var day1 = this.time.getTime();
      var day2 = new Date().getTime();
      var milli = day2 - day1;
      milli = milli /1000/24/60/60;
      milli = Math.floor(milli);
      return milli;
    },
    createNewChart(canvas, labels, data1, data2, title) {
      return new Chart(canvas, {
        type: 'line',
        data: {
        labels: labels,
        datasets: [
        {
          label: this.coin1,
          data: data1,
          yAxisID: 'y',
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
          yAxisID: 'y1',
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
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title,
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',

              grid: {
                drawOnChartArea: false,
              },
            },
          }
        }
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
.form-container {
  margin-left: 25%;
  width: 40%;
  z-index:200;
}


</style>
