import React, { useState } from 'react';
import {Form, Button, Space, Select, Input, InputNumber} from 'antd';
import {openNotificationWithIcon} from "./notification";
const { Option } = Select;
const { TextArea } = Input;

const TransferForm = (props) => {
    const { onCancel, users } = props;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true);
        const url = "http://localhost:3000/api/v1/wallets/transfer";
        const body = {
            transfer: values
        };

        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": csrfToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => response?.json())
            .then(data => {
                if (data?.error) {
                    openNotificationWithIcon("error", "Error", data?.error)
                } else {
                    openNotificationWithIcon("info", "Success", data?.message)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }
            }).catch((error) => {
                console.error('Error:', error);
            }).finally(() => setLoading(false));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
                amount: 1
            }}
        >
            <Form.Item
                name="receiver_id"
                label="Receiver"
                rules={[
                    {
                        required: true,
                        message: 'This is required field!',
                    },
                ]}
            >
                <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select a receiver"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {users.map((user) => (
                        <Option key={user.id} value={user.id}>
                            {user.email}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="amount"
                label="Amount"
                rules={[
                    {
                        required: true,
                        message: 'This is required field!',
                    },
                ]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>
            <Form.Item
                label="Note"
                name="note"
                rules={[
                    {
                        required: true,
                        message: 'This is required field!',
                    },
                ]}
            >
                <TextArea />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button loading={loading} type="primary" htmlType="submit">Transfer</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default TransferForm;