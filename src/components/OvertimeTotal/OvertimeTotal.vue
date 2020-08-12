<template>
  <div>
    <div class="card p-5 rounded-t-lg shadow" :class="bgColor">
      <div class="grid grid-cols-2 sm:grid-cols-3">
        <div class="col-1 sm:col-span-2 font-medium">
          <h2 class="text-3xl">
            Total
            <br />
            {{recordType}}
          </h2>
        </div>
        <div class="text-right col-1 ml-auto justify-end">
          <OvertimeTotalDropdown @updatePeriod="updatePeriod($event)" :color="color"></OvertimeTotalDropdown>
        </div>
      </div>
    </div>
    <div class="rounded-b-lg shadow" :class="amountBgColor">
      <div class="py-10 text-4xl lg:text-5xl col-span-3 text-center flex justify-center">
        <span class="self-center text-xl">&#8358;</span>
        <h1 class="pl-2 amount font-semibold">{{numberWithCommas(amount)}}</h1>
      </div>
    </div>
  </div>
</template>
<script>
import OvertimeTotalDropdown from "./OvertimeTotalDropdown";
import { utils } from "../../mixins/utils";
export default {
  mixins: [utils],
  name: "Overtime Total",
  description:
    "Component to show the total income, expenses or savings amount over a period of time",
  data() {
    return {
      bgColor: "",
      amountBgColor: "",
    };
  },
  props: {
    recordType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "bg-blue-300",
    },
    color: {
      type: String,
    },
  },
  mounted() {
    this.renderColor(this.color);
  },
  methods: {
    updatePeriod(period) {
      this.$emit("updatePeriod", period);
    },
    renderColor(color) {
      this.bgColor = "bg-" + color + "-200 text-" + color + "-600";
      this.amountBgColor = "bg-" + color + "-300 text-" + color + "-600";
    },
  },
  components: {
    OvertimeTotalDropdown,
  },
};
</script>
<style>
.amount {
  font-family: "Montserrat", sans-serif;
}
</style>