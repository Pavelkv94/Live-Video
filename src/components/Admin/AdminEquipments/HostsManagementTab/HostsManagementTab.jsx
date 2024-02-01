import React, { useEffect } from "react";
import "./HostsManagementTab.scss";
import { useDispatch } from "react-redux";
import { fetchHosts } from "../../../../redux/trackersSystemReducer";

const HostsManagementTab = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHosts());
    }, [dispatch]);
    return <div>HostsManagementTab</div>;
};

export default React.memo(HostsManagementTab);
