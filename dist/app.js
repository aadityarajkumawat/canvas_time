const src = "https://i.ibb.co/7RmbXTs/t-Spongebob-Squarepants-Band-Geeks.jpg";
const canvas = document.getElementsByTagName("canvas");
const btn = document.getElementById("filter");
const item = canvas.item(0);
if (item) {
    const ctx = item.getContext("2d");
    if (ctx) {
        let img = new Image();
        const imgData = { x: 50, y: 50, width: 300, height: 300 };
        let { x, y, width, height } = imgData;
        let lineWidth = 7;
        let isFocussed = false;
        let isMouseDown = false;
        let heldPosition = { xh: 0, yh: 0 };
        let canResize = false;
        img.addEventListener("load", () => {
            ctx.drawImage(img, x, y, width, height);
        }, false);
        img.src = src;
        document.body.style.cursor = "crosshair";
        item.addEventListener("mousemove", (e) => {
            if (e.clientX <= width + x &&
                e.clientX >= x &&
                e.clientY <= height + y &&
                e.clientY >= y &&
                !isFocussed) {
                ctx.strokeStyle = "orange";
                ctx.lineWidth = lineWidth;
                ctx.strokeRect(x - lineWidth / 2, y - lineWidth / 2, width + lineWidth, height + lineWidth);
            }
            else if (!isFocussed) {
                ctx.clearRect(x - lineWidth, y - lineWidth, width + lineWidth * 2, height + lineWidth * 2);
                ctx.drawImage(img, x, y, width, height);
            }
            if (isFocussed && isMouseDown && !canResize) {
                ctx.clearRect(x, y, width, height);
                x = e.clientX - heldPosition.xh;
                y = e.clientY - heldPosition.yh;
                ctx.drawImage(img, x, y, width, height);
                document.body.style.cursor = "move";
                console.log("Redrawing");
            }
            if (e.clientX > x + width &&
                e.clientX < x + lineWidth + width &&
                isFocussed) {
                canResize = true;
                console.log("Im in between");
            }
            if (canResize && isMouseDown) {
                ctx.clearRect(x - lineWidth, y - lineWidth, width + lineWidth * 2, height + lineWidth * 2);
                width = e.clientX - x;
                ctx.drawImage(img, x, y, width, height);
            }
        });
        item.addEventListener("click", (e) => {
            if (!isFocussed &&
                e.clientX <= width + x &&
                e.clientX >= x &&
                e.clientY <= height + y &&
                e.clientY >= y) {
                isFocussed = true;
                ctx.clearRect(x - lineWidth, y - lineWidth, width + lineWidth * 2, height + lineWidth * 2);
                ctx.drawImage(img, x, y, width, height);
                ctx.strokeStyle = "red";
                ctx.lineWidth = lineWidth;
                ctx.strokeRect(x - lineWidth / 2, y - lineWidth / 2, width + lineWidth, height + lineWidth);
            }
            else if ((isFocussed && e.clientX >= width + x) ||
                e.clientX <= x ||
                e.clientY >= height + y ||
                e.clientY <= y) {
                isFocussed = false;
                ctx.clearRect(x - lineWidth, y - lineWidth, width + lineWidth * 2, height + lineWidth * 2);
                ctx.drawImage(img, x, y, width, height);
            }
        });
        item.addEventListener("mousedown", (e) => {
            if (isFocussed &&
                e.clientX <= width + x &&
                e.clientX >= x &&
                e.clientY <= height + y &&
                e.clientY >= y) {
                isMouseDown = true;
                document.body.style.cursor = "move";
                ctx.clearRect(x - lineWidth, y - lineWidth, width + lineWidth * 2, height + lineWidth * 2);
                ctx.drawImage(img, x, y, width, height);
                heldPosition.xh = e.clientX - x;
                heldPosition.yh = e.clientY - y;
            }
            if (e.clientX > x + width &&
                e.clientX < x + lineWidth + width &&
                isFocussed) {
                isMouseDown = true;
            }
        });
        item.addEventListener("mouseup", () => {
            isMouseDown = false;
            if (canResize) {
                canResize = false;
            }
            if (isFocussed) {
                ctx.strokeStyle = "red";
                ctx.lineWidth = lineWidth;
                ctx.strokeRect(x, y, width, height);
                document.body.style.cursor = "crosshair";
            }
        });
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
            console.log({ isFocussed, heldPosition });
        });
    }
}
//# sourceMappingURL=app.js.map