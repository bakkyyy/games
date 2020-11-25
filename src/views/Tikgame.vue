<template>
  <div class="tikgame">
    <div class="conteiner-tik">
      <div class="field">
        <div v-for="(item,index) in 9" :key="index" class="item" id="item" @click="fill($event)">
          <span>{{index}}</span>
        </div>
      </div>
      <div>
        <div class="button" @click="reset()">Заново</div>
        <div class="panel-who-step">
          <span>Ходит:</span>
          <img :src="this.step" />
        </div>
        <div class="win-panel">
          <span>{{winner}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tikgame",
  data() {
    return {
      mark: "item item-image-o",
      first_array: [],
      second_array: [],
      winner: "",
      circle: require("../assets/circle-outline-of-small-size.png"),
      x: require("../assets/cross-sign.png"),
      step: ""
    };
  },
  components: {},
  created() {
    this.step = this.circle;
  },
  methods: {
    fill(e) {
      if (this.winner != "") return;
      if (this.error(e)) return;

      e.target.className = this.mark;
      if (this.mark == "item item-image-x") {
        this.mark = "item item-image-o";
        this.step = this.circle;
        this.first_array.push(e.currentTarget.textContent);
      } else {
        this.mark = "item item-image-x";
        this.step = this.x;
        this.second_array.push(e.currentTarget.textContent);
      }
      this.win();
    },
    error(e) {
      if (e.target.className != "item") {
        e.target.style.border = "2px solid red";
        setTimeout(() => (e.target.style.border = "1px solid black"), 1000);

        return true;
      }
      return false;
    },
    reset() {
      this.first_array = [];
      this.second_array = [];
      document.querySelectorAll("div.item").forEach(e => {
        e.style.backgroundColor = "";
        e.className = "item";
        this.mark = "item item-image-o";
        this.step = this.circle;
        this.winner = "";
      });
    },
    win() {
      if (
        (this.first_array.includes("0") &&
          this.first_array.includes("1") &&
          this.first_array.includes("2")) ||
        (this.first_array.includes("3") &&
          this.first_array.includes("4") &&
          this.first_array.includes("5")) ||
        (this.first_array.includes("6") &&
          this.first_array.includes("7") &&
          this.first_array.includes("8")) ||
        (this.first_array.includes("0") &&
          this.first_array.includes("4") &&
          this.first_array.includes("8")) ||
        (this.first_array.includes("2") &&
          this.first_array.includes("4") &&
          this.first_array.includes("6")) ||
        (this.first_array.includes("0") &&
          this.first_array.includes("3") &&
          this.first_array.includes("6")) ||
        (this.first_array.includes("1") &&
          this.first_array.includes("4") &&
          this.first_array.includes("7")) ||
        (this.first_array.includes("2") &&
          this.first_array.includes("5") &&
          this.first_array.includes("8"))
      ) {
        this.winner = "Победил 'Крестик'";
        return true;
      }
      if (
        (this.second_array.includes("0") &&
          this.second_array.includes("1") &&
          this.second_array.includes("2")) ||
        (this.second_array.includes("3") &&
          this.second_array.includes("4") &&
          this.second_array.includes("5")) ||
        (this.second_array.includes("6") &&
          this.second_array.includes("7") &&
          this.second_array.includes("8")) ||
        (this.second_array.includes("0") &&
          this.second_array.includes("4") &&
          this.second_array.includes("8")) ||
        (this.second_array.includes("2") &&
          this.second_array.includes("4") &&
          this.second_array.includes("6")) ||
        (this.second_array.includes("0") &&
          this.second_array.includes("3") &&
          this.second_array.includes("6")) ||
        (this.second_array.includes("1") &&
          this.second_array.includes("4") &&
          this.second_array.includes("7")) ||
        (this.second_array.includes("2") &&
          this.second_array.includes("5") &&
          this.second_array.includes("8"))
      ) {
        this.winner = "Победил 'Нолик'";
        return true;
      }
      if (
        (this.first_array.length == 5 &&
          this.second_array.length == 4 &&
          this.winner == "") ||
        (this.first_array.length == 4 &&
          this.second_array.length == 5 &&
          this.winner == "")
      ) {
        this.winner = "Ничья";
      }
    }
  }
};
</script>
