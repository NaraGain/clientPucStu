import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const UploadImage = () => (
  <>
    <Upload
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      listType="picture"
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
    <br />
  </>
);
export default UploadImage;