import React, { useState, useEffect, useRef } from 'react';
import { List, Button, Typography, Card, Layout, Row, Col } from 'antd';

const { Title } = Typography;
const { Header, Content } = Layout;

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch('http://192.168.10.111:5000/api/videos')
      .then(response => response.json())
      .then(data => {
        setVideos(data);
      })
      .catch(error => console.error('获取视频列表失败:', error));
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [selectedVideo]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', textAlign: 'center', fontSize: '24px' }}>
        视频播放器
      </Header>
      <Content style={{ padding: '20px' }}>
        {selectedVideo && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Title level={3}>正在播放：</Title>
            <video 
              style={{ width: '80%', maxHeight: '400px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }} 
              controls 
              ref={videoRef}
            >
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>视频列表</Title>
        <Row gutter={[16, 16]}>
          {videos.map((video, index) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt={video}
                    src={`http://192.168.10.111:5000/videos/thumbnail/${video}`} // 假设有缩略图
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                }
                actions={[
                  <Button 
                    type="primary" 
                    onClick={() => setSelectedVideo(`http://192.168.10.111:5000/videos/${video}`)}
                  >
                    播放
                  </Button>,
                  <Button 
                    type="default" 
                    href={`http://192.168.10.111:5000/videos/${video}`} 
                    download
                  >
                    下载
                  </Button>
                ]}
              >
                <Card.Meta title={video} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
