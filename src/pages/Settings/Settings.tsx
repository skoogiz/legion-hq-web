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
} from "@mui/material";
import DataContext from "@legion-hq/context/DataContext";
import settings, {SettingOption} from "@legion-hq/constants/settings";

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

export function Settings() {
  const {userSettings, setUserSettingsValue} = React.useContext(DataContext);

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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}
