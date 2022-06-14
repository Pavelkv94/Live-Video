import { Button, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../redux/videosReducer";
import { dateConvert } from "../../../utils/dateConvert";
import "./History.css";
export const History = ({ id }) => {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.videosReducer.videosList);
    const currentCamera = useSelector((state) => state.camerasReducer.currentCamera);

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
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) =>
                text ? <p className="status-video">{text}</p> : "—",
        },
    ];

    const data = videos.map((el) => ({ ...el, key: el.id, created_at: dateConvert(el.created_at), updated_at: dateConvert(el.updated_at) }));

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) => {
                    return (
                        <div className="description-video-wrapper">
                        <div className="description-video">
                            <div className="description-video-column">
                            <span><p>Camera:</p> <p style={{ margin: 0 }}>{currentCamera.name}</p></span> 
                           <span><p>Time interval:</p> <p style={{ margin: 0 }}>{record.time_interval}</p></span> 
                           <span><p>Storage:</p> <p style={{ margin: 0 }}>{`record.status`}</p></span> 
                           <span><p>Bucket:</p> <p style={{ margin: 0 }}>{`record.status`}</p></span> 
                           <span><p>Duration, s:</p> <p style={{ margin: 0 }}>{record.duration}s</p></span> 

                            </div>
                            <div className="description-video-column">
                            <span><p>Size:</p> <p style={{ margin: 0 }}>{record.size}</p></span> 
                           <span><p>Status:</p> {record.status ? <p style={{ margin: 0 }} className="status-video">{record.status}</p> : <p style={{ margin: 0 }}>{"—"}</p>}</span> 
                           <span><p>Created:</p> <p style={{ margin: 0 }}>{record.created_at}</p></span> 
                           <span><p>Updated:</p> <p style={{ margin: 0 }}>{record.updated_at}</p></span> 
                            </div>
                            </div>
                            <div className="controls-video-column">
                                <Button type="dashed" danger disabled={record.status === 'deleted from storage'}>Delete video from storage</Button>
                                <Button danger type="primary">Delete video from this service</Button>
                            </div>

                        </div>
                    );
                },
            }}
            dataSource={data}
        />
    );
};
