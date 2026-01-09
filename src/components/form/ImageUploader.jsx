import React, { useState } from "react";

const ImageUploader = ({ placeholder, name, value, onChange, error }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <input
          type="file"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            handleImageChange(event);
            onChange(event);
          }}
          accept="image/*"
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        />
      </div>
      {selectedImage && (
        <div>
          <img className="m-1"
            src={selectedImage}
            alt="Selected"
            style={{width:"100%", maxHeight: "300px" }}
          />
        </div>
      )}
      {error && <small className="text-warning">{error}</small>}
    </div>
  );
};

export default ImageUploader;
