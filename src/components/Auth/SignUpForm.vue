<template>
  <form @submit.prevent="signUpAttempt" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 class="text-center text-xl font-semibold pb-4">SIGN UP</h2>
    <Alert @closePopUp="closeError()" v-if="loginError" :text="loginErrorMessage"></Alert>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="fullname">Full Name</label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="fullname"
        type="text"
        placeholder="Full Name"
        v-model="userSignUpDetails.fullName"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        placeholder="EmaIl"
        v-model="userSignUpDetails.email"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
      <input
        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Password"
        v-model="userSignUpDetails.password"
        required
      />
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="cpassword">Confirm Password</label>
      <input
        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="cpassword"
        type="password"
        placeholder="Password"
        v-model="cpassword"
        required
      />
      <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
    </div>
    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
      >
        <Spinner v-if="loading"></Spinner>
        <span class="pl-2 pr-1">Sign Up</span>
      </button>
      <a
        @click="login"
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#"
      >Log In?</a>
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
      userSignUpDetails: {
        fullName: "",
        email: "",
        password: "",
      },
      cpassword: "",
      loginError: false,
      loginErrorMessage: "",
      loading: false,
    };
  },
  components: {
    Alert,
    Spinner,
  },
  methods: {
    async signUpAttempt() {
      if (this.userSignUpDetails.password !== this.cpassword) {
        this.showError("Passwords do not match");
      } else {
        this.loading = true;
        let response = await this.postData(
          process.env.VUE_APP_API_BASE_URL + "users",
          this.userSignUpDetails
        );
        if (response.status == "success") {
          let logInResponse = await this.postData(
            process.env.VUE_APP_API_BASE_URL + "users/login",
            this.userSignUpDetails
          );
          if (logInResponse.status == "success") {
            this.loading = false;
            this.$emit("loginSuccess", logInResponse.data);
          } else {
            this.loading = false;
            this.showError(logInResponse.message);
          }
        } else {
          this.loading = false;
          this.showError(response.message);
        }
      }
    },
    login() {
      this.$emit("login");
    },
    showError(errorMessage) {
      this.loginError = true;
      this.loginErrorMessage = errorMessage;
    },
    closeError() {
      this.loginError = false;
    },
  },
};
</script>
<style scoped>
</style>