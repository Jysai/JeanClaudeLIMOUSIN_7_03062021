<template>
  <div>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">C'est mon profil</p>
    <p>Mon id: {{user.id}} <br> Email: {{user.email}} <br> Nom: {{user.lastname}} <br> Prénom: {{user.firstname}}</p>
   
    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
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
p {
  text-align: center;
}
</style>