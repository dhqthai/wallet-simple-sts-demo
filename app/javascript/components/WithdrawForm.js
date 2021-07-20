import React, { useState } from 'react';
import {Button, Form, InputNumber, Input, Space} from 'antd';
import {openNotificationWithIcon} from "./notification";
const { TextArea } = Input;

const WithdrawForm = (props) => {
    const {onCancel} = props;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        setLoading(true);
        const url = "http://localhost:3000/api/v1/wallets/withdraw";
        const body = {
            withdraw: values
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
                label="Amount"
                name="amount"
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
                    <Button loading={loading} type="primary" htmlType="submit">Withdraw</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default WithdrawForm;