<template>
  <div>
    <h1 class="text-2xl text-orange-700 font-semibold mt-6">Congratulations</h1>
    <p class="text-orange-700 pb-4">You saved</p>
    <div
      class="p-24 text-3xl col-span-3 text-center flex justify-center rounded-full text-orange-700 bg-orange-200 shadow-inner"
    >
      <span class="self-center text-xl">&#8358;</span>
      <h1 class="pl-2 amount font-semibold">{{numberWithCommas(savings)}}</h1>
    </div>
  </div>
</template>
<script>
import { utils } from "../../../mixins/utils";
export default {
  mixins: [utils],
  name: "User Saved",
  props: {
    savings: {
      type: Number,
    },
  },
};
</script>
<style scoped>
</style>