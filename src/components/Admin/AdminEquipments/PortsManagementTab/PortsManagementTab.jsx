import React, { useEffect } from "react";
import "./PortsManagementTab.scss";
import { useDispatch } from "react-redux";
import { fetchPorts } from "../../../../redux/trackersSystemReducer";

const PortsManagementTab = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPorts());
    }, [dispatch]);
    return <div>PortsManagementTab</div>;
};

export default React.memo(PortsManagementTab);
