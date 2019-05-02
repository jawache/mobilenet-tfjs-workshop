var config = (p: p5) => {

  let video: HTMLVideoElement = <HTMLVideoElement> document.getElementById("video");
  let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
  let pre: HTMLPreElement = <HTMLPreElement> document.getElementById("predictions");
  let model = null;

  let startCamera = async () => {
    let stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();

    setInterval(() => takeSnapshot(), 1000);
  }

  let takeSnapshot = () => {
    let context: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d"),
      width = video.videoWidth,
      height = video.videoHeight;

    if (width && height) {
      // Setup a canvas with the same dimensions as the video.
      canvas.width = width;
      canvas.height = height;

      // Make a copy of the current frame in the video on the canvas.
      context.drawImage(video, 0, 0, width, height);

      classifyImage();
    }
  }

  let displayPredictions = (predictions: Array<{ className: string, probability: number }>) => {
    let val = "";

    for (let prediction of predictions) {
      let perc = (prediction.probability * 100).toFixed(2);
      val += `${perc}% | ${prediction.className}\n`;
      console.log(val);
    }
    pre.innerHTML = val;
  }

    let classifyImage = async () => {
    // let blob = await this.getImageBlob();
    let predictions = await model.classify(canvas);
    displayPredictions(predictions);

    // console.log("Predictions: ");
    // console.log(predictions);
  }

  let main = async () => {
    model = await mobilenet.load();
    await startCamera();
  }

  p.setup = () => {
    main();
  }

}

var sketch: p5 = new p5(config);
