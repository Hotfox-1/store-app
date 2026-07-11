import { Toast } from "react-bootstrap";

interface NotificationsProps {
    type: string;
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function Notification({ type, show, onClose, children }: NotificationsProps) {
    return <>
        <Toast className="notification" bg={type.toLowerCase()} 
            onClose={() => onClose()} 
            delay={3000} 
            show={show}
            autohide data-bs-theme="dark" animation={true}>
                <Toast.Header>
                    <strong className="me-auto">{type}</strong>
                </Toast.Header>
                <Toast.Body className="text-dark">
                    {children}
                </Toast.Body>
        </Toast>   
    </>

}

export default Notification;