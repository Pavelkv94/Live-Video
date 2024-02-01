import { Button, Card, Input, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "./StorageDetails.scss";
import { deleteBucket, deleteStorage, fetchBuckets, fetchStorage, updateBucket } from "../../../redux/storagesReducer";
import { dateConvert } from "../../../utils/dateConvert";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { DeleteModal } from "../../general/DeleteModal";
import { CopyClipboard } from "../../general/CopyClipboard";
import { CustomModal } from "../CustomModal";
import { PageHeader } from "@ant-design/pro-layout";

const StorageDetails = React.memo(({t, isMobileSize}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const ref = useRef();
    const currentStorage = useSelector((state) => state.storagesReducer.currentStorage);
    const navigate = useNavigate();
    const buckets = useSelector((state) => state.storagesReducer.bucketsList);
    const [open, setOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [flag, setFlag] = useState("default");
    const [checkedElement, setCheckedElement] = useState({});
    // const deleteCameraStatus = useSelector(state => state.camerasReducer.deleteCameraStatus);
    const [editBucket, setEditBucket] = useState(false);
    const [bucketName, setBucketName] = useState("");
    const [checkedBucket, setCheckedBucket] = useState({});
    const [deleteType, setDeleteType] = useState("");

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

    const handleSubmitDeleteBucketModal = () => {
        dispatch(deleteBucket(checkedBucket.id, id));
        setIsModalVisible(false);
        navigate("/storages");
    };

    const handleSubmitDeleteStorageModal = () => {
        dispatch(deleteStorage(id));
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            render: (text, params) =>
                editBucket && checkedBucket.key === params.key ? (
                    <Input ref={ref} style={{ width: "max-content" }} value={bucketName} onChange={(e) => setBucketName(e.currentTarget.value)} />
                ) : (
                    <p>{text}</p>
                )
        }, // <p>{text}</p>
        {
            title: t("created"),
            dataIndex: "created_at",
            key: "created_at"
        },
        {
            title: t("actions"),
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
                                            name: bucketName
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
                        onClick={() => {
                            setCheckedBucket(params);
                            setIsModalVisible(true);
                            setDeleteType("bucket");
                        }}
                    />
                </div>
            )
        }
    ];

    const data = buckets.map((el) => ({
        ...el,
        key: el.id,
        created_at: dateConvert(el.created_at),
        updated_at: dateConvert(el.updated_at)
    }));

    return (
        <div>
            <PageHeader className="site-page-header" onBack={() => window.history.back()} title={currentStorage.name} />
            <div className="storage-details">
                <section>
                    <h2>{t("storage_details")}</h2>
                    <Card>
                        <span>
                            <p>{t("storage_type")}:</p>
                            <p>{currentStorage.storage_type}</p>
                        </span>
                        <span>
                            <p>URL:</p>
                            <p>{currentStorage.url}</p>
                        </span>
                        <span>
                            <p>{t("access_key")}:</p>
                            <p className="access-key">
                                {currentStorage.aws_access_key_id}
                                <CopyClipboard value={currentStorage.aws_access_key_id} />
                            </p>
                        </span>
                        <span>
                            <p>{t("secret_access_key")}:</p>
                            <p className="access-key">
                                {currentStorage.aws_secret_access_key}
                                <CopyClipboard value={currentStorage.aws_secret_access_key} />
                            </p>
                        </span>
                        <span>
                            <p>{t("created")}:</p>
                            <p>{dateConvert(currentStorage.created_at)}</p>
                        </span>
                        <span>
                            <span></span>
                            <span>
                                <Button
                                    style={{ marginRight: "20px" }}
                                    onClick={() => {
                                        showModal("edit_storage");
                                        setCheckedElement(currentStorage);
                                    }}
                                >
                                    {t("edit")}
                                </Button>
                                <Button
                                    danger
                                    onClick={() => {
                                        setIsModalVisible(true);
                                        setCheckedElement(currentStorage);
                                        setDeleteType("storage");
                                    }}
                                >
                                    {t("delete_storage")}
                                </Button>
                            </span>
                        </span>
                    </Card>
                </section>
                <section>
                    <div className="bucket-title">
                        <h2>{t("buckets")}</h2>
                        <Button shape="circle" icon={<PlusOutlined />} onClick={() => showModal("create_bucket")} />
                    </div>
                    <Table columns={columns} dataSource={data} pagination={false} bordered size={isMobileSize ? "small" : "middle"}/>
                </section>
            </div>

            {isModalVisible && (
                <DeleteModal
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    item={deleteType}
                    submitModal={deleteType === "storage" ? handleSubmitDeleteStorageModal : handleSubmitDeleteBucketModal}
                />
            )}
            {open && <CustomModal t={t} open={open} setOpen={setOpen} flag={flag} setFlag={setFlag} checkedElement={checkedElement} />}
        </div>
    );
});

export default StorageDetails;
