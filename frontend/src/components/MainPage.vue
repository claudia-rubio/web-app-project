<template>
  <div>
    <input
    type="text" 
    v-model="coinToSearch"
    > 
    <button 
      class="btn btn-primary" 
      type="submit"
      @click="setCoin()"
    >
      Button
    </button>
  </div>

  

</template>

<script>

export default {

  name: 'MainPage',
  data() {
    return {
      coinToSearch: "",
    }
  },
  created() {

  },
  methods: {
    setCoin() {
      console.log(this.coinToSearch);
      this.$store.commit('increment');
      this.$store.dispatch("getWeather");
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
</style>
