<template>
  <div class="main-site">
    <nav class="main-menu-nav">
      <img
        class="logo-full"
        alt="Groupomania logo"
        src="../assets/logo-full.webp"
      />
    </nav>
    <div class="main-container">
      <div class="card">
        <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="card__title" v-else>Inscription</h1>
        <p class="card__subtitle" v-if="mode == 'login'">
          Tu n'as pas encore de compte ?<span
            class="card__action"
            @click="switchToCreateAccount()"
            >Créer un compte</span
          >
        </p>
        <p class="card__subtitle" v-else>
          Tu as déjà un compte ?
          <span class="card__action" @click="switchToLogin()"
            >Se connecter</span
          >
        </p>
        <div class="form-row">
          <input
            v-model="email"
            class="form-row__input"
            type="text"
            placeholder="Adresse mail"
          />
        </div>
        <div class="form-row" v-if="mode == 'create'">
          <input
            v-model="firstname"
            class="form-row__input"
            type="text"
            placeholder="Prénom"
          />
          <input
            v-model="lastname"
            class="form-row__input"
            type="text"
            placeholder="Nom de Famille"
          />
        </div>
        <div class="form-row">
          <input
            v-model="password"
            class="form-row__input"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
          <p class="error"> Adresse mail et/ou mot de passe invalide</p>
        </div>

        <div class="card" v-bind:key="index" v-for="(error, index) in errors">
          
            <p class="error">{{ error }}</p>
          
        </div>
        <div class="form-row">
          <button @click="login()" class="button" v-if="mode == 'login'">
            <span>Connexion</span>
          </button>
          <button @click="createAccount()" class="button" v-else>
            <span>Créer mon compte</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      error: "",
    };
  },

  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/feed");
      return;
    }
  },
  computed: {
    ...mapState(["status"]),
    ...mapState({
      errors: "getError",
    }),
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      // Permet de s'authentifier
      const self = this;
      this.$store // Appel API dans le store
        .dispatch("loginAuth", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.$router.push("/feed"); // La route quand l'user est authentifié
            location.reload()
          },
          function (error) {
            console.log(error);
          }
        )
        
        
    },
    createAccount: function () {
      // Création du compte
      const self = this;
      this.$store // Appel API dans le store
        .dispatch("createAccount", {
          email: this.email,
          lastname: this.lastname,
          firstname: this.firstname,
          password: this.password,
        })
        .then(
          function () {
            self.login(); // Quand le compte pour s'authentifier directement 
            
          },
          function (error) {
            console.log(error);
          }
        )
        
        
    },
  },
};
</script>







<style scoped>
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
.logo-full {
  height: auto;
  width: 200px;
}

.main-menu-nav {
  display: flex;
  align-items: center;
  height: 50px;
  top: 0;
  position: fixed;
  width: 100%;
  background-color: rgb(31, 31, 31);
  justify-content: center;
  z-index: 1;
  padding: 0px 15px 0px 15px;
}

.logo {
  width: 10%;
}

.menu-nav {
  height: auto;
  display: flex;

  padding: 8px;
}
</style>