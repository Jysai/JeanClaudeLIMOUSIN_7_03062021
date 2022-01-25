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
    postInfos: [],
    commentInfos: [],
    getError: [],
    getPostsOneUser: []
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      // Permet de récupérer le token et de le stocker dans le local
      instance.defaults.headers.common[
        "Authorization"
      ] = `bearer ${user.token}`;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      //récupère les informations de l'user pour les afficher dans profile.vue
      state.userInfos = userInfos;
    },
    createComment: function (state, createComment) {
      //récupère les informations de l'user pour les afficher dans profile.vue
      state.createComment = createComment;
    },
    createNewPost: function (state, createNewPost) {
      //récupère les informations de l'user pour les afficher dans profile.vue
      state.createNewPost = createNewPost;
    },
    deletePost: function (state, deletePost) {
      //récupère les informations de l'user pour les afficher dans profile.vue
      state.deletePost = deletePost;
    },
    deleteComment: function (state, deleteComment) {
      //récupère les informations de l'user pour les afficher dans profile.vue
      state.deleteComment = deleteComment;
    },
  
    getPostsOneUser: function (state, getPostsOneUser) {
      //récupère les informations de l'user pour les afficher dans profile.vue
      state.getPostsOneUser = getPostsOneUser;
    },
    messageInfos: function (state, messageInfos) {
      //récupère les publications pour les afficher dans profile.vue
      state.messageInfos = messageInfos;
    },

    getComment: function (state, getComment) {
      //récupère les publications pour les afficher dans profile.vue
      state.getComment = getComment;
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
            
            commit("getError", error.response.data),
            
            reject(error);
          });
      });
    },

    getUserInfos: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les données de l'utilisateur
      instance
        .get("user/me")
        .then(function (response) {
          console.log(response.data);
          commit("userInfos", response.data);
        })
        .catch(function () {});
    },



    getAllUsers: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les données de l'utilisateur
      instance
        .get("user/allUsers")
        .then(function (response) {
          commit("allUsers", response.data);
        })
        .catch(function () {});
    },

    getMessageInfos: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les plucations
      // console.log({ commit });
      // commit("setStatus", "loading");
      return new Promise((resolve) => {
        instance
          .get("message")
          .then(function (response) {
            // commit("setStatus", "");
            commit("messageInfos", response.data.messages);
            resolve(response);
          })
          .catch(function () {});
      });
    },

    getComment: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les plucations
      // console.log({ commit });
      // commit("setStatus", "loading");
      return new Promise((resolve) => {
        instance
          .get("message/comment")
          .then(function (response) {
            
            // commit("setStatus", "");
            commit("getComment", response.data.comments);
            resolve(response);
          })
          .catch(function () {});
      });
    },

    createNewPost: ({ commit }, postInfos) => {
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      // console.log(postInfos);
      // commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        let formData = new FormData()
        formData.append("content", postInfos.content)
        formData.append("image", postInfos.file)
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
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
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
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      return new Promise((resolve, reject) => {
      
      instance
        .delete(`message/comment/${id}`)
        .then(function (response) {
         
          commit("deleteComment");
          resolve(response);
        })
        .catch(function (error) {
          // commit("setStatus", "");
          reject(error);
        });
      });
    },

    editAvatar: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        let formData = new FormData()
        formData.append("image", userInfos.file)
        instance
          .put("/user/editAvatar", formData)
          .then(function (response) {
            commit("setStatus", "");
            
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", );
            reject(error);
          });
      });
    },


    editLastname: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .put("/user/editLastname", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_name");
            reject(error);
          });
      });
    },

    editFirstname: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .put("/user/editFirstname", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_name");
            reject(error);
          });
      });
    },

    deleteProfile: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      commit("setStatus", "loading");
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
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données

      commit("setStatus");
      instance
        .post(`message/${id}/like`)
        .then(function () {
          console.log();
          commit("setStatus", "");
        })
        .catch(function (error) {
          commit("setStatus", "");
          error;
        });
      // });
    },
  },
});

export default store;
