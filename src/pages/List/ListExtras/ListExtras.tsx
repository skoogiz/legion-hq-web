import * as React from "react";
import {
  History as UsePrevIcon,
  Clear as ClearIcon,
  Save as SaveIcon,
  CallSplit as ForkIcon,
  Functions as CalculateIcon,
} from "@mui/icons-material";
import DataContext from "@legion-hq/context/DataContext";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {TemplateButton} from "./TemplateButton";
import {LinkButton} from "./LinkButton";
import {QRButton} from "./QRButton";
import {TTSTextExportButton} from "./TTSTextExportButton";
import {ImageExportButton} from "./ImageExportButton";
import {TextExportButton} from "./TextExportButton";
import PrintExportButton from "./PrintExportButton";
import {SimpleButton} from "./SimpleButton";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";

export function ListExtras() {
  const {userId} = React.useContext(DataContext);

  const {
    isKillPointMode,
    listSaveMessage,
    handleClearList,
    handleListSave,
    handleListFork,
    handleToggleIsKillPointMode,
    listActions: {handleToggleUsingOldPoints},
  } = useListBuilder();

  const currentList = useCurrentList();

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
      }}
    >
      <TemplateButton />
      <LinkButton currentList={currentList} />
      <QRButton currentList={currentList} />
      <ImageExportButton currentList={currentList} />
      <TextExportButton currentList={currentList} />
      <TTSTextExportButton currentList={currentList} />
      <PrintExportButton currentList={currentList} />
      <SimpleButton
        timeout={3000}
        timeoutMessage={listSaveMessage ? listSaveMessage : "Saving..."}
        isDisabled={!userId}
        icon={<SaveIcon />}
        label="Save List"
        handleClick={() => handleListSave(currentList)}
      />
      <SimpleButton
        isDisabled={!currentList.listId}
        icon={<ForkIcon />}
        label="Fork List"
        handleClick={() => handleListFork(currentList)}
      />
      <SimpleButton
        icon={<ClearIcon />}
        label="Clear List"
        handleClick={handleClearList}
      />
      <SimpleButton
        icon={<CalculateIcon />}
        label={isKillPointMode ? "Calculating Kill Points!" : "Calculate Kill Points"}
        handleClick={handleToggleIsKillPointMode}
      />
      <SimpleButton
        timeout={1000}
        timeoutMessage="Changing Points..."
        icon={<UsePrevIcon />}
        label={currentList.isUsingOldPoints ? "Using Old Points" : "Using New Points"}
        handleClick={handleToggleUsingOldPoints}
      />
    </div>
  );
}
