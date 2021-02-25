const src = "https://i.ibb.co/7RmbXTs/t-Spongebob-Squarepants-Band-Geeks.jpg";

interface ImgI {
  x: number;
  y: number;
  width: number;
  height: number;
}

const canvas: HTMLCollectionOf<HTMLCanvasElement> = document.getElementsByTagName(
  "canvas"
);

const item = canvas.item(0);

if (item) {
  const ctx = item.getContext("2d");
  if (ctx) {
    let img = new Image();
    const imgData: ImgI = { x: 50, y: 50, width: 300, height: 300 };
    let { x, y, width, height } = imgData;
    let lineWidth = 3;
    // let isFocussed = false;

    img.addEventListener(
      "load",
      () => {
        ctx.drawImage(img, x, y, width, height);
      },
      false
    );
    img.src = src;

    // Events
    item.addEventListener("mousemove", (e: MouseEvent) => {
      if (
        e.clientX <= width + x &&
        e.clientX >= x &&
        e.clientY <= height + y &&
        e.clientY >= y
      ) {
        ctx.strokeStyle = "orange";
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, width, height);
      } else {
        ctx.clearRect(x - 3, y - 3, width + 6, height + 6);
        ctx.drawImage(img, x, y, width, height);
      }
    });
  }
}
