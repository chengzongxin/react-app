import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null); // 创建一个引用来访问 video 元素

  useEffect(() => {
    fetch('http://localhost:5000/api/videos')
      .then(response => response.json())
      .then(data => {
        setVideos(data);
      })
      .catch(error => console.error('获取视频列表失败:', error));
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // 每次切换视频时重新加载
      videoRef.current.play(); // 自动播放
    }
  }, [selectedVideo]);

  return (
    <div className="App">
      <h2>视频列表</h2>
      <ul>
        {videos.map((video, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <span>{video}</span>
            <button 
              onClick={() => setSelectedVideo(`http://localhost:5000/videos/${video}`)} 
              style={{ marginLeft: '10px' }}
            >
              播放
            </button>
            <a 
              href={`http://localhost:5000/videos/${video}`} 
              download 
              style={{ marginLeft: '10px' }}
            >
              下载
            </a>
          </li>
        ))}
      </ul>

      {selectedVideo && (
        <div style={{ marginTop: '20px' }}>
          <h3>正在播放：</h3>
          <video width="600" controls ref={videoRef}>
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default App;
