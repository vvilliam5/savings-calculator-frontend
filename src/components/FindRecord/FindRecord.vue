<template>
  <div>
    <h1 class="font-semibold text-lg">See how you did in earlier Months</h1>
    <div class="grid sm:grid-cols-5 gap-1">
      <div class="col sm:col-span-2">
        <FindRecordForm @monthSelected="monthSelected($event)"></FindRecordForm>
      </div>
      <div class="col sm:col-span-3">
        <FindRecordResult :state="state" :month="month" :monthRecord="monthRecord"></FindRecordResult>
      </div>
    </div>
  </div>
</template>
<script>
import FindRecordForm from "./FindRecordForm";
import FindRecordResult from "./FindRecordResult";
import { decodeJWT } from "../../mixins/decodeJWT";
import { apiRequests } from "../../mixins/apis";
export default {
  mixins: [decodeJWT, apiRequests],
  name: "Find Record",
  components: {
    FindRecordForm,
    FindRecordResult,
  },
  data() {
    return {
      userDetail: this.getUserDetails(),
      month: "",
      monthRecord: [],
      state: "idle",
    };
  },
  methods: {
    async monthSelected(month) {
      this.state = "loading";
      this.month = month;
      let response = await this.getData(
        process.env.VUE_APP_API_BASE_URL +
          "records/" +
          this.userDetail.email +
          "/month/" +
          month
      );
      if (response.status == "success") {
        if (response.data.length > 0) {
          this.monthRecord = response.data;
          this.state = "loaded";
        } else {
          this.monthRecord = response.data;
          this.state = "nodata";
        }
      }
    },
  },
};
</script>
<style scoped>
</style>