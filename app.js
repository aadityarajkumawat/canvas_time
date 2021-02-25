const src = "https://i.ibb.co/7RmbXTs/t-Spongebob-Squarepants-Band-Geeks.jpg";
// cool

let ctx = document.getElementById("can").getContext("2d");
const addFilterBtn = document.getElementById("filter");
let isFocused = false;
let isMouseDown = false;

let img = new Image();
const imgPos = { x: 50, y: 0 };
let { x, y } = imgPos;
let imageStyles = {};
let imageHeldPosition = { xh: 50, yh: 50 };
let mii = { xPrev: 50, yPrev: 0 };

img.addEventListener(
  "load",
  () => {
    ctx.drawImage(img, x, y, 300, 300);
  },
  false
);
img.src = src;

document.getElementById("can").addEventListener("mousemove", (e) => {
  if (
    e.clientX <= img.naturalWidth + x &&
    e.clientX >= x &&
    e.clientY >= y &&
    e.clientY <= img.naturalHeight + y &&
    isFocused
  ) {
    document.body.style.cursor = "move";
  }
  if (isMouseDown && isFocused) {
    console.log("ok cool");
    ctx.clearRect(
      x - 1 - imageHeldPosition.xh,
      y - 1 - imageHeldPosition.yh,
      img.naturalWidth + 2,
      img.naturalHeight + 2
    );
    x = e.clientX;
    y = e.clientY;
    ctx.drawImage(
      img,
      x - imageHeldPosition.xh,
      y - imageHeldPosition.yh,
      300,
      300
    );
  }
});

document.getElementById("can").addEventListener("click", (e) => {
  if (
    e.clientX <= img.naturalWidth + x &&
    e.clientX >= x &&
    e.clientY >= y &&
    e.clientY <= img.naturalHeight + y
  ) {
    document.body.style.cursor = "move";
    if (!isFocused) {
      isFocused = true;
      ctx.strokeStyle = "green";
      ctx.strokeRect(mii.xPrev, mii.yPrev, 300, 300);;
    }
  } else {
    document.body.style.cursor = "crosshair";

    // if (isFocused) {
    //   isFocused = false;
    //   ctx.clearRect(x - 1, y - 1, img.naturalWidth + 2, img.naturalHeight + 2);
    //   let x
    //   ctx.drawImage(
    //     img,
    //     x - imageHeldPosition.xh,
    //     y - imageHeldPosition.yh,
    //     300,
    //     300
    //   );
    // }
  }
});

document.getElementById("can").addEventListener("mousedown", (e) => {
  if (
    e.clientX <= img.naturalWidth + x &&
    e.clientX >= x &&
    e.clientY >= y &&
    e.clientY <= img.naturalHeight + y
  ) {
    isMouseDown = true;
    imageHeldPosition.xh = e.clientX - x;
    imageHeldPosition.yh = e.clientY - y;
    console.log(imageHeldPosition);
  }
});

document.getElementById("can").addEventListener("mouseup", (e) => {
  if (
    e.clientX <= img.naturalWidth + x &&
    e.clientX >= x &&
    e.clientY >= y &&
    e.clientY <= img.naturalHeight + y
  ) {
    isMouseDown = false;
    isFocused = false;
  }
});

addFilterBtn.addEventListener("click", () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(x, y, 300, 300);
});
