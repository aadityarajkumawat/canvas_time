const src = "https://i.ibb.co/7RmbXTs/t-Spongebob-Squarepants-Band-Geeks.jpg";
const canvas = document.getElementsByTagName("canvas");
const btn = document.getElementById("filter");
const item = canvas.item(0);
if (item) {
    const ctx = item.getContext("2d");
    if (ctx) {
        let img = new Image();
        const imgData = { x: 250, y: 150, width: 300, height: 300 };
        let { x, y, width, height } = imgData;
        let lineWidth = 7;
        let isFocussed = false;
        let isMouseDown = false;
        let heldPosition = { xh: 0, yh: 0 };
        let canResize = false;
        let edgeResizedBy = "RIGHT";
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
            }
            if ((e.clientX > x &&
                e.clientX < x + width &&
                e.clientY > y &&
                e.clientY < y + height &&
                !isMouseDown) ||
                (e.clientX < x - lineWidth && !isMouseDown) ||
                (e.clientX > x + width + lineWidth && !isMouseDown) ||
                (e.clientY < y - lineWidth && !isMouseDown) ||
                (e.clientY > y + height + lineWidth && !isMouseDown)) {
                canResize = false;
                document.body.style.cursor = "crosshair";
            }
            if (e.clientX > x + width &&
                e.clientX < x + lineWidth + width &&
                isFocussed) {
                canResize = true;
                document.body.style.cursor = "e-resize";
                edgeResizedBy = "RIGHT";
            }
            if (e.clientX > x - lineWidth && e.clientX < x && isFocussed) {
                canResize = true;
                document.body.style.cursor = "e-resize";
                edgeResizedBy = "LEFT";
            }
            if (canResize && isMouseDown) {
                if (edgeResizedBy === "RIGHT") {
                    ctx.clearRect(x - lineWidth, y - lineWidth, width + lineWidth * 2, height + lineWidth * 2);
                    width = e.clientX - x;
                    ctx.drawImage(img, x, y, width, height);
                }
                else if (edgeResizedBy === "LEFT") {
                    console.log("u r cool");
                    ctx.clearRect(x - lineWidth, y - lineWidth, width + lineWidth * 2, height + lineWidth * 2);
                    width = x - e.clientX + width;
                    x = e.clientX;
                    ctx.drawImage(img, x, y, width, height);
                }
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
            if (e.clientX > x - lineWidth && e.clientX < x && isFocussed) {
                isMouseDown = true;
            }
        });
        item.addEventListener("mouseup", () => {
            isMouseDown = false;
            if (canResize) {
                isFocussed = true;
                canResize = false;
            }
            if (isFocussed) {
                ctx.strokeStyle = "red";
                ctx.lineWidth = lineWidth;
                ctx.strokeRect(x - lineWidth / 2, y - lineWidth / 2, width + lineWidth, height + lineWidth);
                document.body.style.cursor = "crosshair";
            }
        });
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
            console.log({ isFocussed, heldPosition });
        });
    }
}
//# sourceMappingURL=app.js.map