const Notification = ({message, notificationType}) => {
    if (message == null || message === '') {
        return null;
    }

    const color = notificationType === "error" ? "red" : "green";

    const style = {color};

    return (
        <div className="notification" style={style}>{message}</div>
    );
}

export default Notification;
