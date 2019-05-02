"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let config = (p) => {
    let video = document.getElementById("video");
    let canvas = document.getElementById("canvas");
    let pre = document.getElementById("predictions");
    let model = null;
    let startCamera = () => __awaiter(this, void 0, void 0, function* () {
        let stream = yield navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        yield video.play();
        setInterval(() => takeSnapshot(), 1000);
    });
    let takeSnapshot = () => {
        let context = canvas.getContext("2d"), width = video.videoWidth, height = video.videoHeight;
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            classifyImage();
        }
    };
    let displayPredictions = (predictions) => {
        let val = "";
        for (let prediction of predictions) {
            let perc = (prediction.probability * 100).toFixed(2);
            val += `${perc}% | ${prediction.className}\n`;
            console.log(val);
        }
        pre.innerHTML = val;
    };
    let classifyImage = () => __awaiter(this, void 0, void 0, function* () {
        let predictions = yield model.classify(canvas);
        displayPredictions(predictions);
    });
    let main = () => __awaiter(this, void 0, void 0, function* () {
        model = yield mobilenet.load();
        yield startCamera();
    });
    p.setup = () => {
        main();
    };
};
let sketch = new p5(config);
//# sourceMappingURL=main.completed.js.map