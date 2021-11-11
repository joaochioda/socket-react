const rectWidth = 15;
const rectHeigh = 15;

export default function draw(ctx, user1, user2) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  if (user1 && user2) {
    ctx.rect(user1.x, user1.y, rectWidth, rectHeigh);
    ctx.rect(user2.x, user2.y, rectWidth, rectHeigh);
  }

  ctx.fillStyle = "#0095DD";

  ctx.fill();
}
