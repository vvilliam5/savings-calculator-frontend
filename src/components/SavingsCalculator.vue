<template>
  <div>
    <template v-if="loading">
      <Loader></Loader>
    </template>
    <template v-else id="app">
      <div class="bg-gray-100">
        <NavBar @logout="logout"></NavBar>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <div class="grid md:grid-cols-3 gap-4 container mx-auto">
          <div>
            <OvertimeTotal
              @updatePeriod="updateSavPeriod($event)"
              recordType="Savings"
              :amount="savingsAmount"
              color="green"
            ></OvertimeTotal>
          </div>
          <div>
            <OvertimeTotal
              @updatePeriod="updateIncPeriod($event)"
              recordType="Income"
              :amount="incomeAmount"
              color="blue"
            ></OvertimeTotal>
          </div>
          <div>
            <OvertimeTotal
              @updatePeriod="updateExpPeriod($event)"
              recordType="Expenses"
              :amount="expAmount"
              color="red"
            ></OvertimeTotal>
          </div>
        </div>
        <div class="grid grid-cols-1 container mx-auto md:w-1/2 text-center my-20">
          <InputRecord :userMonthlyRecord="userCurrentMonthData"></InputRecord>
        </div>
        <div class="grid grid-cols-1 container mx-auto text-center">
          <FindRecord></FindRecord>
        </div>
        <Footer></Footer>
      </div>
    </template>
  </div>
</template>

<script>
import Loader from "./ui/Loader";
import NavBar from "./layouts/navbar/NavBar";
import OvertimeTotal from "./OvertimeTotal/OvertimeTotal";
import InputRecord from "./InputRecord/InputRecord";
import FindRecord from "./FindRecord/FindRecord";
import { apiRequests } from "../mixins/apis";
import { decodeJWT } from "../mixins/decodeJWT";
import { userData } from "../mixins/userData";
import { inputRecord } from "../mixins/inputRecord";
import Footer from "./layouts/Footer";
export default {
  name: "App",
  mixins: [apiRequests, decodeJWT, userData, inputRecord],
  components: {
    Loader,
    NavBar,
    OvertimeTotal,
    InputRecord,
    FindRecord,
    Footer,
  },
  data() {
    return {
      loading: true,
      userDetails: {},
      userRecords: [],
      savingsAmount: 0,
      savingsRecordtoShow: 0,
      incomeAmount: 0,
      incomeRecordtoShow: 0,
      expAmount: 0,
      expRecordtoShow: 0,
    };
  },
  created() {
    //get user details
    this.userDetails = this.getUserDetails();
  },
  async mounted() {
    //fetch users record
    this.userRecords = await this.fetchUserRecords();
    //intitaialze total amounts
    this.initializeTotals();
    //
    this.runInputRecord();
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    async fetchUserRecords() {
      let response = await this.getData(
        process.env.VUE_APP_API_BASE_URL + "records/" + this.userDetails.email
      );
      if (response.status == "success") {
        this.loading = false;
        return response.data;
      } else {
        console.log("failed");
      }
    },
    initializeTotals() {
      //extract user records for savings
      this.userTotalSaved = this.getTotalType(this.userRecords, "savings");
      //calculate total amount by months, all by default
      this.updateSavingsTotal();
      //extract user records for income
      this.userTotalIncome = this.getTotalType(this.userRecords, "income");
      this.updateIncomeTotal();
      //extract user records for expenses
      this.userTotalExp = this.getTotalType(this.userRecords, "expense");
      this.updateExpenseTotal();
    },
    updateSavPeriod(period) {
      this.savingsRecordtoShow = period;
      this.updateSavingsTotal();
    },
    updateIncPeriod(period) {
      this.incomeRecordtoShow = period;
      this.updateIncomeTotal();
    },
    updateExpPeriod(period) {
      this.expRecordtoShow = period;
      this.updateExpenseTotal();
    },
  },
};
</script>

<style>
#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
