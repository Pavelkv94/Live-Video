import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../redux/videosReducer";

export const History = ({ id }) => {
    const dispatch = useDispatch();
    const videos = useSelector(state => state.videosReducer.videosList);

    useEffect(() => {
        dispatch(fetchVideos(id));
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Period description",
            dataIndex: "period_description",
            key: "period_description",
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () => <a>Delete</a>,
        },
    ];
    const data = [
        // {
        //     key: 1,
        //     name: "John Brown",
        //     age: 32,
        //     address: "New York No. 1 Lake Park",
        //     description:
        //         "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
        // },
        // {
        //     key: 2,
        //     name: "Jim Green",
        //     age: 42,
        //     address: "London No. 1 Lake Park",
        //     description:
        //         "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
        // },
        // {
        //     key: 3,
        //     name: "Not Expandable",
        //     age: 29,
        //     address: "Jiangsu No. 1 Lake Park",
        //     description: "This not expandable",
        // },
        // {
        //     key: 4,
        //     name: "Joe Black",
        //     age: 32,
        //     address: "Sidney No. 1 Lake Park",
        //     description:
        //         "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
        // },
    ];

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) => (
                    <p style={{ margin: 0 }}>{record.description}</p>
                ),
                rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={data}
        />
    );
};
