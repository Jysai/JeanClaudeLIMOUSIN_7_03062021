import 'es6-promise/auto'

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
    postInfos: {
      UserId: "",
      title: "",
      content: "",
      attachment: "",
      likes: "",
      createdAt: "",
      updatedAt: "",
      User: {
        lastname: "",
        firstname: "",
      },
    },
    newPosts: {
      content: "",
    },
    allUsers: {
      firstname: "",
      lastname: "",
    }

    
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
    postInfos: function (state, postInfos) {
      //récupère les publications pour les afficher dans profile.vue
      state.postInfos = postInfos;
    },
    newPosts: (state, newPosts) => {
      state.newPosts = newPosts;
    },
    allUsers: (state, allUsers) => {
      state.allUsers = allUsers;
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
          .post("/auth/login", userInfos)
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
          .post("/auth/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    getUserInfos: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les données de l'utilisateur
      instance
        .get("auth/me")
        .then(function (response) {
          commit("userInfos", response.data);
        })
        .catch(function () {});
    },
    getAllUsers: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les données de l'utilisateur
      instance
        .get("auth/allUsers")
        .then(function (response) {
          commit("allUsers", response.data);
        })
        .catch(function () {});
    },

    getPostInfos: ({ commit }) => {
      // Méthode GET via AXIOS pour récupérer les plucations
      commit("setStatus", "loading");
      return new Promise((resolve) => {
       instance
        .get("mess")
        .then(function (response) {
          commit("setStatus", "");
          commit("postInfos", response.data.messages);
          resolve(response);
        })
        .catch(function () {});
      })
    },

    createNewPost: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      commit("setStatus", "loading");
        instance
          .post("/mess/", userInfos)
          .then(function (response) {
            console.log(response.data);
            commit("setStatus", "");
            commit("newPosts", response.data);
            (response);
          })
          .catch(function (error) {
            commit("setStatus", "");
            (error);
          });
      // });
    },

    editProfile: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .put("/auth/", userInfos)
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

    deleteProfile: ({ commit }, userInfos) => {
      // Méthode post via AXIOS pour authentifier l'utilisateur dans la base de données
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .delete("/auth/", userInfos)
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
 

  },
});

export default store;
