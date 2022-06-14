import { PageHeader } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./StorageDetails.css";
import { fetchStorage } from "../../redux/storagesReducer";

const StorageDetails = React.memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentStorage = useSelector(
        (state) => state.storagesReducer.currentStorage
    );
    // const deleteCameraStatus = useSelector(state => state.camerasReducer.deleteCameraStatus);

    useEffect(() => {
        dispatch(fetchStorage(id));
    }, []);

    // useEffect(() => {
    //     if(deleteCameraStatus === 'fulfilled') {window.history.back()}
    // }, [deleteCameraStatus]);

    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={currentStorage.name}
            />
            asdasdadsasd
        </div>
    );
});

export default StorageDetails;
