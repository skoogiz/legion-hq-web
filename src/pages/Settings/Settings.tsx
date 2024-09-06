import {
  Container,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Fade,
  Paper,
  FormLabel,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {useSettings} from "@legion-hq/hooks/app/useSettings";
import {OptionSwitch} from "@legion-hq/components";
import {SettingField, SettingFieldGroup} from "@legion-hq/constants/settings";

function SettingInput({
  field,
  value,
  handleClick,
}: {
  field: SettingField;
  value: string;
  handleClick: (value: string) => void;
}) {
  const {name, label, options, inputType} = field;

  const id = name;

  const labelId = `${name}-selector-label`;

  switch (inputType) {
    case "toggle":
      return (
        <FormControl
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexDirection: "row",
          }}
        >
          <FormLabel id={labelId}>{label}:</FormLabel>
          <OptionSwitch
            aria-labelledby={labelId}
            checked={value === "yes" || value === "true"}
            onChange={(event) => {
              handleClick(event.target.checked ? "yes" : "no");
            }}
          />
        </FormControl>
      );
    case "radio":
      return (
        <FormControl
          fullWidth
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexDirection: "row",
          }}
        >
          <FormLabel id={labelId}>{label}:</FormLabel>
          <RadioGroup
            row
            aria-labelledby={labelId}
            name={`${id}-radio-buttons-group`}
            value={value}
            onChange={(event) => {
              handleClick(event.target.value);
            }}
          >
            {Object.keys(options).map((key) => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio />}
                label={`${options[key]}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    case "select":
    default:
      return (
        <FormControl
          fullWidth
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexDirection: "row",
          }}
        >
          <FormLabel id={labelId}>{label}:</FormLabel>

          <Select
            id={id}
            aria-labelledby={labelId}
            value={value}
            onChange={(event) => {
              handleClick(event.target.value);
            }}
            style={{minWidth: 200}}
            variant="filled"
            size="small"
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
}

const getGroupLabel = (group: SettingFieldGroup) => {
  switch (group) {
    case "display":
      return "Display Preferences";
    case "filter":
      return "Filter Options";
    case "general":
    default:
      return "General";
  }
};

export function Settings() {
  const userSettings = useSettings();
  return (
    <Fade in={true}>
      <Container maxWidth="sm">
        <Grid container direction="column" alignItems="center" rowGap={3}>
          <Grid item xs={12} alignSelf="stretch">
            <Typography variant="h3" mt={3} mb={2}>
              Settings
            </Typography>
          </Grid>
          {userSettings.config.fieldGroupNames.map((groupName) => {
            const fields = userSettings.config.fieldsByGroup(groupName);
            return (
              <Grid key={`group:${groupName}`} item xs={12} alignSelf="stretch">
                <Paper key={groupName} square={false} sx={{p: 2}}>
                  <Box display="flex" flexDirection="column" gap={3}>
                    <Typography
                      variant="h5"
                      sx={(theme) => ({
                        color: theme.palette.text.secondary,
                      })}
                    >
                      {getGroupLabel(groupName)}
                    </Typography>
                    {fields.map((field) =>
                      (field.visible ?? true) ? (
                        <Box key={`${groupName}:${field.name}`} width="100%">
                          <SettingInput
                            field={field}
                            value={userSettings[field.name]}
                            handleClick={(value: string) => {
                              userSettings.setSettingsValue(field.name, value);
                            }}
                          />
                        </Box>
                      ) : null,
                    )}
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Fade>
  );
}
