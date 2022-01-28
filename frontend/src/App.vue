<template>
  <router-view></router-view>
</template>


<script>
export default {
  name: "App",
  components: {},
};
</script>





<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  word-break: break-all;
}
.message-no-post {
  display: flex;
  align-items: center;
  flex-flow: column;
}
.button-comment {
  background: rgba(100, 11, 138, 0.6);
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  border-radius: 0px 25px 25px 0px;
  padding: 16px;
  transition: 0.4s background-color;
  width: 160px;
}
.error{
  word-break: normal;
}
.commment-row {
  border-radius: 10px;
  background: #414141;
  padding: 15px;
  margin: 15px 0px 15px;
}
.button-comment:hover {
  cursor: pointer;
  background: rgba(170, 50, 220, 0.6);
}
.text-no-post {
  word-break: normal;
}

.main-site {
  display: flex;
  justify-content: center;
}
.main-container {
  padding-top: 60px;
  width: 700px;
}

.image-avatar {
  border-radius: 100%;
  object-fit: cover;
  width: 50px;
  height: 50px;
}

a {
  color: rgb(255, 255, 255);
  text-decoration: none;
}

a:hover {
  color: #370075;
  text-decoration: none;
  cursor: pointer;
}
#app {
  max-width: 100%;
}
body {
  background-image: linear-gradient(rgb(129, 46, 51) 0%, rgb(6, 20, 44) 100%);

  min-height: 100vh;
}
img {
  max-width: 100%;
  border-radius: 8px;
}

.textarea-row {
  width: 100%;
  resize: none;
  overflow: hidden;
  height: auto;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background-color: rgb(31, 34, 35);
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  color: black;
}
span {
  font-weight: 500;
  text-transform: capitalize;
  color: white;
}
p {
  color: white;
}
.card {
  max-width: 100%;

  background: white;
  border-radius: 15px;
  padding: 32px;

  margin-bottom: 15px;
  width: 100%;
  background-color: rgb(26, 26, 26);
  min-width: 375px;
}

.card-placeholder {
  border-radius: 0px 0px 15px 15px;
}
.fas-post {
  color: rgb(117, 117, 117);
  margin-right: 5px;
}
.fas-post:hover {
  cursor: pointer;
  color: rgba(170, 50, 220, 0.6);
}

.card__title {
  text-align: center;
  font-weight: 800;
  word-break: normal;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
  word-break: normal;
}
.button {
  background: rgba(100, 11, 138, 0.6);
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.textarea-row {
  color: white;
}
.card__action {
  color: #2196f3;
  text-decoration: underline;
  word-break: normal;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: rgba(170, 50, 220, 0.6);
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
.modal {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  top: 50%;
  left: 50%;
  color: #4a4a4a;
  max-width: 30%;
  min-width: 300px;
  position: relative;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 80%; /* Could be more or less, depending on screen size */
  transform: translate(-50%, -50%);
}
.modal-button {
  background: rgba(114, 28, 151, 0.6);
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 150px;
  padding: 6px;
  transition: 0.4s background-color;
}

.modal-button:hover {
  cursor: pointer;
  background: rgba(55, 1, 78, 0.6);
}
.modal-header {
  align-items: stretch;
  box-shadow: 0 1px 1px rgb(10 10 10 / 10%);
  display: flex;
}

.modal-header-title {
  align-items: center;
  color: #363636;
  display: flex;
  flex-grow: 1;
  font-weight: 700;
  padding: 5px 15px;
  word-break: normal;
}
.modal-header-icon {
  background: 0 0;
  border: none;
  color: currentColor;
  font-family: inherit;
  font-size: 1em;
  margin: 0;
  padding: 0;
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem;
}
.edit-profil-texte {
  display: flex;
  padding: 15px;
  border: 1mm solid rgba(170, 50, 220, 0.6);
  border-radius: 25px;
  height: 45px;
  min-width: 175px;
  align-items: center;
}
.edit-profil-texte:hover {
  cursor: pointer;
}
#modal-content.animation-1 {
  animation: animation-1 0.5s forwards;
}
.modal-body {
  padding: 5px 15px;
  display: flex;
  justify-content: space-around;
}
.edit-profil-logo {
  display: none;
}
.textarea-row-comment {
  width: 100%;
  resize: none;
  overflow: hidden;
  padding: 8px;
  border: none;
  border-radius: 25px 0px 0px 25px;
  background: #3b3b3b;
  font-weight: 500;
  font-size: 12px;
  color: black;
  word-break: break-all;
}
.option-avatar {
  display: flex;
  justify-content: center;
}
.comment {
  display: flex;
  margin-top: 15px;
  flex-direction: row;
}
.fa-window-close {
  color: red;
  padding: 5px;
}
.fa-window-close {
  cursor: pointer;
}
.send-mobile {
  display: none;
}
.image-avatar-profile {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  object-fit: cover;
  padding: 5px;
  background: white;
}
.message-content {
  margin-top: 15px;
  margin-bottom: 15px;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid rgba(170, 50, 220, 0.6);
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: white;
  border-radius: 15px;
}
.custom-file-upload:hover {
  color: rgba(170, 50, 220, 0.6);
  border: 1px solid white;
}
#preview {
  display: flex;
  justify-content: center;
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

@media all and (max-width: 750px) {
  .form-row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
@media all and (max-width: 750px) {
  .edit-profil-texte {
    display: none;
  }
  .fa-user-edit {
    color: white;
  }
  .edit-profil-logo {
    display: block;
    display: flex;
    color: white;
    padding: 15px;
    border: 1mm solid rgba(170, 50, 220, 0.6);
    border-radius: 25px;
    height: 45px;

    align-items: center;
  }
  .edit-profil-logo:hover {
    cursor: pointer;
  }
  .send-mobile {
    display: block;
  }
  .send-desktop {
    display: none;
  }
  .button-comment {
    width: 70px;
  }
}
@media all and (max-width: 450px) {
}
@keyframes animation-1 {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
  70% {
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>