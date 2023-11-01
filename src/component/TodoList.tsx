import { Button, Space, Table, Tag } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getHookList } from '../service/codeing';
import TodoAdd from './TodoAdd';
import axios from 'axios';
interface DataType {
    id:number,
    taskName:string,
    status:boolean
}
interface IHookList{
    id:number,
    taskName:string,
    status:boolean
}
const TodoList: React.FC = () => {
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
            render: text => <a>{text==true?"已完成":"未完成"}</a>,
        },
    
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={()=>handleStatus(record,"0")}>修改为未完成</a>
                    <a onClick={()=>handleStatus(record,"1")}>修改为已完成</a>
                    <a onClick={()=>handleDelete(record)}>删除</a>
                </Space>
            ),
        },
    ];
    const handleDelete=(record:any)=>{
        axios.delete(`http://localhost:5000/hookList/${record.id}`, {
            
        }).then(res => {
           
           initMenuList()
        })
    }
    const handleStatus=(record:any,data:any)=>{
        axios.patch(`http://localhost:5000/hookList/${record.id}`, {
            status:data
        }).then(res => {
           console.log(res)
           initMenuList()
        })
        
    }
    const [visable,setVisable]=useState<boolean>(false)
    const handleClick=()=>{
       setVisable(true)
    }
    useEffect(() => {
        initMenuList();
    }, []);
    const [data,setData]=useState<Array<IHookList>>()
    const initMenuList = async () => {
        // 想加入前端交流群可以私信我
        const response = await getHookList({  });
        setData(response.data)
    };
    const onCancle=()=>{
        setVisable(false)
        
    }
    const onConfirm=()=>{
        initMenuList()
        setVisable(false)
    }
    return (
    <>
    <Button type='primary' onClick={handleClick}>新增任务</Button>
    <Table columns={columns} dataSource={data} />
       <TodoAdd visable={visable} onConfirm={onConfirm} onCancle={onCancle}></TodoAdd>
    </>)
        
}




export default TodoList;