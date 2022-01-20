<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
      crossorigin="anonymous"
    />
    <div class="main-site">
      <div class="card-side card-side-left">
        <img
          class="logo"
          alt="Groupomania logo"
          src="../assets/icon-left-font.webp"
        />
        <hr />
        <router-link :to="{ name: 'feed' }"
          ><div class="menu-nav">
            <i class="fas fa-home fa-2x"></i>
            <h4>Accueil</h4>
          </div></router-link
        >
        <router-link :to="{ name: 'profile' }"
          ><div class="menu-nav">
            <i class="fas fa-user fa-2x"></i>
            <h4>Profil</h4>
          </div></router-link
        >
        <router-link :to="{ name: 'settings' }"
          ><div class="menu-nav">
            <i class="fas fa-cog fa-2x"></i>
            <h4>Paramêtres</h4>
          </div></router-link
        >
        <div class="menu-nav">
          <span>{{ profileUsers.firstname }} {{ profileUsers.lastname }}</span>
        </div>

        <button @click="logout()" class="button">Déconnexion</button>
      </div>
      <div>
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
            <button v-on:click.prevent="creationPost" class="button">
              Publier
            </button>
          </div>
        </div>

        <!-- <div id="myModal" class="modal" ref="myModalComment">
          <div id="modal-content" class="modal-content animation-1">
            <header class="modal-header">
              <p class="modal-header-title">
                Vous êtes sur le point de supprimer ce commentaire
              </p>
              
            </header>

            <div class="modal-body">
              <div v-bind:key="index" v-for="(comment, index) in comments">
                </div>
              <button class="modal-button" @click="deleteComment(comment.messageId )">
                Valider
              </button>
              
              <button class="modal-button" @click="closeModalComment()">
                Annuler
              </button>
            </div>

            <footer class="modal-footer"></footer>
          </div>
        </div>

        <div id="myModal" class="modal" ref="myModalPost">
          <div id="modal-content" class="modal-content animation-1">
            <header class="modal-header">
              <p class="modal-header-title">
                Vous êtes sur le point de supprimer ce message
              </p>
              
            </header>

            <div class="modal-body">
              <div v-bind:key="index" v-for="(message, index) in messages">
                
              <button class="modal-button" @click="deletePost(message.id )">
                Valider
              </button>
              
              <button class="modal-button" @click="closeModalPost()">
                Annuler
              </button>
            </div>
            </div>
            <footer class="modal-footer"></footer>
          </div>
        </div> -->

        <div class="card" v-if="status == 'loading'">
          <div class="loader">Loading...</div>
        </div>

        <div v-else>
          <div
            class="card"
            v-bind:key="index"
            v-for="(message, index) in messages"
          >
            <div class="icon">
              <div v-if="message.UserId == profileUsers.id">

                <button @click="deletePost(message.id)">
                      <i class="fas fa-trash-alt"></i>
                </button>
                
              </div>
              <div v-if="message.UserId == profileUsers.id">
                <i class="fas fa-edit"></i>
              </div>
            </div>
            <div class="identity">
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
            <p>{{ message.content }}</p>

            <div class="like">
              <p>{{ message.likes }}</p>
              <div
                class="like-heart"
                v-on:click.prevent="likeMessage(message.id)"
              >
                <i class="fas fa-heart"></i>
              </div>
            </div>

            <hr />

            <div v-bind:key="index" v-for="(comment, index) in comments">
              <div class="commment-row" v-if="comment.messageId == message.id">
                <div class="icon">
                  <div v-if="comment.UserId == profileUsers.id">
                    <button @click="deleteComment(comment.Id)">
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
            <div class="comment">
              <input
                v-model="contentComment"
                class="textarea-row-comment"
                type="text-area"
                placeholder="Ecivez un commentaire..."
              />
              <button
                v-on:click.prevent="createComment(message.id)"
                class="button-comment"
              >
                Commenter
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

export default {
  el: "#app",
  name: "Message",
  data: function () {
    return {
      mode: "message",
      contentPost: null,
      imagesArray: null,
      contentComment: "",
    };
  },

  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getMessageInfos");
    this.$store.dispatch("getAllUsers");
    this.$store.dispatch("getComment");
    this.$store.dispatch("getUserInfos");
    this.$el.addEventListener("click", this.onClick);
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
    logout: function () {
      // Permet de se déconnecter
      this.$store.commit("logout");
      this.$router.push("/");
    },
    likeMessage: function (id) {
      console.log(id);
      // const self = this;
      this.$store // Appel API dans le store
        .dispatch("likeMessage", id)
        .then();
    },
    createComment: function (id) {
      this.$store
        .dispatch("createComment", {
          content: this.contentComment,
          id: id,
        })
        .then();
    },
    creationPost: function () {
      // const self = this;
      this.$store // Appel API dans le store
        .dispatch("createNewPost", {
          content: this.contentPost,
          // file: this.imagesArray,
        })
        .then();
    },
    openFile: function (e) {
      this.imagesArray = e.target.files[0];
    },
      onClick: function (ev) {
      if (ev.target == this.$refs.myModalComment) {
        this.$refs.myModalComment.style.display = "none";
        
      }
      if (ev.target == this.$refs.myModalPost) {
        this.$refs.myModalPost.style.display = "none";

        
      }
    },
    deletePost: function (id) {
      console.log(id);
       this.$store 
        .dispatch("deletePost", id)
         .then();
    },
    deleteComment: function (id) {
      console.log(id);
      // this.$store 
      //   .dispatch("deletePost", id)
      //   .then();
    }

  },
};
</script>


<style scoped>
.identity {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.nickname {
  font-weight: 500;
  text-transform: capitalize;
  display: flex;
  align-items: flex-start;

  padding-right: 5px;
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
.main-site {
  display: flex;
  justify-content: center;
}
.card-side {
  min-width: 350px;
  background: white;
  border-radius: 16px;
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
.logo {
  width: 100%;
}
.fas {
  width: 20px;
}
.menu-nav {
  display: flex;
  align-items: center;
  padding: 20px;
}
.menu-nav:hover {
  background: rgb(238, 238, 238);
  border-radius: 25px;
}
.card-side-right {
  margin-left: 15px;
  height: 800px;
  width: 20%;
}
.card-contact {
  display: flex;
  flex-direction: row;
  margin: 20px;
  justify-content: flex-start;
}
.card-side-left {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 15px;
  height: auto;
  padding: 20px;
  height: 500px;
  width: 20%;
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
  background: #f2f2f2;
  font-weight: 500;
  font-size: 12px;
  color: black;
}
.button {
  border-radius: 35px;
}
.textarea-row::placeholder {
  color: #aaaaaa;
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
  background: #ebebeb;
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
.card {
  margin-bottom: 15px;
  width: 650px;
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