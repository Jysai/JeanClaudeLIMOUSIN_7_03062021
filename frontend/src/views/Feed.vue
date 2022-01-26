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
        <div class="card-profile">
          <img class="image-avatar-profile" :src="profileUsers.imageUrl" />
          <div class="information-profile">
            <span class="nickname-profile"
              >{{ profileUsers.firstname }} {{ profileUsers.lastname }}</span
            >

            <p class="edit-profil-texte" @click="editProfil">
              Editer votre profil
            </p>
            <div class="edit-profil-logo" @click="editProfil">
              <i class="fas fa-user-edit"></i>
            </div>
          </div>
        </div>
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

        <div v-if="messages == 0" class="card">
          <div class="message-no-post">
            <p>Le fil d'actualité est vide</p>
            <img src="../assets/sad-pablo-lonely.gif" />
          </div>
        </div>
        <div v-else>
          <div
            class="card"
            v-bind:key="index"
            v-for="(message, index) in messages"
          >
            <div class="icon">
              <div
                v-if="
                  profileUsers.id === 60 || message.UserId == profileUsers.id
                "
              >
                <div @click="deletePost(message.id)">
                  <i class="fas fa-trash-alt fas-post"></i>
                </div>
              </div>
              <div v-if="message.UserId == profileUsers.id"></div>
            </div>

            <div class="identity">
              <img class="image-avatar" :src="message.User.imageUrl" />
              <div class="information-post">
                <p class="nickname">
                  {{ message.User.firstname }} {{ message.User.lastname }}
                </p>
                <p class="time">
                  {{
                    new Date(message.createdAt).toLocaleString("fr-FR", {
                      hour12: false,
                    })
                  }}
                </p>
              </div>
            </div>
            <p class="message-content">{{ message.content }}</p>
            <div class="image-parent">
              <img class="image-container" :src="message.imageUrl" />
            </div>
            <div class="like">
              <div
                class="like-heart"
                v-on:click.prevent="likeMessage(message.id)"
              >
                <i class="fas fa-heart fas-post"></i>
              </div>
              <p>{{ message.likes }}</p>
            </div>

            <hr />

            <div v-bind:key="index" v-for="(comment, index) in comments">
              <div class="commment-row" v-if="comment.messageId == message.id">
                <div class="icon">
                  <div
                    v-if="
                      profileUsers.id === 60 ||
                      comment.UserId == profileUsers.id
                    "
                  >
                    <div class="icon-edit-delete">
                      <div @click="deleteComment(comment.id)">
                        <i class="fas fa-trash-alt fas-post"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="nickname">
                  {{ comment.User.firstname }} {{ comment.User.lastname }}
                </p>
                <p class="time">
                  {{
                    new Date(comment.createdAt).toLocaleString("fr-FR", {
                      hour12: false,
                    })
                  }}
                </p>
                <div class="comment">
                  <p>{{ comment.content }}</p>
                </div>
              </div>
            </div>
            <div class="comment">
              <input
                v-model="contentComment[message.id]"
                class="textarea-row-comment"
                type="text-area"
                placeholder="Ecrivez un commentaire..."
              />

              <button
                v-on:click.prevent="createComment(message.id)"
                class="button-comment"
              >
                <p class="send-desktop">Commenter</p>
                <p class="send-mobile">
                  <i class="fas fa-paper-plane"></i>
                </p>
              </button>
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
  name: "Message",
  components: {
    "nav-header": Nav,
  },
  data: function () {
    return {
      mode: "message",
      contentPost: "",
      imagesArray: null,
      contentComment: new Map(),
      errors: [],
      url: null,
      contentMessage: new Map(),
      contentEditPost: "",
    };
  },

  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getMessageInfos");
    this.$store.dispatch("getAllUsers");
    this.$store.dispatch("getUserInfos");
    this.$el.addEventListener("click", this.onClick);
    this.$store.dispatch("getComment");
  },

  computed: {
    ...mapState({
      messages: "messageInfos",
      users: "allUsers",
      comments: "getComment",
      profileUsers: "userInfos",
    }),
    ...mapState(["status"]),
  },
  methods: {
    getComments() {
      this.$store.dispatch("getComment");
    },

    getPosts() {
      this.$store.dispatch("getMessageInfos");
    },

    likeMessage(id) {
      this.$store // Appel API dans le store
        .dispatch("likeMessage", id)
        .then(() => {
          this.$store.dispatch("getMessageInfos");
        });
    },

    createComment: function (id) {
      // const self = this;

      this.$store
        .dispatch("createComment", {
          content: this.contentComment[id],
          id: id,
        })
        .then(() => {
          this.getComments();
          this.contentComment[id] = "";
        });
    },
    editProfil: function () {
      this.$router.push("/settings");
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

    editOpen: function () {},

    editPost: function (id) {
      // const self = this;
      this.$store // Appel API dans le store
        .dispatch("editPost", {
          content: this.contentEditPost,
          file: this.imagesArray,
          id: id,
        })
        .then(() => {
          this.getPosts();
          this.contentEditPost = "";
        });
    },

    deletePost: function (id) {
      // const self = this;
      this.$store.dispatch("deletePost", id).then(() => {
        this.getPosts();
      });
    },
    deleteComment: function (id) {
      console.log(id);
      this.$store.dispatch("deleteComment", id).then(() => {
        this.getComments();
      });
    },
    profil(userId) {
      const router = this.$router;
      setTimeout(function () {
        router.push(`/user/${userId}`);
      }, 10);
    },
  },
};
</script>


<style scoped>
.card-profile {
  display: flex;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: rgb(20, 20, 20);
  border-radius: 15px 15px 0px 0px;
}

.information-profile {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
}

.nickname-profile {
  display: flex;
  align-items: center;
}

.pre-post {
  background-color: rgb(20, 20, 20);
}
.image-parent {
  display: flex;
  justify-content: center;
}
.image-container {
  object-fit: scale-down;
}
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
.identity {
  display: flex;
}
.information-post {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  justify-content: center;
}
.nickname {
  font-weight: 500;
  text-transform: capitalize;
}
.time {
  font-weight: 100;
  font-size: 10px;
}
.like {
  display: flex;
  align-items: center;
}
.like-heart {
  cursor: pointer;
}
.icon {
  float: right;
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