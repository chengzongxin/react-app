import React, { useState, useEffect, useRef } from 'react';
import { List, Button, Typography, Layout, Row, Col } from 'antd';

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
    if (videoRef.current && selectedVideo) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [selectedVideo]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', textAlign: 'center', fontSize: '24px' }}>
        视频播放器
      </Header>
      <Content style={{ padding: '0' }}>
        <Row style={{ height: '100%' }}>
          <Col span={8} style={{ padding: '20px', overflowY: 'auto', height: '100%' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>视频列表</Title>
            <List
              bordered
              dataSource={videos}
              renderItem={(video) => (
                <List.Item
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
                  <List.Item.Meta 
                    title={video} 
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={16} style={{ position: 'relative', padding: '20px' }}>
            {selectedVideo && (
              <div style={{ position: 'fixed', top: '60px', right: '20px', zIndex: 10, width: '65%' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <Title level={3}>正在播放：{selectedVideo.split('/').pop()}</Title>
                  <video 
                    style={{ width: '100%', maxHeight: '80vh', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }} 
                    controls 
                    ref={videoRef}
                  >
                    <source src={selectedVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
