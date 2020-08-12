<template>
  <div class="h-screen grid items-center justify-center bg-gray-100">
    <div class="flex">
      <Spinner color="black"></Spinner>
      <span class="pl-2">Fetching your records...</span>
    </div>
  </div>
</template>
<script>
import Spinner from "./Spinner";
export default {
  components: {
    Spinner,
  },
};
</script>
<style scoped>
</style>