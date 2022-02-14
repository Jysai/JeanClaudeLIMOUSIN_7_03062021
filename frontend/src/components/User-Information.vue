
 <template>
 
  <div class="card-profile">
    
    <img class="image-avatar-profile" :src="profileUsers.imageUrl" alt="Photo de profil">
    <div class="information-profile">
      <span class="nickname-profile"
        >{{ profileUsers.firstname }} {{ profileUsers.lastname }}</span
      >
      <p class="edit-profil-texte" @click="editProfil">Editer votre profil</p>
      <div class="edit-profil-logo" @click="editProfil">
        <i class="fas fa-user-edit"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "User-Information",

  computed: {
    ...mapState({
      profileUsers: "userInfos",
    }),
  },
  methods: {
    editProfil: function () {
      this.$router.push("/settings");
    },
  },
};
</script>

<style>
.card-profile {
  display: flex;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: rgb(20, 20, 20);
  border-radius: 15px 15px 0px 0px;
}

.information-profile {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
  padding: 15px;
}


.nickname-profile {
  display: flex;
  align-items: center;
}

</style>