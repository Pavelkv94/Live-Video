import React from "react";


const CamerasProlongation = ({t}) => {
    return (
        <div className="ctrackers-prolongation">
            {t()}
            CamerasProlongation
        </div>
    );
};

export default React.memo(CamerasProlongation);
