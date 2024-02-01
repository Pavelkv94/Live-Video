import { Button, Input } from "antd";
import React, { useState } from "react";
import "./AdminProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminProfile } from "../../../redux/authReducer";

const AdminProfile = ({ t }) => {
    const user = useSelector((state) => state.authReducer.user);
    const dispatch = useDispatch();
    const updatedAdmin = {
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: ""
    };

    const [updateData, setUpdateData] = useState(updatedAdmin);

    const handleInput = (key) => (e) => {
        setUpdateData({ ...updateData, [key]: e.currentTarget.value });
    };

    const disableButton =
        !updateData.name ||
        !updateData.email ||
        !updateData.password ||
        !updateData.password_confirmation ||
        updateData.password !== updateData.password_confirmation;

    const onSubmitUpdate = () => {
        dispatch(updateAdminProfile(user.id, updateData));
    };

    return (
        <div className="adminProfile">
            <h2>Admin Profile</h2>
            <section>
                <div>
                    <label>{t("name")}</label>
                    <Input placeholder={t("enter_name")} value={updateData.name} onChange={handleInput("name")} />
                </div>
                <div>
                    <label>{t("email")}</label>
                    <Input placeholder={t("enter_email")} value={updateData.email} onChange={handleInput("email")} />
                </div>
                <div>
                    <label>{t("password")}</label>
                    <Input.Password
                        placeholder={t("enter_password")}
                        value={updateData.password}
                        onChange={handleInput("password")}
                        autoComplete="off"
                        size="small"
                    />
                </div>
                <div>
                    <label>{t("password")}</label>
                    <Input.Password
                        placeholder={t("enter_password")}
                        value={updateData.password_confirmation}
                        onChange={handleInput("password_confirmation")}
                        size="small"
                    />
                </div>
                <Button type="primary" disabled={disableButton} onClick={onSubmitUpdate}>
                    {t("save_profile")}
                </Button>
            </section>
        </div>
    );
};

export default AdminProfile;
