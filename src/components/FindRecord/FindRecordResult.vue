<template>
  <div class="bg-white my-10 p-16 rounded shadow-sm">
    <div v-if="state == 'idle'" class="p-4">
      <h2 class="text-2xl font-medium">Make A Selection, Lets Go</h2>
      <!-- <div class="grid md:grid-cols-3 py-4 gap-4">
        <h2>Please select a month</h2>
      </div>-->
    </div>
    <div v-else-if="state == 'loading'" class="flex items-center justify-center space-x-2">
      <Spinner color="black"></Spinner>
      <p>Loading...</p>
    </div>
    <div v-else-if="state == 'loaded'">
      <h1 class="uppercase text-lg font-semibold pb-3">{{month}}</h1>
      <div class="grid md:grid-cols-3 py-4">
        <div class>
          <h2
            class="py-4 bg-blue-200 text-blue-600 font-semibold rounded-tl-full lg:rounded-tl-lg shadow-sm"
          >Income</h2>
          <div class="text-center flex justify-center pt-10 space-x-1 bg-blue-300 text-blue-700">
            <span class="self-center text-sm">&#8358;</span>
            <h1 class="amount font-extrabold">{{numberWithCommas(income)}}</h1>
          </div>
          <div class="h-10 bg-blue-300 lg:rounded-bl-full"></div>
        </div>
        <div class>
          <h2 class="py-4 bg-red-200 text-red-600 font-semibold shadow-sm">Expense</h2>
          <div class="text-center flex justify-center py-10 space-x-1 bg-red-300 text-red-700">
            <span class="self-center text-sm">&#8358;</span>
            <h1 class="amount font-extrabold">{{numberWithCommas(expense)}}</h1>
          </div>
        </div>
        <div class>
          <h2
            class="py-4 bg-green-200 text-green-600 font-semibold shadow-sm lg:rounded-tr-lg"
          >Savings</h2>
          <div class="text-center flex justify-center pt-10 space-x-1 bg-green-300 text-green-700">
            <span class="self-center text-sm">&#8358;</span>
            <h1 class="amount font-extrabold">{{numberWithCommas(savings)}}</h1>
          </div>
          <div class="h-10 bg-green-300 lg:rounded-br-full rounded-br-full"></div>
        </div>
      </div>
    </div>
    <div v-else-if="state == 'nodata'">
      <h1 class="uppercase text-lg font-semibold pb-3">{{month}}</h1>
      <h2 class="font-semibold text-lg text-red-700">Oops</h2>
      <p class="text-red-700">No record for this month</p>
    </div>
  </div>
</template>
<script>
import Spinner from "../ui/Spinner";
import { utils } from "../../mixins/utils";
export default {
  mixins: [utils],
  data() {
    return {
      income: 0,
      expense: 0,
      savings: 0,
    };
  },
  props: {
    state: {
      type: String,
    },
    month: {
      type: String,
    },
    monthRecord: {
      type: Array,
    },
  },
  methods: {
    sortRecords(record) {
      if (record.type == "inc") {
        this.income = record.amount;
      } else if (record.type == "exp") {
        this.expense = record.amount;
      } else if (record.type == "sav") {
        this.savings = record.amount;
      }
    },
  },
  components: {
    Spinner,
  },
  updated() {
    this.monthRecord.map((record) => this.sortRecords(record));
  },
};
</script>
<style scoped>
</style>