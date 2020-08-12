<template>
  <form
    v-on:submit.prevent="submitIncome"
    class="w-full lg:w-2/3 mx-auto bg-white p-16 rounded-lg shadow"
  >
    <h2 class="text-xl font-medium text-blue-700">Total Income</h2>
    <div class="flex space-x-2">
      <span class="self-center text-xl text-blue-700">&#8358;</span>
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 my-4"
        type="number"
        v-model="income"
        required
      />
    </div>
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >Continue</button>
  </form>
</template>
<script>
export default {
  name: "Enter Record",
  data() {
    return {
      income: null,
    };
  },
  methods: {
    submitIncome() {
      this.$emit("incomeSubmitted", this.income);
    },
  },
};
</script>
<style scoped>
</style>