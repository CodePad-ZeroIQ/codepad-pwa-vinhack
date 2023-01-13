import React, { useState, useEffect } from "react";
// import './styles.css'
import Cropper from 'cropperjs';

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
}

useEffect(() => {
  if (imageSrc) {
      const image = document.getElementById('image');
      setCropper(new Cropper(image, {
          aspectRatio: 16 / 9,
          crop: function(e) {
              console.log(e.detail.x);
              console.log(e.detail.y);
          }
      }));
  }
}, [imageSrc]);

const handleCropClick = () => {
  if (cropper) {
      const imgurl = cropper.getCroppedCanvas().toDataURL();
      const img = document.createElement("img");
      img.src = imgurl;
      document.getElementById("cropped_result").appendChild(img);
      console.log("cropper clicked")

  }
  console.log("cropper clicked out")
}

  return (

      <div class="w-screen max-h-[500px] ">
          <input className="text-white ml-24 mt-10 mb-8" type="file" onChange={handleImageChange} />
          <img id="image" className="mt-2" src={imageSrc} alt=""/>
          <button className="bg-white w-16 h-10 rounded-md mt-2" onClick={handleCropClick}>Crop</button>
          <div id="cropped_result"></div>
      </div>
 
  );
}

export default Camera;