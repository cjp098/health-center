import { Drawer } from "antd";

export default function Slider({ children, isVisible, visible, title }) {
    return (
        <Drawer title={title} placement="right" onClose={isVisible} visible={visible}>
            {children}
        </Drawer>
    );
}
