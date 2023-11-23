const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

let gravity = 1;
let jumpLimitFrame = 20;
let jumpFrames = 0;
let keys = {
  d: false,
  a: false,
  w: false,
};

class Player {
  constructor(position, velocity, size) {
    this.position = position;
    this.velocity = velocity;
    this.size = size;
    this.grounded = false;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
  }

  jump() {
    if (this.grounded) {
      this.velocity.y = -20;
      this.grounded = false;
    }
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x += gravity;
    this.velocity.y += gravity;

    if (this.position.y + this.size.h > canvas.height) {
      this.position.y = canvas.height - this.size.h;
      this.velocity.y = 0;
      this.grounded = true;
    }

    if (keys.a - keys.d != 0) {
      this.velocity.x = (keys.d - keys.a) * 3;
    } else {
      this.velocity.x = 0;
    }
  }
}

player = new Player({ x: 200, y: 200 }, { x: 0, y: 0 }, { w: 50, h: 100 });

console.log(player);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d = true;
      break;
    case "a":
      keys.a = true;
      break;
    case "w":
      keys.w = true;
      player.jump();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d = false;
      break;
    case "a":
      keys.a = false;
      break;
    case "w":
      keys.w = false;
      break;
  }
});
