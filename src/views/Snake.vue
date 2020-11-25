<template>
  <div class="conteiner-snake">
    <canvas id="game" width="400" height="400"></canvas>
    <div class="snake-reset">
      <div class="button" @click="restart()">Заново</div>

      <div class="win-panel scope">
        <span>{{winner}} {{score}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: "",
      context: "",
      grid: 16,
      count: 0,
      angle: 90,
      snake: {
        x: 160,
        y: 160,
        dx: 0,
        dy: 0,
        cells: [],
        maxCells: 4
      },
      apple: {
        x: 320,
        y: 320
      },
      stop: false,
      winner: "Очки: ",
      score: 0
    };
  },
  methods: {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    loop() {
      this.canvas = document.getElementById("game");
      this.context = this.canvas.getContext("2d");

      if (this.stop == false) {
        requestAnimationFrame(this.loop);
      }

      if (++this.count < 4) {
        return;
      }

      this.count = 0;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.snake.x += this.snake.dx;
      this.snake.y += this.snake.dy;

      if (this.snake.x < 0) {
        this.snake.x = this.canvas.width - this.grid;
      } else if (this.snake.x >= this.canvas.width) {
        this.snake.x = 0;
      }

      if (this.snake.y < 0) {
        this.snake.y = this.canvas.height - this.grid;
      } else if (this.snake.y >= this.canvas.height) {
        this.snake.y = 0;
      }

      this.snake.cells.unshift({ x: this.snake.x, y: this.snake.y });

      if (this.snake.cells.length > this.snake.maxCells) {
        this.snake.cells.pop();
      }

      this.context.fillStyle = "red";
      this.context.fillRect(
        this.apple.x,
        this.apple.y,
        this.grid - 1,
        this.grid - 1
      );

      this.context.fillStyle = "lightgreen";

      this.snake.cells.forEach((cell, index) => {
        this.context.fillRect(cell.x, cell.y, this.grid, this.grid);

        if (cell.x === this.apple.x && cell.y === this.apple.y) {
          this.snake.maxCells++;
          this.apple.x = this.getRandomInt(0, 25) * this.grid;
          this.apple.y = this.getRandomInt(0, 25) * this.grid;

          this.score += 10;
        }
        for (var i = index + 1; i < this.snake.cells.length; i++) {
          if (
            cell.x === this.snake.cells[i].x &&
            cell.y === this.snake.cells[i].y &&
            this.snake.cells.length > 4
          ) {
            this.stop = true;
            this.winner = "Вы проиграли:(  Очков:";
          }
        }
      });
      document.addEventListener("keydown", e => {
        if (e.which === 37 && this.snake.dx === 0) {
          this.snake.dx = -this.grid;
          this.snake.dy = 0;
        } else if (e.which === 38 && this.snake.dy === 0) {
          this.snake.dy = -this.grid;
          this.snake.dx = 0;
        } else if (e.which === 39 && this.snake.dx === 0) {
          this.snake.dx = this.grid;
          this.snake.dy = 0;
        } else if (e.which === 40 && this.snake.dy === 0) {
          this.snake.dy = this.grid;
          this.snake.dx = 0;
        }
      });
    },
    inRad(num) {
      return (num * Math.PI) / 180;
    },
    restart() {
      this.snake.x = 160;
      this.snake.y = 160;
      this.snake.cells = [];
      this.snake.maxCells = 4;
      this.snake.dx = this.grid;
      this.snake.dy = 0;
      this.apple.x = this.getRandomInt(0, 25) * this.grid;
      this.apple.y = this.getRandomInt(0, 25) * this.grid;
    }
  },
  created() {},
  mounted() {
    this.dx = this.grid;
    this.canvas = document.getElementById("game");
    this.context = this.canvas.getContext("2d");
    this.loop();
  }
};
</script>