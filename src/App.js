import React, { useState, useRef } from 'react';
import './MessageBoard.css'; // CSSファイルのインポート

function MessageBoard() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null); // textareaの参照を作成

  const handleTextareaChange = () => {
    // textareaの高さを内容に合わせて調整
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 初期化
      textarea.style.height = `${textarea.scrollHeight}px`; // スクロール高さを設定
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }); // 時と分のみを取得
      setMessages([...messages, { text: inputText, time: currentTime }]);
      setInputText('');
    }
  };

  const handleDeleteMessage = (index) => {
    const confirmDelete = window.confirm('このメッセージを削除しますか？');
    if (confirmDelete) {
      const newMessages = [...messages];
      newMessages.splice(index, 1);
      setMessages(newMessages);
    }
  };

  return (
    <div className="message-board-container">
      <h1>テキストリスト</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}><div>
            <div className='messageTime'>{message.time}</div> {/* 送信時の時間を表示 */}
            </div>
            {/* テキストを <br> タグに置き換えて表示 */}
            {message.text.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
            <button className="delete-button" onClick={() => handleDeleteMessage(index)}>Delete</button>
            <hr/>
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="message-form">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => { setInputText(e.target.value); handleTextareaChange(); }} // テキストが変更されたときに高さを調整
          placeholder="メッセージ"
          className="message-textarea"
        />
        <button type="submit" className="message-button" disabled={!inputText.trim()}>送信</button> {/* 空白のみの場合は無効化 */}
      </form>
    </div>
  );
}

export default MessageBoard;
