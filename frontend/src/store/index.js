import "es6-promise/auto";

import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      id: "",
      email: "",
      lastname: "",
      firstname: "",
    },
    messageInfos: [],

    commentInfos: [],
    getError: [],
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      // Permet de stocker le token
      instance.defaults.headers.common[
        "Authorization"
      ] = `bearer ${user.token}`;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    createComment: function (state, createComment) {
      state.createComment = createComment;
    },
    createNewPost: function (state, createNewPost) {
      state.createNewPost = createNewPost;
    },
    deletePost: function (state, deletePost) {
      state.deletePost = deletePost;
    },
    deleteComment: function (state, deleteComment) {
      state.deleteComment = deleteComment;
    },

    messageInfos: function (state, messageInfos) {
      state.messageInfos = messageInfos;
    },

    commentInfos: function (state, commentInfos) {
      state.commentInfos = commentInfos;
    },
    createLike: function (state, createLike) {
      state.createLike = createLike;
    },

    allUsers: (state, allUsers) => {
      state.allUsers = allUsers;
    },
    getError: (state, getError) => {
      state.getError = getError;
    },
    logout: function (state) {
      // Permet de se déconnecter
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
  actions: {
    loginAuth: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/user/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      // Méthode POST via AXIOS pour enregistrer l'utilisateur dans la base de données
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/user/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("getError", error.response.data), reject(error);
          });
      });
    },

    getUserInfos: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer un seul utilisateur
      instance
        .get("user/me")
        .then(function (response) {
          commit("userInfos", response.data);
        })
        .catch(function () {});
    },

    getAllUsers: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les Users
      instance
        .get("user/allUsers")
        .then(function (response) {
          commit("allUsers", response.data);
        })
        .catch(function () {});
    },

    getMessageInfos: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les plucations

      commit("setStatus");
      return new Promise((resolve) => {
        instance
          .get("message")
          .then(function (response) {
            commit("messageInfos", response.data.messages);
            resolve(response);
          })
          .catch(function () {});
      });
    },

    getComment: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les commentaires

      // commit("setStatus", "loading");
      return new Promise((resolve) => {
        instance
          .get("message/comment")
          .then(function (response) {
            // console.log(response.data.comments);
            // commit("setStatus", "");
            commit("commentInfos", response.data.comments);
            resolve(response);
          })
          .catch(function () {});
      });
    },

    createNewPost: ({ commit }, postInfos) => {
      // Méthode post via AXIOS pour publier une nouvelle publication

      // commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("content", postInfos.content);
        formData.append("image", postInfos.file);
        instance
          .post("/message/", formData)
          .then(function (response) {
            commit("createNewPost");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_message");
            reject(error);
          });
      });
    },

    createComment: ({ commit }, commentInfos) => {
      // Méthode post via AXIOS pour publier un nouveau commentaire
      return new Promise((resolve, reject) => {
        instance
          .post(`message/${commentInfos.id}/comment`, commentInfos)
          .then(function (response) {
            commit("createComment");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_comment");
            reject(error);
          });
      });
    },

    deletePost: ({ commit }, id) => {
      // Méthode post via AXIOS pour effacer une publication
      return new Promise((resolve, reject) => {
        instance
          .delete(`message/${id}`)
          .then(function (response) {
            commit("deletePost");
            resolve(response);
          })
          .catch(function (error) {
            // commit("setStatus", "");
            reject(error);
          });
      });
    },

    deleteComment: ({ commit }, id) => {
      // Méthode post via AXIOS pour effacer un commentaire
      commit("setStatus");
      return new Promise((resolve, reject) => {
        instance
          .delete(`message/comment/${id}`)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            // commit("setStatus", "");
            reject(error);
          });
      });
    },

    editAvatar: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour editer la photo de profile
      commit("setStatus");
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("image", userInfos.file);
        instance
          .put("/user/editAvatar", formData)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus");
            reject(error);
          });
      });
    },

    editLastname: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour editer le lastname
      commit("setStatus");
      return new Promise((resolve, reject) => {
        instance
          .put("/user/editLastname", userInfos)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_name");
            reject(error);
          });
      });
    },

    editFirstname: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour  éditer le firstname
      commit("setStatus");
      return new Promise((resolve, reject) => {
        instance
          .put("/user/editFirstname", userInfos)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_name");
            reject(error);
          });
      });
    },

    deleteProfile: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour supprimer son compte

      return new Promise((resolve, reject) => {
        instance
          .delete("/user/", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },

    likeMessage: ({ commit }, id) => {
      // Méthode post via AXIOS pour aimer un post

      return new Promise((resolve, reject) => {
        instance
          .post(`message/${id}/like`)
          .then(function (response) {
            commit("createLike");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "");
            reject(error);
          });
      });
    },
  },
});

export default store;
