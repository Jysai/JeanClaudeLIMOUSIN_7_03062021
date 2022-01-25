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
          <span>Vos publications</span>
        </div>
        <div v-bind:key="index" v-for="(message, index) in messages">
          <div class="card" v-if="message.UserId == profileUsers.id">
            <div class="icon">
              <div @click="deletePost(message.id)">
                <i class="fas fa-trash-alt fas-post"></i>
              </div>

              <i class="fas fa-edit fas-post"></i>
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
              <p>{{ message.likes }}</p>
              <div class="like-heart">
                <i class="fas fa-heart"></i>
              </div>
            </div>

            <hr />

            <div v-bind:key="index" v-for="(comment, index) in comments">
              <div class="commment-row" v-if="comment.messageId == message.id">
                <div class="icon">
                  <div v-if="comment.UserId == profileUsers.id">
                    <div @click="deleteComment(comment.id)">
                      <i class="fas fa-trash-alt fas-post"></i>
                    </div>
                  </div>

                  <div v-if="comment.UserId == profileUsers.id">
                    <i class="fas fa-edit fas-post"></i>
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
               <p class="send-desktop">
                Commenter
              </p>
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
  name: "Profile",
  data: function () {
    return {
      mode: "message",
      contentPost: "",
      imagesArray: null,
      contentComment: new Map(),
      errors: [],
    };
  },
  components: {
    "nav-header": Nav,
  },
  mounted: function () {
    this.$store.dispatch("getMessageInfos");
    this.$store.dispatch("getUserInfos");
    this.$store.dispatch("getComment");
  },

  computed: {
    ...mapState({
      messages: "messageInfos",
      profileUsers: "userInfos",
      comments: "getComment",
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
    creationPost: function () {
      const self = this;
      this.errors = [];
      if (this.contentPost == "" && this.imagesArray == null) {
        this.errors.push("");
      } else {
        this.$store // Appel API dans le store
          .dispatch("createNewPost", {
            content: this.contentPost,
            file: this.imagesArray,
          })
          .then(() => {
            self.getPosts();
            self.contentPost = "";
            this.imagesArray = null;
          });
      }
    },
    openFile: function (e) {
      this.imagesArray = e.target.files[0];
    },
    editProfil: function () {
      this.$router.push("/settings");
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

.comment {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  
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
/* .card-profile {
  display: flex;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: rgb(20, 20, 20);
  border-radius: 15px 15px 0px 0px;
}

.card {
  max-width: 100%;

  background: white;
  border-radius: 0px;
  padding: 32px;

  margin-bottom: 15px;
  width: 100%;
  background-color: rgb(26, 26, 26);
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

.comment {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap, ss;
}
.textarea-row-comment {
  width: 100%;
  resize: none;
  overflow: hidden;
  padding: 8px;
  border: none;
  border-radius: 25px 0px 0px 25px;
  background: #3b3b3b;
  font-weight: 500;
  font-size: 12px;
  color: black;
}
.button {
  border-radius: 35px;
}

.button-comment {
  background: rgb(9, 31, 67);
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  border-radius: 0px 25px 25px 0px;
  padding: 16px;
  transition: 0.4s background-color;
}
.commment-row {
  border-radius: 10px;
  background: #414141;
  padding: 15px;
  margin: 15px 0px 15px;
}
.button-comment:hover {
  cursor: pointer;
  background: #1976d2;
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
  display: flex;
  float: right;
}
.comment {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap, ss;
}
.textarea-row-comment {
  width: 100%;
  resize: none;
  overflow: hidden;
  padding: 8px;
  border: none;
  border-radius: 25px 0px 0px 25px;
  background: #3b3b3b;
  font-weight: 500;
  font-size: 12px;
  color: black;
} */
</style>