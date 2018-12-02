function setup() {
  let video = document.getElementById("video");
  let canvas = document.getElementById("canvas");
  let pre = document.getElementById("predictions");
  let model = null;

  async function startCamera() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();

    setInterval(() => takeSnapshot(), 1000);
  }

  function takeSnapshot() {
    let context = canvas.getContext("2d"),
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

  async function classifyImage() {
    let predictions = [];
    // TODO - (2) - Pass the canvas to mobile net and get the predictionss

    displayPredictions(predictions);
  }

  function displayPredictions(predictions) {
    let val = "";

    // TODO - (3) - Pretty print the predictions and display on the screen

    pre.innerHTML = val;
  }

  async function main() {
    // TODO - (1) - Load MobileNet then start the camera
    await startCamera();
  }
  main();
}
