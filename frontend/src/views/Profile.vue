<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
      crossorigin="anonymous"
    />
    <div class="main-site">
      <nav-header></nav-header>
      <div class="main-container">
      <div class="card">
        <h1 class="card__title">Espace Perso</h1>
        <p class="card__subtitle">C'est mon profil</p>
        <p>
          Mon id: {{ user.id }} <br />
          Email: {{ user.email }} <br />
          Nom: {{ user.lastname }} <br />
          Prénom: {{ user.firstname }}
        </p>
      </div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Nav from "../components/Nav.vue";

export default {
  name: "Profile",

  components: {
    "nav-header": Nav,
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  methods: {

  },
};
</script>




<style scoped>

span {
  font-weight: 500;
  text-transform: capitalize;
}
h3 {
  margin: 20px;
}
h4 {
  margin-left: 20px;
}

.fas {
  width: 20px;
}

p {
  text-align: center;
}
.textarea-row {
  width: 100%;
  resize: none;
  overflow: hidden;
  height: auto;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  color: black;
}

.button {
  border-radius: 35px;
}

.form-row-btn {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  width: 100px;
  border-radius: 35px;
  justify-content: flex-end;
}
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}

</style>