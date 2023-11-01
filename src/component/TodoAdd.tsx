import { Space, Table, Tag, Form, Input, Modal } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getHookList } from '../service/codeing';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
interface DataType {
    id: number,
    taskName: string,
    status: boolean
}
interface IHookList {
    id: number,
    taskName: string,
    status: boolean
}
const columns: ColumnsType<DataType> = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
    },
    {
        title: '任务状态',
        dataIndex: 'status',
        key: 'status',
        render: text => <a>{text == true ? "已完成" : "未完成"}</a>,
    },

    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>状态修改</a>
            </Space>
        ),
    },
];




const TodoAdd: React.FC<any> = (props: any) => {
    const { visable } = props
    const [form] = useForm()
    useEffect(() => {
        initMenuList();
    }, []);
    const [data, setData] = useState<Array<IHookList>>()
    const initMenuList = async () => {
        // 想加入前端交流群可以私信我

        const response = await getHookList({});
        setData(response.data)

    };
    const handleOK = () => {
        axios.post(`http://localhost:5000/hookList`, {
            taskName: form.getFieldValue("name"),
            status:"0"
        }).then(res => {
           
            props.onConfirm();
        })
       
    }
    const handleCancle = () => {
        props.onCancle()
    }
    return (
        <Modal title="新增任务" open={visable} onOk={handleOK} onCancel={handleCancle}>
            <Form form={form}>
                <Form.Item label="任务名称" name="name">
                    <Input placeholder='请输入任务名称'></Input>
                </Form.Item>
            </Form>
        </Modal>

    )

}



export default TodoAdd;