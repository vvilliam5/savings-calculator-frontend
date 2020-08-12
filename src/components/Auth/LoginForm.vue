<template>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="loginAttempt">
    <h2 class="text-center text-xl font-semibold pb-4">LOG IN</h2>
    <Alert @closePopUp="closeError()" v-if="loginError" :text="loginErrorMessage"></Alert>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        placeholder="EmaIl"
        v-model.trim="loginCredentials.email"
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
      <input
        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Password"
        v-model="loginCredentials.password"
      />
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
        type="submit"
      >
        <Spinner v-if="loading"></Spinner>
        <span class="pl-2 pr-1">Log In</span>
      </button>
      <a
        @click="signUp"
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#"
      >Sign Up?</a>
    </div>
  </form>
</template>
<script>
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { apiRequests } from "../../mixins/apis";
export default {
  mixins: [apiRequests],
  data() {
    return {
      loginCredentials: {
        email: "",
        password: "",
      },
      loginError: false,
      loginErrorMessage: "",
      loading: false,
    };
  },
  methods: {
    async loginAttempt() {
      this.loading = true;
      let logInResponse = await this.postData(
        process.env.VUE_APP_API_BASE_URL + "users/login",
        this.loginCredentials
      );
      if (logInResponse.status == "success") {
        this.loading = false;
        this.$emit("loginSuccess", logInResponse.data);
      } else {
        this.loading = false;
        this.showError(logInResponse.message);
      }
    },
    showError(errorMessage) {
      this.loginError = true;
      this.loginErrorMessage = errorMessage;
    },
    closeError() {
      this.loginError = false;
    },
    signUp() {
      this.$emit("signup");
    },
    // await this.getData(process.env.VUE_APP_API_BASE_URL);
  },
  components: {
    Alert,
    Spinner,
  },
};
</script>
<style scoped>
/* .appear-enter {
  opacity: 0;
}
.appear-enter-active {
  transition: opacity 1 3s;
}
.appear-leave {
}
.appear-leave-active {
} */
</style>