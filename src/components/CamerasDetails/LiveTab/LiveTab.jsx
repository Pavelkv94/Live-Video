import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { loadPlayer } from 'rtsp-relay/browser';
import { deleteCamera } from "../../../redux/camerasReducer";
import { CustomModal } from "../../general/CustomModal";
import { DeleteModal } from "../../general/DeleteModal";
import "./LiveTab.css";

export const LiveTab = ({ currentCamera }) => {
    const canvas = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState('create_camera');

    // useEffect(() => {
    //     if (!canvas.current) throw new Error('Ref is null');
    
    //     loadPlayer({
    //       url: 'ws://localhost:2000/api/stream',
    //       canvas: canvas.current,
    //     });
    //   }, []);

    const showModal = () => {
        setFlag('edit_camera')
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
        { title: "Created: ", value: currentCamera.created_at || "—" },
        { title: "Updated: ", value: currentCamera.updated_at || "—" },
        { title: "User: ", value: currentCamera.user_id || "—" },
        { title: "Bucket: ", value: currentCamera.bucket_id || "—" },
    ];

    const params = paramsData.map((el, index) => (
        <span key={index} className="params-row">
            <p>{el.title}</p>
            <p>{el.value}</p>
        </span>
    ));
    return (
        <div>
            <div className="camera-details">
                <section><canvas ref={canvas} className="live"/></section>
                <section>
                    {params}
                    <div className="camera-actions">
                        <Button onClick={showModal}>Edit Camera</Button>
                        <Button onClick={() => setIsModalVisible(true)} danger>Delete Camera</Button>
                    </div>
                    <div>
                        scedule
                    </div>
                </section>
            </div>

            <CustomModal open={open} setOpen={setOpen} flag={flag} checkedElement={currentCamera}/>
            <DeleteModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} item='camera' callback={deleteCamera} id={currentCamera.id}/>
        </div>
    );
};
