import { IoMdAdd } from "react-icons/io";
import "react-tiny-fab/dist/styles.css";
import { Action, Fab } from "./patch.js";

const FloatingActionButton = ({ actions }) => {
  return (
    <Fab
      icon={<IoMdAdd />}
      alwaysShowTitle={true}
      mainButtonStyles={{ background: "#e95677" }}
    >
      {actions.map((v, i) => (
        <Action
          key={i}
          text={v.label}
          style={{ background: "#e95677" }}
          onClick={v.handleClick}
        >
          {v.icon}
        </Action>
      ))}
    </Fab>
  );
};

export default FloatingActionButton;
