import {Fade} from "@mui/material";
import LoadingIcon from "@legion-hq/assets/LoadingIcon.png";

export function LoadingWidget() {
  return (
    <Fade in>
      <div
        style={{
          top: "44%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img alt="Loading..." className="pulse" src={LoadingIcon} />
      </div>
    </Fade>
  );
}
