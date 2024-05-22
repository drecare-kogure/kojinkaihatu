import React, { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const MAX_SIZE = 200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_SIZE) {
                height *= MAX_SIZE / width;
                width = MAX_SIZE;
              }
            } else {
              if (height > MAX_SIZE) {
                width *= MAX_SIZE / height;
                height = MAX_SIZE;
              }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
              resolve(blob);
            }, file.type);
          };
        };

        reader.readAsDataURL(file);
      });
    }))
    .then((resizedImages) => {
      setImages([...images, ...resizedImages]);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} multiple />
      <div style={{ display: 'flex' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Image ${index}`}
            style={{ marginRight: '10px', maxHeight: '200px', maxWidth: '200px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
