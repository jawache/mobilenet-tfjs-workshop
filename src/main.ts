var config = (p: p5) => {

  let video: HTMLVideoElement = <HTMLVideoElement> document.getElementById("video");
  let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
  let pre: HTMLPreElement = <HTMLPreElement> document.getElementById("predictions");
  let model = null;

  // Captures webcam image every 1 second
  let startCamera = async () => {
    let stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();

    setInterval(() => takeSnapshot(), 1000);
  }

  // Captures webcame image
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

  // Print predictions on page
  let displayPredictions = (predictions: Array<{ className: string, probability: number }>) => {
    let val = "";

    // TODO - (3) - Pretty print the predictions and display on the screen

    pre.innerHTML = val;
  }

  // Run image classifier on every snapshot
  let classifyImage = async () => {
    let predictions = []
    // TODO - (2) - Pass the canvas to mobile net and get the predictions

    displayPredictions(predictions);
    // console.log("Predictions: ");
    // console.log(predictions);
  }

  let main = async () => {
    // TODO - (1) - Load MobileNet then start the camera
    await startCamera();
  }


  // p5 routines
  p.setup = () => {
    main();
  }

}

var sketch: p5 = new p5(config);
