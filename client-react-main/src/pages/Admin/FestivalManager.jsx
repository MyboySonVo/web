import React, { useState, useEffect } from 'react';
import { Button, Modal, message, Table, Popconfirm, Form, Input, Space, DatePicker, Image, Tag, Typography, Card } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined, PlusOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

// --- DỮ LIỆU GIẢ LẬP ---
const initialFestivals = [
  { 
    key: '1', 
    id: 'fest_01', 
    name: 'Liên hoan phim Châu Á tại Trung tâm chiếu phim quốc gia', 
    image: 'https://files.catbox.moe/g2s89d.jpg',
    location: 'Hà Nội, Việt Nam',
    description: 'Sự kiện điện ảnh thường niên lớn nhất...',
    startDate: '2025-10-20',
    endDate: '2025-10-27',
  },
  { 
    key: '2', 
    id: 'fest_02', 
    name: 'LIÊN HOAN PHIM QUỐC TẾ HÀ NỘI LẦN THỨ VI (HANIF VI)', 
    image: 'https://files.catbox.moe/lqnu35.jpg',
    location: 'Trung tâm Hội nghị Quốc gia',
    description: 'Nơi hội tụ của các tài năng điện ảnh...',
    startDate: '2025-11-08',
    endDate: '2025-11-12',
  },
];

const { RangePicker } = DatePicker;
const { Text, Title } = Typography;
const { TextArea } = Input;

// --- Component Form ---
const FestivalForm = ({ initialValues, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const isEditing = !!initialValues;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        dateRange: [
          initialValues.startDate ? moment(initialValues.startDate) : null,
          initialValues.endDate ? moment(initialValues.endDate) : null
        ]
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    const dataToSave = {
      ...values,
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD'),
    };
    delete dataToSave.dateRange;
    onSave(dataToSave);
  };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={handleFinish}
      style={{ padding: '8px 0' }}
    >
      <Form.Item
        name="name"
        label={<Text strong>Tên Liên hoan phim</Text>}
        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
      >
        <TextArea rows={2} placeholder="Ví dụ: Liên hoan phim quốc tế Hà Nội lần thứ VI" />
      </Form.Item>
      
      <Form.Item
        name="image"
        label={<Text strong>Link Ảnh Banner (URL)</Text>}
        rules={[{ required: true, message: 'Vui lòng nhập link ảnh!' }]}
      >
        <Input placeholder="https://example.com/banner.jpg" />
      </Form.Item>
      
      <Form.Item
        name="dateRange"
        label={<Text strong>Thời gian diễn ra</Text>}
        rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu và kết thúc!' }]}
      >
        <RangePicker 
          style={{ width: '100%' }}
          format="DD/MM/YYYY"
          placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
        />
      </Form.Item>

      <Form.Item
        name="location"
        label={<Text strong>Địa điểm tổ chức</Text>}
        rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
      >
        <Input prefix={<EnvironmentOutlined />} placeholder="Ví dụ: Trung tâm chiếu phim quốc gia, Hà Nội" />
      </Form.Item>

      <Form.Item
        name="description"
        label={<Text strong>Mô tả sự kiện</Text>}
      >
        <TextArea rows={4} placeholder="Nhập mô tả chi tiết về liên hoan phim" />
      </Form.Item>

      <Form.Item style={{ textAlign: 'right', marginTop: '24px', marginBottom: 0 }}>
        <Space>
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            {isEditing ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

// --- Component Trang chính ---
const FestivalManager = () => {
  const [festivals, setFestivals] = useState(initialFestivals);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFestival, setEditingFestival] = useState(null);

  const handleAdd = () => { setEditingFestival(null); setIsModalVisible(true); };
  const handleEdit = (item) => { setEditingFestival(item); setIsModalVisible(true); };
  const handleCancel = () => { setIsModalVisible(false); };

  const handleDelete = (key) => {
    setFestivals(festivals.filter(item => item.key !== key));
    message.success('Xóa liên hoan phim thành công!');
  };

  const handleSave = (formData) => {
    if (editingFestival) {
      setFestivals(festivals.map(f => (f.key === editingFestival.key ? { ...f, ...formData } : f)));
      message.success('Cập nhật liên hoan phim thành công!');
    } else {
      const newItem = { key: Date.now().toString(), id: `fest_${Date.now()}`, ...formData };
      setFestivals([...festivals, newItem]);
      message.success('Thêm liên hoan phim thành công!');
    }
    setIsModalVisible(false);
  };

  const getFestivalStatus = (startDate, endDate) => {
    const now = moment();
    const start = moment(startDate);
    const end = moment(endDate);

    if (now.isBefore(start)) {
      return <Tag color="blue" icon={<ClockCircleOutlined />}>Sắp diễn ra</Tag>;
    }
    if (now.isBetween(start, end, null, '[]')) {
      return <Tag color="green" icon={<CalendarOutlined />}>Đang diễn ra</Tag>;
    }
    return <Tag color="default">Đã kết thúc</Tag>;
  };

  const columns = [
    {
      title: 'Banner',
      dataIndex: 'image',
      key: 'image',
      render: (url) => (
        <Image 
          src={url} 
          alt="banner" 
          width={120} 
          height={80}
          style={{ borderRadius: '8px', objectFit: 'cover' }} 
          preview={{ mask: 'Xem ảnh' }}
        />
      ),
      width: 140,
    },
    {
      title: 'Thông tin Liên hoan phim',
      key: 'info',
      render: (_, record) => (
        <div>
          <Title level={5} style={{ margin: 0, marginBottom: 8, color: '#1890ff' }}>
            {record.name}
          </Title>
          <Space direction="vertical" size={4}>
            <Text type="secondary">
              <EnvironmentOutlined style={{ marginRight: 6 }} />
              {record.location}
            </Text>
            <Text type="secondary" ellipsis style={{ display: 'block', maxWidth: 400 }}>
              {record.description}
            </Text>
          </Space>
        </div>
      ),
    },
    {
      title: 'Thời gian',
      key: 'dates',
      render: (_, record) => (
        <Space direction="vertical" size={4}>
          <div>
            <CalendarOutlined style={{ marginRight: 6, color: '#52c41a' }} />
            <Text strong>{moment(record.startDate).format('DD/MM/YYYY')}</Text>
          </div>
          <div style={{ textAlign: 'center', color: '#999' }}>—</div>
          <div>
            <CalendarOutlined style={{ marginRight: 6, color: '#ff4d4f' }} />
            <Text strong>{moment(record.endDate).format('DD/MM/YYYY')}</Text>
          </div>
        </Space>
      ),
      width: 160,
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => getFestivalStatus(record.startDate, record.endDate),
      width: 140,
      filters: [
        { text: 'Sắp diễn ra', value: 'upcoming' },
        { text: 'Đang diễn ra', value: 'ongoing' },
        { text: 'Đã kết thúc', value: 'ended' },
      ],
      onFilter: (value, record) => {
        const now = moment();
        const start = moment(record.startDate);
        const end = moment(record.endDate);
        if (value === 'upcoming') return now.isBefore(start);
        if (value === 'ongoing') return now.isBetween(start, end, null, '[]');
        return now.isAfter(end);
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary"
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa Liên hoan phim?"
            description="Bạn có chắc muốn xóa mục này?"
            onConfirm={() => handleDelete(record.key)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '24px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      <Card 
        style={{ 
          maxWidth: 1400, 
          margin: '0 auto',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '2px solid #f0f0f0'
        }}>
          <div>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              🎬 Quản lý Liên hoan phim
            </Title>
            <Text type="secondary">Tổng số: {festivals.length} liên hoan phim</Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
            size="large"
            style={{ 
              height: '44px',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            Thêm LHP mới
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={festivals}
          rowKey="key"
          pagination={{ 
            pageSize: 5,
            showTotal: (total) => `Tổng ${total} mục`,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20']
          }}
          loading={isLoading}
          scroll={{ x: 1200 }}
          style={{ 
            background: '#fff',
            borderRadius: '8px'
          }}
        />
      </Card>

      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            {editingFestival ? "✏️ Chỉnh sửa Liên hoan phim" : "➕ Thêm Liên hoan phim mới"}
          </Title>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={700}
        style={{ top: 20 }}
      >
        <FestivalForm
          initialValues={editingFestival}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default FestivalManager;