import { Button } from "antd";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCamera } from "../../../redux/camerasReducer";
import { fetchStorage } from "../../../redux/storagesReducer";
import { dateConvert } from "../../../utils/dateConvert";
import { CustomModal } from "../../general/CustomModal";
import { DeleteModal } from "../../general/DeleteModal";
import "./LiveTab.css";

export const LiveTab = ({ currentCamera, setTab }) => {
    const dispatch = useDispatch();
    const canvas = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState("default");

    const storage = useSelector(state => state.storagesReducer.currentStorage);
    const bucket = useSelector(state => state.storagesReducer.currentBucket);
    // useEffect(() => {
    //     if (!canvas.current) throw new Error('Ref is null');

    //     loadPlayer({
    //       url: 'ws://localhost:2000/api/stream',
    //       canvas: canvas.current,
    //     });
    //   }, []);

    const showModal = () => {
        setFlag("edit_camera");
        setOpen(true);
    };

    const paramsData = [
        { title: "Ip: ", value: currentCamera.ip || "—" },
        { title: "Device Name: ", value: currentCamera.deviceName || "—" },
        { title: "MAC Address: ", value: currentCamera.macAddress || "—" },
        { title: "Model: ", value: currentCamera.model || "—" },
        { title: "Login: ", value: currentCamera.login || "—" },
        { title: "Password: ", value: currentCamera.password || "—" },
        { title: "Serial Number: ", value: currentCamera.serialNumber || "—" },
        { title: "Status: ", value: currentCamera.status || "—" },
        {
            title: "Created: ",
            value: dateConvert(currentCamera.created_at) || "—",
        },
        {
            title: "Updated: ",
            value: dateConvert(currentCamera.updated_at) || "—",
        },
        { title: "Storage: ", value: storage ? storage.name : "—" },
        { title: "Bucket: ", value: bucket ? bucket.name : "—" },
    ];

    const params = paramsData.map((el, index) => (
        <span key={index} className="params-row">
            <p>{el.title}</p>
            <p>{el.value}</p>
        </span>
    ));
    return (
        <div className="">
            <div className="camera-details">
                <section>
                    <canvas ref={canvas} className="live" />
                </section>
                <section>
                    {params}
                    <div className="camera-actions">
                        <Button type="dashed" onClick={showModal}>
                            Edit Camera
                        </Button>
                        <Button onClick={() => setTab("2")}>
                            Set Schedules
                        </Button>
                        <Button
                            onClick={() => setIsModalVisible(true)}
                            danger
                            type="primary"
                        >
                            Delete Camera
                        </Button>
                    </div>
                </section>
            </div>

            {open && <CustomModal
                open={open}
                setOpen={setOpen}
                flag={flag}
                setFlag={setFlag}
                checkedElement={currentCamera}
            />}
            <DeleteModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item="camera"
                callback={deleteCamera}
                id={currentCamera.id}
            />
        </div>
    );
};
