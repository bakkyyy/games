<template>
  <div id="app">
    <div id="nav">
      <!-- ----------------------------------------------------------------------- Навигация-->
      <router-link to="/" class="game">
        <img src="../src/assets/tic-tac-toe-hand-drawn-game.png" class="tictak" />
      </router-link>
      <router-link to="/snake" class="game">
        <img src="../src/assets/snake.png" class="tictak" />
      </router-link>
      <hr />
    </div>
    <router-view />
    <!-- ----------------------------------------------------------------------- -->
  </div>
</template>