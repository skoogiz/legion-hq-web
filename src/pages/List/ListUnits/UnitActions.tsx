import * as React from "react";
import {Button, styled} from "@mui/material";
import {Delete as DeleteIcon, Remove, Add} from "@mui/icons-material";
import {Icon as IconifyIcon} from "@iconify/react";
import {noop} from "lodash";

const Container = styled("div")({
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
  padding: 0,
});

const UnitCount = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontWeight: 900,
  fontSize: "1.2em",
}));

const KillCount = styled(UnitCount)(({theme}) => ({
  columnGap: theme.spacing(1),
}));

type Props = {
  incrementUnit?: () => void;
  decrementUnit: () => void;
  isKillPointMode?: boolean;
  handleAddKillPoints?: () => void;
  handleRemoveKillPoints?: () => void;
  unitCount?: number;
};

export function UnitActions({
  incrementUnit,
  decrementUnit,
  isKillPointMode = false,
  handleAddKillPoints = noop,
  handleRemoveKillPoints = noop,
  unitCount,
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
          disableElevation
          sx={(theme) => ({margin: 0, paddingBlock: theme.spacing(0.5)})}
        >
          <Remove style={{fontSize}} />
        </Button>
        <KillCount>
          <IconifyIcon
            style={{fontSize: "1.0em", opacity: "0.4"}}
            icon="fa-solid:skull-crossbones"
          />
          <span>{numKilled}</span>
        </KillCount>
        <Button
          size="small"
          onClick={() => {
            setNumKilled(numKilled + 1);
            handleAddKillPoints();
          }}
          disableElevation
          sx={(theme) => ({margin: 0, paddingBlock: theme.spacing(0.5)})}
        >
          <Add style={{fontSize}} />
        </Button>
      </Container>
    );
  } else {
    return (
      <Container>
        {incrementUnit ? (
          <>
            <Button
              size="small"
              onClick={decrementUnit}
              disableElevation
              sx={(theme) => ({margin: 0, paddingBlock: theme.spacing(0.5)})}
            >
              <Remove style={{fontSize}} />
            </Button>
            <UnitCount>{unitCount}</UnitCount>
            <Button
              size="small"
              onClick={incrementUnit}
              disableElevation
              sx={(theme) => ({margin: 0, paddingBlock: theme.spacing(0.5)})}
            >
              <Add style={{fontSize}} />
            </Button>
          </>
        ) : (
          <Button
            size="small"
            onClick={decrementUnit}
            disableElevation
            sx={(theme) => ({margin: 0, paddingBlock: theme.spacing(0.5)})}
          >
            <DeleteIcon style={{fontSize}} />
          </Button>
        )}
      </Container>
    );
  }
}
