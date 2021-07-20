import React, { useState } from "react";
import {Button, Col, Divider, Row, Space, Statistic} from "antd";
import DepositForm from "./DepositForm";
import TransferForm from "./TransferForm";
import WithdrawForm from "./WithdrawForm";

const WalletPage = (props) => {
    const { currentUser, users, walletBalance } = props;
    console.log("==>", props);
    const isZeroBalance = walletBalance === "0.0"

    const [isShowDepositForm, setIsShowDepositForm] = useState(false);
    const [isShowWithdrawForm, setIsShowWithdrawForm] = useState(false);
    const [isShowTransferForm, setIsShowTransferForm] = useState(false);

    const toggleDepositForm = () => {
        handleCloseForms();
        setIsShowDepositForm(!isShowDepositForm);
    };

    const toggleWithdrawForm = () => {
        handleCloseForms();
        setIsShowWithdrawForm(!isShowWithdrawForm);
    };

    const toggleTransferForm = () => {
        handleCloseForms();
        setIsShowTransferForm(!isShowTransferForm);
    };

    const handleCloseForms = () => {
        setIsShowDepositForm(false);
        setIsShowWithdrawForm(false);
        setIsShowTransferForm(false);
    };

    return(
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Hello," value={currentUser?.email} />
                </Col>
                <Col span={12}>
                    <Statistic title="Wallet Balance (USD)" value={walletBalance} precision={2} />
                </Col>
                <Space>
                    <Button style={{ marginTop: 16 }} type="primary" onClick={toggleDepositForm}>
                        Deposit
                    </Button>
                    <Button disabled={isZeroBalance} style={{ marginTop: 16 }} onClick={toggleTransferForm}>
                        Transfer
                    </Button>
                    <Button disabled={isZeroBalance} style={{ marginTop: 16 }} type="primary" danger onClick={toggleWithdrawForm}>
                        Withdraw
                    </Button>
                </Space>
            </Row>
            <Row style={{ marginTop: 40 }}>
                <Col span={24}>
                    {
                        isShowDepositForm &&
                        <>
                            <Divider>Deposit</Divider>
                            <DepositForm onCancel={handleCloseForms} />
                        </>
                    }
                    {
                        isShowTransferForm &&
                        <>
                            <Divider>Transfer</Divider>
                            <TransferForm users={users} onCancel={handleCloseForms} />
                        </>
                    }
                    {
                        isShowWithdrawForm &&
                        <>
                            <Divider>Withdraw</Divider>
                            <WithdrawForm onCancel={handleCloseForms} />
                        </>
                    }
                </Col>
            </Row>
        </>
    )

}

export default WalletPage