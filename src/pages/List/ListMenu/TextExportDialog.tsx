import * as React from "react";
import {
  useMediaQuery,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import {
  generateStandardText,
  generateMinimalText,
  generateTournamentText,
  generateHTMLText,
} from "@legion-hq/constants/listOperations";
import {DialogModal} from "../ListExtras/DialogModal";
import {ClipboardButton} from "../ListExtras/ClipboardButton";
import {ListTemplate} from "@legion-hq/types";

function generateListText(type: number, currentList: ListTemplate) {
  if (type === 0) return generateStandardText(currentList);
  else if (type === 1) return generateMinimalText(currentList);
  else if (type === 2) return generateTournamentText(currentList);
  else if (type === 3) return generateHTMLText(currentList);
  else return "";
}

/**
 * Dont understand the use of this
 *
 * @param param0
 * @returns
 */
function TabPanel({
  value,
  index,
  children,
}: {
  value: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div hidden={value !== `${index}`}>
      {value === `${index}` && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

type DialogProps = {
  tabValue: number;
  content: string;
  handleChangeTextType: (value: number) => void;
  handleChangeListText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function DialogContent({
  tabValue,
  content,
  handleChangeTextType,
  handleChangeListText,
}: DialogProps) {
  return (
    <div style={{display: "flex", flexFlow: "column nowrap", alignItems: "center"}}>
      <AppBar position="static" color="secondary">
        <Tabs
          variant="scrollable"
          indicatorColor="primary"
          value={tabValue}
          onChange={(event, value) => {
            event.preventDefault();
            handleChangeTextType(value);
          }}
        >
          <Tab label="Standard" />
          <Tab label="Minimal" />
          <Tab label="Tournament" />
          <Tab label="Tabletop.to (HTML)" />
        </Tabs>
      </AppBar>
      <TabPanel value="standard" index={0}>
        Standard
      </TabPanel>
      <TabPanel value="minimal" index={1}>
        Minimal
      </TabPanel>
      <TabPanel value="tournament" index={2}>
        Tournament
      </TabPanel>
      <TabPanel value="tournament" index={3}>
        Tabletop.to
      </TabPanel>
      <div style={{marginTop: 16}} />
      <TextField
        multiline
        size="small"
        variant="outlined"
        value={tabValue === 3 ? "Coming soon!" : content}
        onChange={handleChangeListText}
        style={{padding: 8, width: "100%"}}
      />
    </div>
  );

  /*
  {tabValue === 3 ?
    <HtmlListText list={currentList} /> :
    <TextField
      multiline
      size="small"
      variant="outlined"
      value={content}
      onChange={handleChangeListText}
      style={{ padding: 8, width: '100%' }}
    />
  }
  */
}

type Props = {
  currentList: ListTemplate;
  onClose: () => void;
};

export function TextExportModal({currentList, onClose}: Props) {
  const theme = useTheme();
  const [textType, setTextType] = React.useState(0);
  const [listText, setListText] = React.useState("");
  const handleChangeTextType = (value: number) => setTextType(value);
  const handleChangeListText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setListText(e.target.value);
  React.useEffect(() => {
    setListText(generateListText(textType, currentList));
  }, [currentList, textType]);
  const isFullscreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <DialogModal
      isFullWidth={true}
      isMobile={isFullscreen}
      isOpen
      actions={<ClipboardButton content={listText} />}
      content={
        <DialogContent
          tabValue={textType}
          content={listText}
          handleChangeTextType={handleChangeTextType}
          handleChangeListText={handleChangeListText}
        />
      }
      handleClose={() => onClose()}
    />
  );
}
