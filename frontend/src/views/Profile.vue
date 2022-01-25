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
          <div class="information-profile"><span class="nickname-profile">{{ profileUsers.firstname }} {{ profileUsers.lastname }}</span>
          <p class="edit-profil" @click="editProfil">Editer votre profil</p></div>
          
        </div>
        <div class="card">
          
          
          <textarea
            v-model="contentPost"
            class="textarea-row"
            type="text-area"
            placeholder="Quoi de neuf?"
          ></textarea>

          <input
            type="file"
            accept="image/*"
            @change="openFile"
            id="inputFile"
            ref="inputFile"
          />
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
        <div v-bind:key="index" v-for="(message, index) in messages">
          <div class="card" v-if="message.UserId == profileUsers.id">
            <div class="icon">
              <button @click="deletePost(message.id)">
                <i class="fas fa-trash-alt"></i>
              </button>

              <i class="fas fa-edit"></i>
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
            <p>{{ message.content }}</p>
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
                    <button @click="deleteComment(comment.id)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>

                  <div v-if="comment.UserId == profileUsers.id">
                    <i class="fas fa-edit"></i>
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
      const self = this
      this.errors = [];
      if (this.contentPost == "" && this.imagesArray == null) {
        this.errors.push("");
      } 
      else {
        
        this.$store // Appel API dans le store
          .dispatch("createNewPost", {
            content: this.contentPost,
            file: this.imagesArray,
          })
          .then(() => {
            self.getPosts();
            self.contentPost = "";
          });
      }
      
    },
    openFile: function (e) {
      this.imagesArray = e.target.files[0];
    },
    editProfil: function (){
      this.$router.push("/settings")
    }
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
  border-radius: 25px 25px 0px 0px;
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

.image-avatar-profile {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  object-fit: cover;
  padding: 5px;
  background: white;
}

.edit-profil{
  display: flex;
  padding: 15px;
  border: 1mm solid rgba(170, 50, 220, .6);
  border-radius: 25px;
  height: 45px;
  align-items: center;
}
.nickname-profile{
  display: flex;
  align-items: center;
}

.edit-profil:hover{
  cursor: pointer;
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
}
</style>