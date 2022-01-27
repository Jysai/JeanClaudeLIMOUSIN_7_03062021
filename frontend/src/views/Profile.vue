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
          <span>Vos publications</span>
        </div>

        <div v-if="profileUsers.Messages == 0" class="card">
          <div class="message-no-post">
            <i class="fas fa-feather-alt fa-10x"></i>
            <p class="text-no-post">
              Vous n'avez publié aucun post sur le réseau social
            </p>
            
          </div>
        </div>
        <div v-else>
          <div v-bind:key="index" v-for="(message, index) in messages">
            <!-- <div v-else> -->
            <div class="card" v-if="message.UserId == profileUsers.id">
              <div class="icon">
                <div @click="deletePost(message.id)">
                  <i class="fas fa-trash-alt fas-post"></i>
                </div>
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
                <div
                  class="commment-row"
                  v-if="comment.messageId == message.id"
                >
                  <div class="icon">
                    <div v-if="comment.UserId == profileUsers.id">
                      <div @click="deleteComment(comment.id)">
                        <i class="fas fa-trash-alt fas-post"></i>
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
  </div>
</template>

<script>
import { mapState } from "vuex";

import Nav from "../components/Nav.vue";
import UserInformation from "../components/User-Information.vue";

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
    "user-information": UserInformation
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
    likeMessage(id) {
      this.$store // Appel API dans le store
        .dispatch("likeMessage", id)
        .then(() => {
          this.$store.dispatch("getMessageInfos");
        });
    },
    deleteComment: function (id) {
      console.log(id);
      this.$store.dispatch("deleteComment", id).then(() => {
        this.getComments();
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
  },
};
</script>




<style scoped>





.pre-post {
  background-color: rgb(20, 20, 20);
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


.nickname {
  font-weight: 500;
  text-transform: capitalize;
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
</style>