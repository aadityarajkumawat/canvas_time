const src = "https://i.ibb.co/7RmbXTs/t-Spongebob-Squarepants-Band-Geeks.jpg";
const canvas = document.getElementsByTagName("canvas");
const ctx = canvas.getContext("2d");
if (ctx) {
    let img = new Image();
    const imgPos = { x: 50, y: 0 };
    let { x, y } = imgPos;
    img.addEventListener("load", () => {
        ctx.drawImage(img, x, y, 300, 300);
    }, false);
    img.src = src;
}
//# sourceMappingURL=app.js.map