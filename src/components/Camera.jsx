import React, { useState, useEffect } from "react";
// import './styles.css'
import Cropper from "cropperjs";

const Camera = () => {
  // .image_container{
  //   max-width: 800px;
  //   max-height: 450px;
  // }
  const [imageSrc, setImageSrc] = useState(null);
  const [cropper, setCropper] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (imageSrc) {
      const image = document.getElementById("image");
      setCropper(
        new Cropper(image, {
          crop: function (e) {
            console.log(e.detail.x);
            console.log(e.detail.y);
          },
        })
      );
    }
  }, [imageSrc]);

  const handleCropClick = () => {
    if (cropper) {
      const imgurl = cropper.getCroppedCanvas().toDataURL("image/jpeg",0.4);
      const img = document.createElement("img");
      img.src = imgurl;
      console.log("image url", imgurl);
      console.log("image src", img.src);
      document.getElementById("cropped_result").appendChild(img);
      console.log("cropper clicked");
      console.log(imgurl.split(",")[1]);
      // console.log(final)
      let base = imgurl.split(",")[1];
      // setFinal(base);
      fetch("https://zfqj8i.deta.dev/api/recognizeText", {
        method: "POST", // or 'PUT'
        body: JSON.stringify({
          base64: base,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log(base);
    }
  };
  console.log("cropper clicked out");

  // const sendBase = ()=> {
  //   fetch('https://dz1t8o.deta.dev/api/recognizeText', {
  //   method: 'POST', // or 'PUT'
  //   body: JSON.stringify({
  //     img: base,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //    console.log('Success:', data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });

  //   console.log(base);
  // }

  return (
    <div class="w-screen max-h-[500px] ">
      <input
        className="text-white ml-24 mt-10 mb-8"
        type="file"
        onChange={handleImageChange}
      />
      <img id="image" className="mt-2" src={imageSrc} alt="" />
      <button
        className="bg-white w-16 h-10 rounded-md mt-2"
        onClick={handleCropClick}
      >
        Crop
      </button>
      <div id="cropped_result"></div>
    </div>
  );
};

export default Camera;
