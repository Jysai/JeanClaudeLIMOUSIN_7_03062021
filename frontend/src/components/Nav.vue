<template>
  <nav class="main-menu-nav">
    <div class="menu-start">
      <img
        class="logo-full"
        alt="Groupomania logo"
        src="../assets/logo-full.webp"
      />
      <img
        class="logo-mobile"
        alt="Groupomania logo"
        src="../assets/logo-mobile.webp"
      />
    </div>

    <div class="menu-center">
      <router-link :to="{ name: 'feed' }"
        ><div class="menu-nav menu-nav-center">
          <i class="fas fa-home fa-2x"></i>
          <h4 class="title-nav">Accueil</h4>
        </div></router-link
      >
      <router-link :to="{ name: 'profile' }"
        ><div class="menu-nav menu-nav-center">
          <i class="fas fa-user fa-2x"></i>
          <h4 class="title-nav">Profil</h4>
        </div></router-link
      >
      
      
    </div>
    <div class="menu-end">
    
      

      <div @click="logout()" class="logout">
        <i class="fas fa-sign-out-alt"></i
        ><span class="title-nav"> Se déconnecter</span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Nav",

  computed: {
    ...mapState({
      profileUsers: "userInfos",
    }),
  },
  methods: {
    logout: function () {
      // Permet de s'authentifier

      this.$store.commit("logout");
      this.$router.push("/").then(function () {
        location.reload();
      });
    },
  },
};
</script>

<style scoped>
.logo-mobile {
  display: none;
}
.logo-full {
  height: auto;
  width: 200px;
}

.main-menu-nav {
  display: flex;
  align-items: center;
  height: 50px;
  top: 0;
  position: fixed;
  width: 100%;
  background-color: rgb(31, 31, 31);
  justify-content: space-between;
  z-index: 1;
  padding: 0px 15px 0px 15px;
}
.title-nav{
  margin: 5px;
  word-break: normal;
}
.logo {
  width: 10%;
}

.menu-nav {
  height: auto;
  display: flex;
  align-items: center;

  padding: 8px;
}
.menu-nav:hover {
  height: auto;
  background: rgb(238, 238, 238);
  border-radius: 15px;
}
.menu-center {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}
.menu-nav-center {
  margin: 0px 20px 0px 20px;
}
.menu-end {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.logout {
  color: white;
  margin-left: 15px;
}
.logout {
  cursor: pointer;
}
.menu-nickname
{
  margin: 5px;
  word-break: normal;
}

@media all and (max-width: 750px) {
  .title-nav {
    display: none;
  }
  .logo-full {
    display: none;
  }
  .logo-mobile {
    display: block;
    height: 45px;
    min-width: 50px;
  }
  .main-menu-nav {
  }
}

@media all and (max-width: 450px) {
  .menu-nickname {
    display: none;
  }
  .logo-mobile {
    display: block;
    height: 25px;
    min-width: 25px;
  }
}
</style>