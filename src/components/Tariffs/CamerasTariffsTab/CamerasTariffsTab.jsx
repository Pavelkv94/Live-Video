import React from "react";
import "./CamerasTariffsTab.scss";

const CamerasTariffsTab = ({ t }) => {
   

   

    return (
        <div className="cameras-tariffs">
            <section className="head-section">
                <h2>{t("tariffs.camerasTariffs")}</h2>
            </section>

        </div>
    );
};

export default React.memo(CamerasTariffsTab);
