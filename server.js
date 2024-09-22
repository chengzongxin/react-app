const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const videosDirectory = 'E:\\Movie'; // 修改为 E:\Movie

// 启用 CORS 以避免跨域问题
app.use(cors());

// 设置静态文件路径
app.use('/videos', express.static(videosDirectory));

// API 获取视频文件列表
app.get('/api/videos', (req, res) => {
  fs.readdir(videosDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: '无法读取视频文件' });
    }
    // 过滤出 mp4 文件
    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    res.json(videoFiles);
  });
});

// 启动服务器
const port = 5000;
app.listen(port, () => {
  console.log(`服务器在 http://192.168.10.111:${port} 运行`);
});
