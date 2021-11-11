const rectWidth = 14;
const rectHeigh = 14;

export default function draw(ctx, user1, user2) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  if (user1 && user2) {
    for (let i = 0; i < user1.tail.length; i += 1) {
      ctx.rect(user1.tail[i][0], user1.tail[i][1], rectWidth, rectHeigh);
    }
    for (let i = 0; i < user2.tail.length; i += 1) {
      ctx.rect(user2.tail[i][0], user2.tail[i][1], rectWidth, rectHeigh);
    }
  }

  ctx.fillStyle = "#0095DD";

  ctx.fill();
}
