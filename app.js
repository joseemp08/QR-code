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