import _ from "lodash";

const Message = ({message, messageType}) => {
    if (_.isEmpty(message || _.isEmpty(messageType))) {
        return null;
    }

    const color = messageType === "error" ? "red" : "green";

    const style = {
        borderStyle: "solid",
        padding: 10,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: color,
        backgroundColor: "#eeeeee",
    };

    return (
        <div style={style}>{message}</div>
    );
}

export default Message;
