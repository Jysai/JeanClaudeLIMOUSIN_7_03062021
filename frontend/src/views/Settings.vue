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
         <i class="fas fa-cog fa-2x"></i>
          <h4 class="title-nav">Paramêtres</h4>
          <div class="form-row">
            <p>Changez votre prénom:</p>

            <div>
              <input
                v-model="firstname"
                class="form-row__input"
                type="text"
                placeholder="Prénom"
              />

              <button @click="editFirstname()">
                <span>Valider <i class="fas fa-edit"></i></span>
              </button>
            </div>

            <div>
              <p>Changez votre nom:</p>
              <input
                v-model="lastname"
                class="form-row__input"
                type="text"
                placeholder="Nom de Famille"
              />

              <button @click="editLastname()">
                <span>Valider <i class="fas fa-edit"></i></span>
              </button>
            </div>
          </div>
          <p v-if="errors.length">
            <b
              >Le champs est vide!</b
            >
          </p>
          <p v-if="status == 'error_name'">
            <b
              >Les caractères spéciales et les chiffres ne sont pas acceptés!</b
            >
          </p>
          <hr />
          <p>Changez votre photo de profil</p>
          <div>
            <input
              type="file"
              accept="image/*"
              @change="openFile"
              id="inputFile"
              ref="inputFile"
            />
            <button @click="editAvatar()">
              <!-- <span v-if="status == 'loading'">Validation en cours...</span> -->
              <span>Valider <i class="fas fa-check-square"></i></span>
            </button>
          </div>

          <hr />
          <link
            href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
            rel="stylesheet"
          />
          <button @click="openModal()" class="button">
            Supprimer votre compte
          </button>

          <div id="myModal" class="modal" ref="myModal">
            <div id="modal-content" class="modal-content animation-1">
              <header class="modal-header">
                <p class="modal-header-title">
                  Vous êtes sur le point de supprimer votre compte
                </p>
              </header>

              <div class="modal-body">
                <button class="modal-button" @click="deleteProfile()">
                  Valider
                </button>
                <button class="modal-button" @click="closeModal()">
                  Annuler
                </button>
              </div>

              <footer class="modal-footer"></footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Nav from "../components/Nav.vue";

export default {
  el: "#app",
  name: "Setting",
  data: function () {
    return {
      mode: "setting",
      errors: [],
      firstname: "",
      lastname: "",
      imagesArray: null,
    };
  },

  components: {
    "nav-header": Nav,
  },
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
    this.$el.addEventListener("click", this.onClick);
    this.$store.dispatch("getComment");
  },
  // beforeDestroy: function () {
  //   this.$el.removeEventListener("click", this.onClick);
  //   // document.removeEventListener('click', this.onClick)
  // },

  computed: {
    ...mapState({
      user: "userInfos",
    }),
    ...mapState(["status"]),
  },

  methods: {
    logout: function () {
      // Permet de se déconnecter
      this.$store.commit("logout");
      this.$router.push("/");
    },

    deleteProfile: function () {
      const self = this;
      this.$store // Appel API dans le store
        .dispatch("deleteProfile", {})
        .then(
          function () {
            self.logout();
          },
          function (error) {
            console.log(error);
          }
        );
    },
    onClick: function (ev) {
      if (ev.target == this.$refs.myModal) {
        this.$refs.myModal.style.display = "none";
      }
    },
    openModal: function () {
      this.$refs.myModal.style.display = "block";
    },
    closeModal: function () {
      this.$refs.myModal.style.display = "none";
    },
    editLastname: function () {
      // const self = this;
      this.errors = [];
      if (this.lastname == "") {
        this.errors.push("");
      } else {
        this.$store // Appel API dans le store
          .dispatch("editLastname", {
            lastname: this.lastname,
          })
          .then(() => {
            this.$router.push("/settings");
            this.lastname = "";
          });
      }
    },
    editFirstname: function () {
      // const self = this;
      this.errors = [];
      if (this.firstname == "") {
        this.errors.push("");
      } else {
        this.$store // Appel API dans le store
          .dispatch("editFirstname", {
            firstname: this.firstname,
          })
          .then(() => {
            this.$router.push("/settings");
            this.firstname = "";
          });
      }
    },
    editAvatar: function () {
      // const self = this;
      this.$store // Appel API dans le store
        .dispatch("editAvatar", {
          file: this.imagesArray,
        })
        .then(() => {
          this.$router.push("/settings");
        });
    },
    openFile: function (e) {
      this.imagesArray = e.target.files[0];
    },
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
.logo {
  width: 100%;
}
.fas {
  width: 20px;
}

p {
  text-align: center;
}

.button {
  border-radius: 35px;
}
.textarea-row::placeholder {
  color: #aaaaaa;
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
  flex-direction: column;
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