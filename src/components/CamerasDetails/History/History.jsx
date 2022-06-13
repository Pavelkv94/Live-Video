import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../redux/videosReducer";

export const History = ({ id }) => {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.videosReducer.videosList);

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
            title: "Size, kb",
            dataIndex: "size",
            key: "size",
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
    const data = videos.map((el) => ({
        key: el.id,
        name: el.name,
        size: el.size,
        period_description: el.period_description
    }));

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
