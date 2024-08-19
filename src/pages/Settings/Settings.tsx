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
  Box,
  Divider,
} from "@mui/material";
import {
  AppSettingType,
  SettingOption,
  settingsConfig,
} from "@legion-hq/constants/settings";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useSettings} from "@legion-hq/hooks/app/useSettings";

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
  options: Record<string, string>;
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
        {Object.keys(options).map((key) => (
          <MenuItem key={key} value={key}>
            {options[key]}
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
  const userSettings = useSettings();

  const {cards, cardIdsByType, cardIds} = useCards();

  console.log("CARD", {cards, cardIdsByType, cardIds});

  return (
    <Fade in={true}>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={4}
          direction="column"
          alignItems="center"
          sx={{width: "100%"}}
        >
          <Grid item xs={12} alignSelf="stretch">
            <Typography variant="h3" sx={{mb: 2}}>
              Settings
            </Typography>
            <Paper square={false} sx={{p: 2}}>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Typography variant="h5">Theme</Typography>

                  <Divider />
                </Box>

                {settingsConfig.fields.map(({name, displayName, options}) => {
                  switch (name) {
                    case "cascadeUpgradeSelection":
                      return (
                        <Box>
                          <Typography variant="h5">Options</Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 0",
                            }}
                          >
                            <Typography variant="body1">{displayName}</Typography>
                            <OptionSwitch
                              checked={userSettings["cascadeUpgradeSelection"] === "yes"}
                              onChange={(event) => {
                                userSettings.setSettingsValue(
                                  "cascadeUpgradeSelection",
                                  event.target.checked ? "yes" : "no",
                                );
                              }}
                            />
                          </div>
                          <Divider />
                        </Box>
                      );

                    default:
                      return (
                        <SettingDropdown
                          key={name}
                          id={name}
                          name={displayName}
                          value={userSettings[name]}
                          options={options}
                          handleClick={(event) => {
                            userSettings.setSettingsValue(name, event.target.value);
                          }}
                        />
                      );
                  }
                })}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}
