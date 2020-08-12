<template>
  <form
    v-on:submit.prevent="submitExpense"
    class="w-full lg:w-2/3 mx-auto bg-white p-16 rounded-lg shadow"
  >
    <div class="text-left text-sm">
      <ul class="list-disc">
        <li>
          <span class="text-green-700 font-light">
            You made
            <span class="font-semibold">&#8358;{{numberWithCommas(income)}}</span> this month
          </span>
        </li>
      </ul>
    </div>
    <h2 class="text-xl font-medium text-red-700">Total Expense</h2>
    <div class="flex space-x-2">
      <span class="self-center text-xl text-red-700">&#8358;</span>
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 my-4"
        type="number"
        v-model="expense"
      />
    </div>
    <div class="grid grid-cols-2 gap-0">
      <div>
        <button
          @click="reset"
          type="button"
          class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >Cancel</button>
      </div>
      <div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >Confirm</button>
      </div>
    </div>
  </form>
</template>
<script>
import { utils } from "../../mixins/utils";
import Spinner from "../ui/Spinner";
export default {
  mixins: [utils],
  name: "Confirm Record",
  data() {
    return {
      expense: null,
      loading: true,
    };
  },
  methods: {
    reset() {
      this.$emit("reset");
    },
    submitExpense() {
      this.loading = true;
      this.$emit("expenseSubmitted", this.expense);
    },
  },
  props: {
    income: {
      type: Number,
      required: true,
    },
    component: {
      Spinner,
    },
  },
};
</script>
<style scoped>
</style>