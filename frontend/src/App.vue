<template>

  <router-view></router-view>
</template>


<script>



export default {
  name: "App",
  components: {
    
  },
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
  
}
.main-site {
  display: flex;
  justify-content: center;
 
}
.main-container{
  padding-top: 30px;
  width: 700px;
  min-width: 360px;
}

.image-avatar{
  border-radius: 100%;
  object-fit: cover;
  width: 50px;
  height: 50px;
}


a {
    color: rgb(124, 110, 255);
    text-decoration: none;
}

a:hover 
{
     color:#444444; 
     text-decoration:none; 
     cursor:pointer;  
}
#app {
  max-width: 100%;
}
body {
  background-image: linear-gradient( rgb(129, 46, 51) 0%, rgb(6, 20, 44) 100%);

  min-height: 100vh;
  padding: 32px;
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
p{
    color: white;
}
.card {
  max-width: 100%;
  
  background: white;
  border-radius: 16px;
  padding: 32px;
 
  margin-bottom: 15px;
  width: 100%;
  background-color: rgb(26, 26, 26);

}
.card__title {
  text-align: center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.button {
  background: rgb(9, 31, 67);
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.card__action {
  color: #2196f3;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #1976d2;
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
   background: rgb(9, 31, 67);
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 150px;
  padding: 6px;
  transition: 0.4s background-color;
}
.modal-button:hover{
  cursor: pointer;
  background: #1976d2;
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

#modal-content.animation-1 {
  animation: animation-1 0.5s forwards;
}
.modal-body {
  padding: 5px 15px;
  display: flex;
  justify-content: space-around;
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