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
          <div class="title-setting">
            <i class="fas fa-cog fa-2x"></i>
            <h4 class="title-nav">Paramêtres</h4>
          </div>

          <div class="form-row">
            <p>Changez votre prénom:</p>

            <div class="option-field">
              <input
                v-model="firstname"
                class="form-row__input"
                type="text"
                placeholder="Prénom"
              />

              <div class="option-button" @click="editFirstname()">
                <span class="edit-logo-desktop"
                  >Valider <i class="fas fa-edit"></i
                ></span>
                <div class="edit-logo-mobile"><i class="fas fa-edit"></i></div>
              </div>
            </div>

            <p>Changez votre nom:</p>
            <div class="option-field">
              <input
                v-model="lastname"
                class="form-row__input"
                type="text"
                placeholder="Nom de Famille"
              />

              <div class="option-button" @click="editLastname()">
                <span class="edit-logo-desktop"
                  >Valider <i class="fas fa-edit"></i
                ></span>
                <div class="edit-logo-mobile"><i class="fas fa-edit"></i></div>
              </div>
            </div>
          </div>
          <p v-if="errors.length">
            <b>Le champs est vide!</b>
          </p>
          <p v-if="status == 'error_name'">
            <b
              >Les caractères spéciales et les chiffres ne sont pas acceptés!</b
            >
          </p>
          <hr />
          <p>Changez votre photo de profil</p>
          <div id="preview">
            <label v-if="url == null" class="custom-file-upload">
              <input
                type="file"
                accept="image/*"
                @change="openFile"
                id="inputFile"
                ref="inputFile"
              />
              <img class="image-avatar-profile" :src="user.imageUrl" />
            </label>
          </div>
          <div id="preview">
            <label v-if="url" class="custom-file-upload">
              <img class="image-avatar-profile" :src="url" />
            </label>
            <div v-if="url">
              <div @click="removeImage()">
                <i class="fas fa-2x fa-window-close"></i>
              </div>
            </div>
          </div>

          <div class="option-avatar">
            <input
              type="file"
              accept="image/*"
              @change="openFile"
              id="inputFile"
              ref="inputFile"
            />

            <div
              class="option-button option-button-avatar"
              @click="editAvatar()"
            >
              <!-- <span v-if="status == 'loading'">Validation en cours...</span> -->
              <span>Valider <i class="fas fa-check-square"></i></span>
            </div>
          </div>

          <hr />
          <link
            href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
            rel="stylesheet"
          />
          <button @click="openModal()" class="button button-delete">
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
      url: null,
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
        .dispatch("deleteProfile")
        
        .then(self.logout())
        
        
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
    removeImage: function () {
      (this.url = null), (this.imagesArray = null);
    },
    editAvatar: function () {
      // const self = this;
      if (this.url != null) {
        this.$store // Appel API dans le store
        .dispatch("editAvatar", {
          file: this.imagesArray,
        })
        .then(() => {
          location.reload();
        });
      }
      
    },
    openFile: function (e) {
      this.imagesArray = e.target.files[0];
      this.url = URL.createObjectURL(this.imagesArray);
    },
  },
};
</script>




<style scoped>
.image-avatar-profile {
  display: flex;
  justify-content: center;
  align-items: center;
}
span {
  font-weight: 500;
  text-transform: capitalize;
}
.option-field {
  display: flex;
  justify-content: center;
}
.edit-logo-mobile {
  display: none;
}
.button-delete {
  margin-top: 55px;
}
.option-button {
  background-color: rgba(170, 50, 220, 0.6);

  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 0px 8px 8px 0px;
}
.option-button:hover {
  cursor: pointer;
  background-color: grey;
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
.title-setting {
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
  align-items: center;
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
  border-radius: 8px 0px 0px 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;

  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}
.option-button-avatar {
  border-radius: 10px;
}
@media all and (max-width: 650px) {
  .option-field {
  }

  .edit-logo-mobile {
    display: block;
    padding-left: 5px;
  }
  .edit-logo-desktop {
    display: none;
  }
}
</style>