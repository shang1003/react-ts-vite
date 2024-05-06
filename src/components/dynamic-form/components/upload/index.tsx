import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useTranslation } from "react-i18next";
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const App: React.FC<any> = ({ onChange, listType = "picture-card", beforeUpload }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { t } = useTranslation();
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    // 处理文件上传前的操作
    const beforeUploadImage = (file: UploadFile) => {
        if (beforeUpload) {
            return beforeUpload(file, Upload.LIST_IGNORE)
        }
        const type = ['image/png', 'image/jpeg'];
        if (!type.includes(file.type || '')) {
            message.error(`${t('please upload images in jpg or png format')}`);
            return Upload.LIST_IGNORE;
        } else if ((file.size ?? 0) > 2 * 1024 * 1024) {
            message.error(`${t('the uploaded image cannot be larger than 2MB')}`);
            return Upload.LIST_IGNORE;
        }
        setFileList([file]);
        return false; // 阻止默认上传行为
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        const formData = new FormData();
        newFileList[0] && formData.append('file', newFileList[0]!.originFileObj!); // 将上传的文件添加到 FormData
        setFileList(newFileList);
        onChange && onChange(newFileList[0] && formData)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
            <Upload
                action='api/upload'
                method='post'
                listType={listType}
                fileList={fileList}
                beforeUpload={beforeUploadImage}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default App;