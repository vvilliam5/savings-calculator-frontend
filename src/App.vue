<template>
  <div id="app">
    <div v-if="userLoggedIn">
      <SavingsCalculator @logout="logout"></SavingsCalculator>
    </div>
    <div class="h-screen grid align-center bg-gray-100" v-else>
      <Auth @userAuthenticated="userAuthenticated($event)"></Auth>
    </div>
  </div>
</template>

<script>
import SavingsCalculator from "./components/SavingsCalculator";
import Auth from "./components/Auth/Auth";
import { decodeJWT } from "./mixins/decodeJWT";
export default {
  name: "App",
  components: {
    SavingsCalculator,
    Auth,
  },
  mixins: [decodeJWT],
  data() {
    return {
      userLoggedIn: false,
    };
  },
  methods: {
    userAuthenticated(details) {
      window.sessionStorage.setItem("userSignedIn", true);
      window.sessionStorage.setItem("userDetails", details);
      this.logUserIn(details);
    },
    logUserIn(details) {
      if (this.decodeJWT(details)) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    },
    logout() {
      window.sessionStorage.removeItem("userDetails");
      window.sessionStorage.removeItem("userSignedIn  ");
      this.userLoggedIn = false;
    },
  },
  created() {
    this.logUserIn(window.sessionStorage.getItem("userDetails"));
  },
  updated() {
    this.logUserIn(window.sessionStorage.getItem("userDetails"));
  },
};
</script>

<style>
#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
}
</style>
