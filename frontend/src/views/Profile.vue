<template>
  <div>
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
    <div class="main-site">
      <div class="card-side card-side-left">
        
        <img class="logo" alt="Groupomania logo" src="../assets/icon-left-font.webp">
        <hr>
        <router-link :to="{name: 'post'}"><div class="menu-nav"><i class="fas fa-home fa-2x"></i><h4>Accueil</h4></div></router-link>     
        <router-link :to="{name: 'profile'}"><div class="menu-nav"><i class="fas fa-user fa-2x"></i><h4>Profil</h4></div></router-link>        
        <div class="menu-nav"><i class="fas fa-cog fa-2x"></i><h4>Paramêtres</h4></div>
         
           <button @click="logout()" class="button">Déconnexion</button>
       
      </div>






     
          <div class="card">
            <h1 class="card__title">Espace Perso</h1>
            <p class="card__subtitle">C'est mon profil</p>
            <p>Mon id: {{user.id}} <br> Email: {{user.email}} <br> Nom: {{user.lastname}} <br> Prénom: {{user.firstname}}</p>
          
        
  </div>
  </div>
  </div>









  
</template>

<script>

import { mapState } from "vuex";



export default {

  name: 'Profile',
  mounted: function() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/')
      return;
    }
    this.$store.dispatch('getUserInfos');
    
    
  },

  computed: {
    ...mapState({
      user: 'userInfos',
      
    })
    
  },
 
        
  methods:{
    logout: function(){ // Permet de se déconnecter
      this.$store.commit('logout');
      this.$router.push('/')
    }
  }
}
</script>




<style scoped>
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
h4{
  margin-left: 20px;
}
.logo{
  width: 100%;

}
.fas{
  width: 20px;
}
.menu-nav{
  display: flex;
  align-items: center;
  padding: 20px
}
.menu-nav:hover{
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
.comment{
  display: flex;
  justify-content: center;
  
}
.textarea-row-comment{
  
  width: 100%;
  resize: none;
  overflow: hidden;
  
  padding: 8px;
  border: none;
  border-radius: 25px;
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

</style>