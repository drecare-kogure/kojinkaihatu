import React, { useState } from 'react';
import './ImageList.css'; // スタイル用のCSSファイルをインポート

function ImageList() {
  const [imageFiles, setImageFiles] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [imageList, setImageList] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);

    // 選択された各ファイルについて、ファイルのデータURLを取得する
    Promise.all(files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve(e.target.result); // ファイルのデータURLを解決する
        };

        reader.readAsDataURL(file); // ファイルを読み込む
      });
    }))
    .then((imageDataUrls) => {
      // 画像のデータURLをステートに追加する
      setImageList([...imageList, ...imageDataUrls]);
    });
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFiles.length === 0 && !textInput.trim()) return; // 画像ファイルとテキストのどちらも入力されていない場合は追加しない

    const newItems = imageFiles.map((file, index) => {
      const imageURL = URL.createObjectURL(file);
      return { imageURL, textInput };
    });

    setImageList([...imageList, ...newItems]);
    setImageFiles([]);
    setTextInput('');
    setPreviewURLs([]); // プレビューURLをリセット
  };

  const [previewURLs, setPreviewURLs] = useState([]); // 追加

  return (
    <div>
      <h1>Image List</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="full-width no-resize"
          rows={6}
          value={textInput}
          onChange={handleTextChange}
        />
        <div className="file-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple // 複数ファイル選択可能にする
          />
        </div>
        {/* プレビューの表示 */}
        {previewURLs.map((url, index) => (
          <div className="image-preview" key={index}>
            <img src={url} alt={`Preview ${index + 1}`} />
          </div>
        ))}
        <button type="submit" disabled={imageFiles.length === 0 && !textInput.trim()}>送信</button>
      </form>
      
      <div className="image-list-container">
        <ul className="image-list">
          {imageList.map((item, index) => (
            <li key={index}>
              <img src={item.imageURL} alt={`Uploaded ${index + 1}`} />
              <p>{item.textInput}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageList;
