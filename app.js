const container = document.querySelector(".container");
const generateBtn = document.querySelector(".generate-btn");
const  qrInput = document.querySelector(".qr-input");
const qrImg = document.querySelector(".qr-image");

    generateBtn.onclick = function () {      
      if(qrInput.value.length > 0){ 
        generateBtn.innerText = "Generating QR Code..."       
        qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=170x170&data="+qrInput.value;
        qrImg.onload = function () {
          container.classList.add("active");
          generateBtn.innerText = "Generate QR Code";
        }
      }
    }


   
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
    
const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
    
    let scanning = false;
    
    qrcode.callback = res => {
      if (res) {
        outputData.innerText = res;
        scanning = false;
    
        video.srcObject.getTracks().forEach(track => {
          track.stop();
        });
    
        qrResult.hidden = false;
        canvasElement.hidden = true;
        btnScanQR.hidden = false;
      }
    };
    
    btnScanQR.onclick = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
          scanning = true;
          qrResult.hidden = true;
          btnScanQR.hidden = true;
          canvasElement.hidden = false;
          video.setAttribute("playsinline", true); // required to tell that we don't want fullscreen
          video.srcObject = stream;
          video.play();
          tick();
          scan();
        });
    };
    
    function tick() {
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    
      scanning && requestAnimationFrame(tick);
    }
    
    function scan() {
      try {
        qrcode.decode();
      } catch (e) {
        setTimeout(scan, 300);
      }
    }
    