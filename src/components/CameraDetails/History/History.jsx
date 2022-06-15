import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
    deleteVideo,
    fetchVideos,
    updateVideo,
} from "../../../redux/videosReducer";
import { dateConvert } from "../../../utils/dateConvert";
import { DeleteModal } from "../../general/DeleteModal";
import "./History.css";

export const History = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.videosReducer.videosList);
    const currentCamera = useSelector(
        (state) => state.camerasReducer.currentCamera
    );
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [purge, setPurge] = useState(false);
    const [videoId, setVideoId] = useState("");

    useEffect(() => {
        dispatch(fetchVideos(id));
    }, []);

    const deleteFromStorage = (id) => {
        setPurge(false);
        setVideoId(id);
        setIsModalVisible(true);
    };

    const deleteFromService = (id) => {
        setPurge(true);
        setVideoId(id);
        setIsModalVisible(true);
    };
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
                text ? (
                    <Tag color="error">{text}</Tag>
                ) : (
                    <Tag color="processing">{"Uploaded into storage"}</Tag>
                ),
        },
    ];

    const data = videos.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at),
    }));

    return (
        <Table
            columns={columns}
            dataSource={data}
            expandable={{
                expandedRowRender: (record) => {
                    return (
                        <div className="description-video-wrapper">
                            <div className="description-video">
                                <div className="description-video-column">
                                    <span>
                                        <p>Camera:</p>
                                        <p style={{ margin: 0 }}>
                                            {currentCamera.name}
                                        </p>
                                    </span>
                                    <span>
                                        <p>Time interval:</p>
                                        <p style={{ margin: 0 }}>
                                            {record.time_interval}
                                        </p>
                                    </span>
                                    <span>
                                        <p>Storage:</p>
                                        <p
                                            style={{ margin: 0 }}
                                        >{record.storage_id}</p>
                                    </span>
                                    <span>
                                        <p>Bucket:</p>
                                        <p
                                            style={{ margin: 0 }}
                                        >{record.bucket_id}</p>
                                    </span>
                                    <span>
                                        <p>Duration, s:</p>
                                        <p style={{ margin: 0 }}>
                                            {record.duration}s
                                        </p>
                                    </span>
                                </div>
                                <div className="description-video-column">
                                    <span>
                                        <p>Size:</p>
                                        <p style={{ margin: 0 }}>
                                            {record.size}
                                        </p>
                                    </span>
                                    <span>
                                        <p>Created:</p>
                                        <p style={{ margin: 0 }}>
                                            {record.created_at}
                                        </p>
                                    </span>
                                    <span>
                                        <p>Updated:</p>
                                        <p style={{ margin: 0 }}>
                                            {record.updated_at}
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <div className="controls-video-column">
                                <Button
                                    type="dashed"
                                    danger
                                    disabled={
                                        record.status === "deleted from storage"
                                    }
                                    onClick={() => deleteFromStorage(record.id)}
                                >
                                    Delete video from storage
                                </Button>
                                <Button
                                    danger
                                    type="primary"
                                    onClick={() => deleteFromService(record.id)}
                                >
                                    Delete video from this service
                                </Button>
                            </div>

                            <DeleteModal
                                isModalVisible={isModalVisible}
                                setIsModalVisible={setIsModalVisible}
                                item={
                                    purge
                                        ? "video from service"
                                        : "video from storage"
                                }
                                callback={purge ? deleteVideo : updateVideo}
                                id={videoId}
                                put={!purge}
                            />
                        </div>
                    );
                },
            }}
        />
    );
};
