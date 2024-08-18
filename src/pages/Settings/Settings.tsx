import * as React from "react";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Fade,
  Paper,
  SelectChangeEvent,
  FormLabel,
  SwitchProps,
  Switch,
  styled,
} from "@mui/material";
import {SettingOption, settings} from "@legion-hq/constants/settings";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useAppContext} from "@legion-hq/context/app/useAppContext";

function SettingDropdown({
  id,
  name,
  value,
  options,
  handleClick,
}: {
  id: string;
  name: string;
  value: string;
  options: SettingOption[];
  handleClick: (event: SelectChangeEvent) => void;
}) {
  return (
    <FormControl>
      <FormLabel id={`${id}-selector-label`}>{name}</FormLabel>
      {/*
      <RadioGroup
        row
        aria-labelledby={`${id}-selector-label`}
        name={`${id}-radio-buttons-group`}
        value={value}
        onChange={handleClick}
      >
        {options.map(({key, name}) => (
          <FormControlLabel value={key} control={<Radio />} label={name} />
        ))}
      </RadioGroup>
      */}
      <Select
        id={id}
        aria-labelledby={`${id}-selector-label`}
        value={value}
        onChange={handleClick}
        style={{minWidth: 200}}
        variant="filled"
      >
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const OptionSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export function Settings() {
  const {
    settings: userSettings,
    actions: {setSettingsValue: setUserSettingsValue},
  } = useAppContext();

  const {cards, cardIdsByType, cardIds} = useCards();

  console.log("CARD", {cards, cardIdsByType, cardIds});

  return (
    <Fade in={true}>
      <Container>
        <Grid container spacing={4} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Paper square={false} sx={{p: 2}}>
              <Typography variant="h5" sx={{mb: 2}}>
                Settings
              </Typography>
              <div style={{display: "flex", flexDirection: "column", gap: "1em"}}>
                {settings.list.map(({key, name, values}) => (
                  <SettingDropdown
                    key={key}
                    id={key}
                    name={name}
                    value={userSettings[key]}
                    options={values}
                    handleClick={(event) => {
                      setUserSettingsValue(key, event.target.value);
                    }}
                  />
                ))}
              </div>
              <OptionSwitch
                checked={userSettings["cascadeUpgradeSelection"] === "yes"}
                onChange={(event) => {
                  setUserSettingsValue(
                    "cascadeUpgradeSelection",
                    event.target.checked ? "yes" : "no",
                  );
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}
