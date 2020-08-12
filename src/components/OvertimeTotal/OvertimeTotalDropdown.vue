<template>
  <!-- <div class="p-2 w-min-content ml-auto bg-gray-200 rounded-full flex">
    <p>All time</p>
    <svg
      class="fill-current h-4 w-4 self-center pl-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </div>-->
  <div class="flex flex-wrap -mx-3 mb-6 max-w-max-content">
    <div class="w-full px-3 mb-6 md:mb-0">
      <div class="relative">
        <select
          class="block appearance-none w-full py-3 px-4 pr-8 rounded leading-tight focus:outline-none cursor-pointer"
          :class=" bgColor"
          id="grid-state"
          @change="onChange($event)"
        >
          <option value="0">All time</option>
          <option value="1">1 month</option>
          <option value="3">3 months</option>
          <option value="6">6 months</option>
          <option value="9">9 months</option>
          <option value="12">12 months</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bgColor: "",
    };
  },
  props: {
    color: {
      type: String,
    },
  },
  mounted() {
    this.renderColor(this.color);
  },
  methods: {
    onChange(event) {
      this.$emit("updatePeriod", Number(event.target.value));
    },
    renderColor(color) {
      this.bgColor =
        "bg-" +
        color +
        "-100 text-" +
        color +
        "-700 focus:bg-" +
        color +
        "-100 focus:border-gray-500";
    },
  },
};
</script>
<style scoped>
.max-w-max-content {
  max-width: max-content;
}
</style>