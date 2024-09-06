import * as React from "react";
import {Button, IconButton, styled, Typography} from "@mui/material";
import {
  PlusOne as PlusOneIcon,
  Add as PlusIcon,
  Remove as NegativeIcon,
  RemoveCircleOutline as MinusOneIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {Icon as IconifyIcon} from "@iconify/react";
import {noop} from "lodash";

const Container = styled("div")`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  min-width: 72px;
`;

type Props = {
  incrementUnit?: () => void;
  decrementUnit: () => void;
  isKillPointMode?: boolean;
  handleAddKillPoints?: () => void;
  handleRemoveKillPoints?: () => void;
};

export function UnitActions({
  incrementUnit,
  decrementUnit,
  isKillPointMode = false,
  handleAddKillPoints = noop,
  handleRemoveKillPoints = noop,
}: Props) {
  const [numKilled, setNumKilled] = React.useState(0);
  const fontSize = 26;
  if (isKillPointMode) {
    return (
      <Container>
        <Button
          size="small"
          onClick={() => {
            setNumKilled(numKilled - 1);
            handleRemoveKillPoints();
          }}
          style={{marginLeft: 2, marginRight: 1}}
        >
          <NegativeIcon style={{fontSize: 13}} />
          <IconifyIcon style={{fontSize: 21}} icon="fa-solid:skull-crossbones" />
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setNumKilled(numKilled + 1);
            handleAddKillPoints();
          }}
          style={{marginLeft: 1, marginRight: 2}}
        >
          <PlusIcon style={{fontSize: 13}} />
          <IconifyIcon style={{fontSize: 21}} icon="fa-solid:skull-crossbones" />
          <Typography variant="caption" style={{marginLeft: 2}}>
            {numKilled > 0 ? `(${numKilled})` : ""}
          </Typography>
        </Button>
      </Container>
    );
  } else {
    return (
      <Container>
        {incrementUnit ? (
          <React.Fragment>
            <IconButton
              size="small"
              onClick={decrementUnit}
              style={{marginLeft: 2, marginRight: 1}}
            >
              <MinusOneIcon style={{fontSize}} />
            </IconButton>
            <IconButton
              size="small"
              onClick={incrementUnit}
              style={{marginLeft: 1, marginRight: 2}}
            >
              <PlusOneIcon style={{fontSize}} />
            </IconButton>
          </React.Fragment>
        ) : (
          <IconButton size="small" onClick={decrementUnit}>
            <DeleteIcon style={{fontSize}} />
          </IconButton>
        )}
      </Container>
    );
  }
}
