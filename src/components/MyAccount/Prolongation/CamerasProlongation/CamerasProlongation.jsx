import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamerasTariffs } from "../../../../redux/tariffsReducer";
import { initialProlongCamera } from "../../../general/initialData";
import { Button, Input, Radio, Select, Table } from "antd";
import { cameraProlongation } from "../../../../redux/trackersReducer";
import { dateConvert } from "../../../../utils/dateConvert";
import { fetchCameras } from "../../../../redux/camerasReducer";
import "./CamerasProlongation.scss";

const CamerasProlongation = ({t, isMobileSize}) => {
    const dispatch = useDispatch();

    const [prolongData, setProlongData] = useState([]);

    const user = useSelector((state) => state.authReducer.user);
    const camerasList = useSelector((state) => state.camerasReducer.camerasList);
    const tariffs = useSelector((state) => state.tariffsReducer.camerasTariffsList);

    useEffect(() => {
        dispatch(fetchCameras(user.id));
        dispatch(fetchCamerasTariffs());
    }, [dispatch]);

    useEffect(() => {
        camerasList && setProlongData(camerasList.filter((el) => !el.shared).map((el) => ({...initialProlongCamera, camera_id: el.id})));
    }, [camerasList]);

    const handleSelectTariff = (id) => (value) => {
        setProlongData(prolongData.map((el) => (el.camera_id === id ? { ...el, camera_tariff_id: value } : el)));
    };
    const onChangeMounth = (id) => (e) => {
        setProlongData(prolongData.map((el) => el.camera_id === id ? ({ ...el, month_amount: e.target.value }) : el));
    };

    const prolongCamera = (id) => () => {
        const payload = prolongData.find((el) => el.camera_id === id);
        dispatch(cameraProlongation(id, payload, user.id));
    };

    const expiredTariff = (date) => {
        const currentDate = new Date();
        const paidDate = new Date(date);
        return currentDate - paidDate > 0;
    };

    const options = tariffs.map((el) => ({ label: el.name, value: el.id }));

    const columns = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            align: "center",
            render: (text, params) => (
                <span
                    style={{ cursor: "pointer", color: "#1677ff" }}
                >
                    <a href={`/cameras/details/${params.id}`}>{text}</a>
                </span>
            )
        },
        {
            title: t("model"),
            dataIndex: "model",
            key: "model",
            align: "center"
        },
        {
            title: t("ip"),
            dataIndex: "ip_address",
            key: "ip_address",
            align: "center"
        },
        {
            title: t("tariff_name"),
            dataIndex: "camera_tariff_id",
            key: "camera_tariff_id",
            align: "center",
            render: (text) => tariffs.find((el) => text === el.id)?.name || "—"
        },
        {
            title: t("paid_up_to"),
            dataIndex: "paid_till",
            key: "paid_till",
            align: "center",
            render: (text) => (
                <div className={expiredTariff(text) ? "red-cell" : ""}>
                    {dateConvert(text)} {expiredTariff(text) && `(${t("expired")})`}
                </div>
            )
        },
        {
            title: t("new_tariff_plan"),
            dataIndex: "new_tariff_plan",
            key: "new_tariff_plan",
            align: "center",
            render: (text, params) => (
                <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={prolongData.find((el) => params.id === el.camera_id)?.camera_tariff_id}
                    onChange={handleSelectTariff(params.id)}
                    options={options}
                />
            )
        },
        {
            title: t("pay_for"),
            dataIndex: "pay_for",
            key: "pay_for",
            align: "center",
            render: (text, params) => (
                <Radio.Group onChange={onChangeMounth(params.id)} value={prolongData.find((el) => params.id === el.camera_id)?.month_amount}>
                    <Radio value={1} className="radio-pay">
                        1 M
                    </Radio>
                    <Radio value={3} className="radio-pay">
                        3 M
                    </Radio>
                    <Radio value={6} className="radio-pay">
                        6 M
                    </Radio>
                    <Radio value={12} className="radio-pay">
                        1 Y
                    </Radio>
                </Radio.Group>
            )
        },
        {
            title: t("total_amount"),
            dataIndex: "pay_action",
            key: "pay_action",
            align: "left",
            render: (text, params) => (
                <div style={{ display: "flex" }}>
                    <Input style={{ width: "100px", marginRight: 20 }} disabled value={"100 BYN"} />
                    <Button
                        type="primary"
                        style={{ background: "#5cb85c", width: 100 }}
                        onClick={prolongCamera(params.id)}
                        disabled={!prolongData.find((el) => params.id === el.camera_id)?.camera_tariff_id}
                    >
                        {t("pay")}
                    </Button>
                </div>
            )
        }
    ];
    const data = camerasList.filter((el) => !el.shared).map((el) => ({ ...el, key: el.id }));

    return (
        <div className="cameras-prolongation">
            <Table columns={columns} dataSource={data} pagination={false} size={isMobileSize ? "small" : "middle"}/>
        </div>
    );
};

export default React.memo(CamerasProlongation);
