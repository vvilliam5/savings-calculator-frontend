<template>
  <form v-on:submit.prevent="stateSelect" class="py-10 sm:text-left">
    <label class="block text-gray-700 text-md font-semibold mb-2" for="month">Select a Month</label>
    <select
      class="my-4 ml-auto mr-auto sm:ml-0 block appearance-none w-2/3 sm:w-1/2 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      v-model="month"
    >
      <option value="january">January</option>
      <option value="febuary">Febuary</option>
      <option value="march">March</option>
      <option value="april">April</option>
      <option value="may">May</option>
      <option value="june">June</option>
      <option value="july">July</option>
      <option value="august">August</option>
      <option value="september">September</option>
      <option value="october">October</option>
      <option value="november">November</option>
      <option value="december">December</option>
    </select>
    <!-- <select
      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="grid-state"
    >
      <option>Record Type</option>
      <option>New Mexico</option>
      <option>Missouri</option>
      <option>Texas</option>
    </select>-->
    <button
      type="submit"
      class="my-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >Go</button>
  </form>
</template>
<script>
export default {
  data() {
    return { month: "State" };
  },
  methods: {
    stateSelect() {
      this.$emit("monthSelected", this.month);
    },
  },
};
</script>
<style scoped>
</style>