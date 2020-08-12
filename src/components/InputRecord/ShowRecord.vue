<template>
  <div class="w-full lg:w-2/3 mx-auto bg-orange-100 p-16 rounded-lg shadow-lg">
    <div class="text-left text-sm grid">
      <ul class="list-disc">
        <li>
          <span class="text-orange-700 font-light">
            You made
            <span class="font-semibold">&#8358;{{numberWithCommas(income)}}</span> this month
          </span>
        </li>
        <li>
          <span class="text-orange-700 font-light">
            You spent
            <span class="font-semibold">&#8358;{{numberWithCommas(expense)}}</span> this month
          </span>
        </li>
      </ul>
    </div>
    <div v-if="savings > 0">
      <UserSaved :savings="savings"></UserSaved>
    </div>
    <div v-else>
      <UserDidNotSave></UserDidNotSave>
    </div>
  </div>
</template>
<script>
import { utils } from "../../mixins/utils";
import UserSaved from "./ShowRecord/UserSaved";
import UserDidNotSave from "./ShowRecord/UserDidNotSave";
export default {
  mixins: [utils],
  props: {
    income: {
      type: Number,
      required: true,
    },
    expense: {
      type: Number,
      required: true,
    },
    savings: {
      type: Number,
      required: true,
    },
  },
  components: {
    UserSaved,
    UserDidNotSave,
  },
};
</script>
<style scoped>
</style>