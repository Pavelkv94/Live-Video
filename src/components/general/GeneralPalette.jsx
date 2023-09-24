import { Popover } from "antd";
import React, { useState } from "react";
import "./GeneralPalette.scss";
import { paletteColors } from "./initialData";

const GeneralPalette = ({ value, setValue }) => {
    const [visible, setVisible] = useState(false);

    const content = (
        <div className="colors">
            {paletteColors.map((el, i) => (
                <div
                    key={i}
                    className="color-item"
                    style={{ background: el }}
                    onClick={() => {
                        setValue(el);
                        setVisible(false);
                    }}
                ></div>
            ))}
        </div>
    );

    return (
        <Popover placement="bottomLeft" content={content} trigger="click" open={visible} onOpenChange={setVisible}>
            <div className="palette-button" onClick={() => setVisible(true)}>
                <div className="color-picker" style={{ background: value }}></div>
            </div>
        </Popover>
    );
};

export default React.memo(GeneralPalette);
