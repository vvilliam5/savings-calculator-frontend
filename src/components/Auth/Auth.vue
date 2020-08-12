<template>
  <div class="w-full max-w-xs mx-auto my-auto">
    <AuthTitle></AuthTitle>
    <component
      @loginSuccess="userLoggedIn($event)"
      @signup="signup"
      @login="login"
      :is="renderComp"
    ></component>
    <p class="text-center text-gray-500 text-xs">&copy;2020 Savings Calculator. All rights reserved.</p>
  </div>
</template>
<script>
import AuthTitle from "./AiuthTitle";
import LogInForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
export default {
  name: "Auth",
  description: "Authorization page to make sure suer is signed in",
  data() {
    return {
      renderComp: "LogInForm",
    };
  },
  methods: {
    userLoggedIn(details) {
      this.$emit("userAuthenticated", details);
    },
    signup() {
      this.renderComp = "SignUpForm";
    },
    login() {
      this.renderComp = "LogInForm";
    },
  },
  components: {
    AuthTitle,
    LogInForm,
    SignUpForm,
  },
};
</script>
<style scoped>
</style>