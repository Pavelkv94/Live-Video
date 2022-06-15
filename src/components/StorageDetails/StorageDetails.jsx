import { Button, Card, Input, PageHeader, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./StorageDetails.css";
import {
    deleteBucket,
    fetchBuckets,
    fetchStorage,
    updateBucket,
} from "../../redux/storagesReducer";
import { dateConvert } from "../../utils/dateConvert";
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { DeleteModal } from "../general/DeleteModal";
import { CustomModal } from "../general/CustomModal";

const StorageDetails = React.memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const ref = useRef();
    const currentStorage = useSelector(
        (state) => state.storagesReducer.currentStorage
    );
    const buckets = useSelector((state) => state.storagesReducer.bucketsList);
    const [open, setOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [flag, setFlag] = useState("create_storage");
    const [checkedElement, setCheckedElement] = useState({});
    // const deleteCameraStatus = useSelector(state => state.camerasReducer.deleteCameraStatus);
    const [editBucket, setEditBucket] = useState(false);
    const [bucketName, setBucketName] = useState("");
    const [checkedBucket, setCheckedBucket] = useState({});

    useEffect(() => {
        dispatch(fetchStorage(id));
        dispatch(fetchBuckets(id));
    }, []);

    useEffect(() => {
        editBucket && ref.current.focus();
    }, [editBucket]);
    const showModal = (flag) => {
        setFlag(flag);
        setOpen(true);
    };

    // useEffect(() => {
    //     if(deleteCameraStatus === 'fulfilled') {window.history.back()}
    // }, [deleteCameraStatus]);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, params) =>
                editBucket && checkedBucket.key === params.key ? (
                    <Input
                        ref={ref}
                        style={{ width: "max-content" }}
                        value={bucketName}
                        onChange={(e) => setBucketName(e.currentTarget.value)}
                    />
                ) : (
                    <p>{text}</p>
                ),
        }, // <p>{text}</p>
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Actions",
            dataIndex: "edit",
            key: "edit",
            render: (el, params) => (
                <div className="storage-details-actions">
                    {editBucket && checkedBucket.key === params.key ? (
                        <>
                            <Button
                                icon={<CheckOutlined />}
                                onClick={() => {
                                    dispatch(
                                        updateBucket(params.key, id, {
                                            name: bucketName,
                                        })
                                    );
                                    setCheckedBucket({});
                                    setBucketName("");
                                    setEditBucket(false);
                                }}
                            />
                            <Button
                                icon={<CloseOutlined />}
                                onClick={() => {
                                    setCheckedBucket({});
                                    setBucketName("");
                                    setEditBucket(false);
                                }}
                            />
                        </>
                    ) : (
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => {
                                setCheckedBucket(params);
                                setBucketName(params.name);
                                setEditBucket(true);
                            }}
                        />
                    )}
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    />
                </div>
            ),
        },
    ];

    const data = buckets.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at),
    }));

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={currentStorage.name}
            />
            <div className="storage-details">
                <section>
                    <h2>Storage Details</h2>
                    <Card>
                        <span>
                            <p>Storage Type:</p>
                            <p>{currentStorage.storage_type}</p>
                        </span>
                        <span>
                            <p>URL:</p>
                            <p>{currentStorage.url}</p>
                        </span>
                        <span>
                            <p>Access key:</p>
                            <p>{currentStorage.aws_access_key_id}</p>
                        </span>
                        <span>
                            <p>Secret Access key:</p>
                            <p>{currentStorage.aws_secret_access_key}</p>
                        </span>
                        <span>
                            <p>Created:</p>
                            <p>{dateConvert(currentStorage.created_at)}</p>
                        </span>
                        <span>
                            <span></span>
                            <span>
                                <Button
                                    onClick={() => {
                                        showModal("edit_storage");
                                        setCheckedElement(currentStorage);
                                    }}
                                >
                                    Edit
                                </Button>
                            </span>
                        </span>
                    </Card>
                </section>
                <section>
                    <div className="bucket-title">
                        <h2>Buckets</h2>
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => showModal("create_bucket")}
                        />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        bordered
                    />
                </section>
            </div>

            <DeleteModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item="bucket"
                callback={deleteBucket}
                id={id}
            />
            <CustomModal
                open={open}
                setOpen={setOpen}
                flag={flag}
                checkedElement={checkedElement}
            />
        </div>
    );
});

export default StorageDetails;
