<template>
  <div>
    <span>- This Month -</span>
    <p class="uppercase text-2xl font-semibold mb-5">{{getMonthName(getCurrentMonth())}}</p>
    <div v-if="userMonthlyRecord">
      <ShowRecord :income="income" :expense="expense" :savings="savings"></ShowRecord>
    </div>
    <div v-else>
      <div v-if="step==1">
        <EnterRecord @incomeSubmitted="incomeSubmitted($event)"></EnterRecord>
      </div>
      <div v-else>
        <ConfirmRecord @reset="reset" @expenseSubmitted="expenseSubmitted($event)" :income="income"></ConfirmRecord>
      </div>
    </div>
  </div>
</template>
<script>
import EnterRecord from "./EnterRecord";
import ConfirmRecord from "./ConfirmRecord";
import ShowRecord from "./ShowRecord";
import { apiRequests } from "../../mixins/apis";
import { decodeJWT } from "../../mixins/decodeJWT";
import { inputRecord } from "../../mixins/inputRecord";
import { createRecord } from "../../mixins/createRecord";

export default {
  mixins: [apiRequests, decodeJWT, inputRecord, createRecord],
  name: "Input Record",
  description:
    "Component to facilitate for user to enter their records for the currrent month",
  components: {
    EnterRecord,
    ConfirmRecord,
    ShowRecord,
  },
  data() {
    return {
      step: 1,
      income: 0,
      expense: 0,
      savings: 0,
    };
  },
  methods: {
    incomeSubmitted(income) {
      this.income = Number(income);
      this.step = 2;
    },
    async expenseSubmitted(expense) {
      this.expense = Number(expense);
      this.savings = this.income - this.expense;
      let createRecordResponse = await this.createMonthlyRecord(
        this.income,
        this.expense,
        this.savings
      );
      if (createRecordResponse.status == "success") {
        // console.log("all records created");
        this.userMonthlyRecord = await this.getData(
          process.env.VUE_APP_API_BASE_URL +
            "records/" +
            this.userDetails.email +
            "/month/" +
            this.currentMonth
        );
        // console.log("monthly record retrieved");
      }
    },
    reset() {
      this.income = 0;
      this.step = 1;
    },
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
  updated() {
    if (this.userMonthlyRecord) {
      // console.log("page upadted with monthly record");
      let userRecord = this.userMonthlyRecord;
      userRecord.map((record) => this.sortRecords(record));
    }
  },
  props: {
    userMonthlyRecord: {
      required: true,
    },
  },
};
</script>
<style scoped>
</style>