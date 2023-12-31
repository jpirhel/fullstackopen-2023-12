import {forwardRef, useState, useImperativeHandle} from "react";

// Togglable component copied from https://fullstackopen.com/en/part5/props_children_and_proptypes
// and modified to support cancelLabel

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = {display: visible ? 'none' : ''};
    const showWhenVisible = {display: visible ? '' : 'none'};

    const toggleVisibility = () => {
        setVisible(!visible)
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        };
    });

    const cancelButtonLabel = props.cancelLabel || "cancel";

    const button1 = <button onClick={toggleVisibility}>{props.buttonLabel}</button>;
    const button2 = <button onClick={toggleVisibility}>{cancelButtonLabel}</button>;

    const spanStyle = {
        marginLeft: 10,
    };

    if (props.useSpan) {
        return (
            <span style={spanStyle}>
                <span style={hideWhenVisible}>
                    {button1}
                </span>
                <span style={showWhenVisible}>
                    {button2}
                    {props.children}

                </span>
            </span>
        )
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                {button1}
            </div>
            <div style={showWhenVisible}>
                {props.children}
                {button2}
            </div>
        </div>
    );
});

export default Togglable;
