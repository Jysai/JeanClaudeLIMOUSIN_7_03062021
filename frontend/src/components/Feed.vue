<template>
  <div v-if="messages == 0" class="card">
    <div class="message-no-post">
      <i class="fas fa-feather-alt fa-10x"></i>
      <p>Le fil d'actualité est vide</p>
    </div>
  </div>
  <div v-else>
    <div class="card" v-bind:key="index" v-for="(message, index) in messages">
      <div class="icon">
        <div v-if="profileUsers.id === 60 || message.UserId == profileUsers.id">
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
        <div class="like-heart" v-on:click.prevent="likeMessage(message.id)">
          <i class="fas fa-heart fas-post"></i>
        </div>
        <p>{{ message.likes }}</p>
      </div>

      <hr />

      <div v-bind:key="index" v-for="(comment, index) in comments">
        <div class="commment-row" v-if="comment.messageId == message.id">
          <div class="icon">
            <div
              v-if="profileUsers.id === 60 || comment.UserId == profileUsers.id"
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
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Feed",

  mounted: function () {
    this.$store.dispatch("getMessageInfos");
    this.$store.dispatch("getAllUsers");
    this.$store.dispatch("getUserInfos");
    this.$el.addEventListener("click", this.onClick);
    this.$store.dispatch("getComment");
  },

  data: function () {
    return {
      mode: "feed",

      contentComment: new Map(),
    };
  },

  computed: {
    ...mapState({
      comments: "getComment",
      profileUsers: "userInfos",
      messages: "messageInfos",
    }),
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

    deleteComment: function (id) {
      console.log(id);
      this.$store.dispatch("deleteComment", id).then(() => {
        this.getComments();
      });
    },

    deletePost: function (id) {
      // const self = this;
      this.$store.dispatch("deletePost", id).then(() => {
        this.getPosts();
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

<style>
.icon {
  float: right;
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
.time {
  font-weight: 100;
  font-size: 10px;
}
.image-parent {
  display: flex;
  justify-content: center;
}
.image-container {
  object-fit: scale-down;
}
.like {
  display: flex;
  align-items: center;
}
.like-heart {
  cursor: pointer;
}
</style>