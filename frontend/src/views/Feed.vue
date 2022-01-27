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
        <user-information></user-information>
        <div class="card card-placeholder">
          <textarea
            v-model="contentPost"
            class="textarea-row"
            type="text-area"
            placeholder="Quoi de neuf?"
          ></textarea>

          <label class="custom-file-upload">
            <input
              type="file"
              accept="image/*"
              @change="openFile"
              id="inputFile"
              ref="inputFile"
            />
            <i class="fas fa-images"></i>
          </label>

          <div id="preview">
            <img v-if="url" :src="url" />
          </div>
          <div v-if="url">
            <div @click="removeImage()">
              <i class="fas fa-2x fa-window-close"></i>
            </div>
          </div>

          <div class="form-row-btn">
            <button id="app" v-on:click.prevent="creationPost" class="button">
              Publier
            </button>
          </div>
          <p v-if="errors.length">
            <b
              >Le contenu de votre publication est vide, veuillez ajouter du
              texte ou/et une image.</b
            >
          </p>
          <p v-if="status == 'error_message'">
            <b>Le contenu de votre publication est vide!</b>
          </p>
        </div>
        <feed></feed>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import Nav from "../components/Nav.vue";
import UserInformation from "../components/User-Information.vue";
import Feed from "../components/Feed.vue";

export default {
  el: "#app",
  name: "Message",
  components: {
    "nav-header": Nav,
    "user-information": UserInformation,
    "feed": Feed,
  },
  data: function () {
    return {
      mode: "message",
      contentPost: "",
      imagesArray: null,
      contentComment: new Map(),
      errors: [],
      url: null,
    };
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
    ...mapState({}),
    ...mapState(["status"]),
  },
  methods: {
    getComments() {
      this.$store.dispatch("getComment");
    },

    getPosts() {
      this.$store.dispatch("getMessageInfos");
    },

    removeImage: function () {
      (this.url = null), (this.imagesArray = null);
    },
    creationPost: function () {
      this.errors = [];
      if (this.contentPost == "" && this.imagesArray == null) {
        this.errors.push("");
      } else {
        // const self = this;
        this.$store // Appel API dans le store
          .dispatch("createNewPost", {
            content: this.contentPost,
            file: this.imagesArray,
          })

          .then(() => {
            this.removeImage();
            this.getPosts();
            this.contentPost = "";
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


.image-upload > input {
  display: none;
}
.icon-download {
  color: white;
  width: 25px;
  height: 25px;
  padding: 15px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.icon-download:hover {
  background-color: pink;

  border-radius: 100%;
  cursor: pointer;
  color: black;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.nickname {
  font-weight: 500;
  text-transform: capitalize;
}

h3 {
  margin: 20px;
}
h4 {
  margin-left: 20px;
}

.card-contact {
  display: flex;
  flex-direction: row;
  margin: 20px;
  justify-content: flex-start;
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
  background: #424242;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #555555;
}

.loader {
  margin: 100px auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #aa2d52,
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.5),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.7),
      1.8em -1.8em 0 0em #aa2d52, 2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.5),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.7), 2.5em 0em 0 0em #aa2d52,
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.5),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.7), 1.75em 1.75em 0 0em #aa2d52,
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.5),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.7), 0em 2.5em 0 0em #aa2d52,
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.5),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.7), -1.8em 1.8em 0 0em #aa2d52,
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.5),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.7), -2.6em 0em 0 0em #aa2d52,
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.5),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.7), -1.8em -1.8em 0 0em #aa2d52;
  }
}
@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #aa2d52,
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.5),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.7),
      1.8em -1.8em 0 0em #aa2d52, 2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.5),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.7), 2.5em 0em 0 0em #aa2d52,
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.5),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.7), 1.75em 1.75em 0 0em #aa2d52,
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.5),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.7), 0em 2.5em 0 0em #aa2d52,
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.2),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.5),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.7), -1.8em 1.8em 0 0em #aa2d52,
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.5),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.7), -2.6em 0em 0 0em #aa2d52,
      -1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170, 45, 82, 0.2),
      1.8em -1.8em 0 0em rgba(170, 45, 82, 0.2),
      2.5em 0em 0 0em rgba(170, 45, 82, 0.2),
      1.75em 1.75em 0 0em rgba(170, 45, 82, 0.2),
      0em 2.5em 0 0em rgba(170, 45, 82, 0.2),
      -1.8em 1.8em 0 0em rgba(170, 45, 82, 0.5),
      -2.6em 0em 0 0em rgba(170, 45, 82, 0.7), -1.8em -1.8em 0 0em #aa2d52;
  }
}
</style>