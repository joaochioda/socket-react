const rectWidth = 14;
const rectHeigh = 14;

export default function draw(ctx, user1, user2, user3) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  if (user1 && user2) {
    ctx.fillStyle = "#0095DD";
    for (let i = 0; i < user1.tail.length; i += 1) {
      ctx.rect(user1.tail[i][0], user1.tail[i][1], rectWidth, rectHeigh);
    }
    for (let i = 0; i < user2.tail.length; i += 1) {
      ctx.rect(user2.tail[i][0], user2.tail[i][1], rectWidth, rectHeigh);
    }
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(user3[0], user3[1], rectWidth, rectHeigh);
    ctx.fill();
    ctx.closePath();
  }
}
