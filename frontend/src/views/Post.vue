<template>
  <div>
    <div class="main-site">
      <div class="card-side card-side-left"></div>
      <div>
        <div class="card">
          <textarea
            v-model="content"
            class="textarea-row"
            type="text-area"
            placeholder="Quoi de neuf?"
          ></textarea>

          <div class="form-row-btn">
            <button v-on:click.prevent="creationPost" class="button">Publier</button>
          </div>
        </div>

        <div class="card" v-if="status == 'loading'">
          <div class="loader">Loading...</div>
        </div>
        <div v-else>
          <div class="card" v-bind:key="index" v-for="(post, index) in posts">
            <p>UtilisateurID: {{ post.UserId }}</p>
            <p>Message: {{ post.content }}</p>
          </div>
        </div>

        <div class="card">
          
          <div class="form-row">
            <button @click="logout()" class="button">Déconnexion</button>
          </div>
        </div>
      </div>
      <div class="card-side card-side-right">
        <h3>Suggestions pour vous</h3>
        
        <div
          class="card-contact"
          v-bind:key="index"
          v-for="(user, index) in users"
        >
          <span>{{ user.firstname }} {{ user.lastname }}</span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>






<script>
import { mapState } from "vuex";

export default {
  name: "Post",
  data: function () {
    return {
      mode: "post",
      content: "",
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }

    this.$store.dispatch("getPostInfos");
    this.$store.dispatch("createNewPost");
    this.$store.dispatch("getAllUsers");
  },

  computed: {
    ...mapState({
      posts: "postInfos",
      newPosts: "newPosts",
      users: "allUsers",
    }),
    ...mapState(["status"]),
  },

  methods: {
    logout: function () {
      // Permet de se déconnecter
      this.$store.commit("logout");
      this.$router.push("/");
    },
    refreshPost: function(){
      this.$store.dispatch("getPostInfos");
    },
    creationPost: function () {
      const self = this;
      this.$store // Appel API dans le store
        .dispatch("createNewPost", {
          content: this.content,
        })
        .then(
          function () {
            self.refreshPost();
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },

  



  

};
</script>







<style scoped>




.main-site {
  display: flex;
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

.card-side-right {
  margin-left: 15px;
}
.card-contact {
  display: flex;
  flex-direction: row;
  margin: 20px;
  justify-content: flex-start;
}
.card-side-left {
  margin-right: 15px;
  height: auto;
  padding: 20px;
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
    box-shadow: 0em -2.6em 0em 0em #aa2d52, 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.5), -1.8em -1.8em 0 0em rgba(170,45,82, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.7), 1.8em -1.8em 0 0em #aa2d52, 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.5), 1.8em -1.8em 0 0em rgba(170,45,82, 0.7), 2.5em 0em 0 0em #aa2d52, 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.5), 2.5em 0em 0 0em rgba(170,45,82, 0.7), 1.75em 1.75em 0 0em #aa2d52, 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.5), 1.75em 1.75em 0 0em rgba(170,45,82, 0.7), 0em 2.5em 0 0em #aa2d52, -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.5), 0em 2.5em 0 0em rgba(170,45,82, 0.7), -1.8em 1.8em 0 0em #aa2d52, -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.5), -1.8em 1.8em 0 0em rgba(170,45,82, 0.7), -2.6em 0em 0 0em #aa2d52, -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.5), -2.6em 0em 0 0em rgba(170,45,82, 0.7), -1.8em -1.8em 0 0em #aa2d52;
  }
}
@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #aa2d52, 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.5), -1.8em -1.8em 0 0em rgba(170,45,82, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.7), 1.8em -1.8em 0 0em #aa2d52, 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.5), 1.8em -1.8em 0 0em rgba(170,45,82, 0.7), 2.5em 0em 0 0em #aa2d52, 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.5), 2.5em 0em 0 0em rgba(170,45,82, 0.7), 1.75em 1.75em 0 0em #aa2d52, 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.5), 1.75em 1.75em 0 0em rgba(170,45,82, 0.7), 0em 2.5em 0 0em #aa2d52, -1.8em 1.8em 0 0em rgba(170,45,82, 0.2), -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.5), 0em 2.5em 0 0em rgba(170,45,82, 0.7), -1.8em 1.8em 0 0em #aa2d52, -2.6em 0em 0 0em rgba(170,45,82, 0.2), -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.5), -1.8em 1.8em 0 0em rgba(170,45,82, 0.7), -2.6em 0em 0 0em #aa2d52, -1.8em -1.8em 0 0em rgba(170,45,82, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(170,45,82, 0.2), 1.8em -1.8em 0 0em rgba(170,45,82, 0.2), 2.5em 0em 0 0em rgba(170,45,82, 0.2), 1.75em 1.75em 0 0em rgba(170,45,82, 0.2), 0em 2.5em 0 0em rgba(170,45,82, 0.2), -1.8em 1.8em 0 0em rgba(170,45,82, 0.5), -2.6em 0em 0 0em rgba(170,45,82, 0.7), -1.8em -1.8em 0 0em #aa2d52;
  }
}

</style>