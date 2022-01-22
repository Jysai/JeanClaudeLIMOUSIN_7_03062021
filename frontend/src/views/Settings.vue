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
        <div class="form-row">
                 
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
        <input
            type="file"
            accept="image/*"
            @change="openFile"
            id="inputFile"
            ref="inputFile"
          />
        <button @click="editProfile()" class="button">
          <!-- <span v-if="status == 'loading'">Validation en cours...</span> -->
          <span>Valider mes options</span>
        </button>
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
  // el: "#app",
  name: "Setting",
  data: function () {
    return {
      mode: "setting",
     
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
  },
  // beforeDestroy: function () {
  //   this.$el.removeEventListener("click", this.onClick);
  //   // document.removeEventListener('click', this.onClick)
  // },

  computed: {
    ...mapState({
      user: "userInfos",
      
    }),
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
    editProfile: function () {
      // const self = this;
      this.$store // Appel API dans le store
        .dispatch("editProfile", {
          firstname: this.firstname,
          lastname: this.lastname,
          file: this.imagesArray,
        })
        .then(() => {
          this.$router.push("/settings");
          this.firstname = "";
          this.lastname = "";
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