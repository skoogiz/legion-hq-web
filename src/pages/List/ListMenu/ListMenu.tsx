import * as React from "react";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import {
  MoreVert as MoreIcon,
  Link as LinkIcon,
  CropFree as QRCodeIcon,
  PlaylistRemove as ClearIcon,
  PlaylistAdd as AddTemplateIcon,
  Description as TextIcon,
  CallSplit as ForkIcon,
  Save as SaveIcon,
  Image as ImageIcon,
  Print as PrintIcon,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
} from "@mui/icons-material";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {LinkDialog} from "./LinkDialog";
import {QRCodeDialog} from "./QRCodeDialog";
import {ImageExportModal} from "./ImageExportModal";
import DataContext from "@legion-hq/context/DataContext";
import {TextExportModal} from "./TextExportDialog";
import {TTSTextExportDialog} from "./TTSTextExportDialog";

enum ModalType {
  LINK,
  QR_CODE,
  EXPORT_IMAGE,
  EXPORT_TEXT,
  EXPORT_TTS_JSON,
}

type State = {
  modals: Record<ModalType, boolean>;
};

const DEFAULT_STATE: State = {
  modals: {
    [ModalType.LINK]: false,
    [ModalType.QR_CODE]: false,
    [ModalType.EXPORT_IMAGE]: false,
    [ModalType.EXPORT_TEXT]: false,
    [ModalType.EXPORT_TTS_JSON]: false,
  },
};

enum ActionType {
  OPEN_MODAL = "@list-menu/OPEN_MODAL",
  CLOSE_MODAL = "@list-menu/CLOSE_MODAL",
}

type Action =
  | {
      type: ActionType.OPEN_MODAL;
      payload: ModalType;
    }
  | {
      type: ActionType.CLOSE_MODAL;
      payload: ModalType;
    };

const actions = (dispatch: React.Dispatch<Action>) => ({
  openModal: (type: ModalType) =>
    dispatch({
      type: ActionType.OPEN_MODAL,
      payload: type,
    }),
  closeModal: (type: ModalType) =>
    dispatch({
      type: ActionType.CLOSE_MODAL,
      payload: type,
    }),
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.OPEN_MODAL: {
      return {
        modals: {
          ...DEFAULT_STATE.modals,
          [action.payload]: true,
        },
      };
    }
    case ActionType.CLOSE_MODAL:
      return {
        modals: {
          ...state.modals,
          [action.payload]: false,
        },
      };
    default:
      return state;
  }
};

export function ListMenu() {
  const [state, dispatch] = React.useReducer(reducer, DEFAULT_STATE);
  const {openModal, closeModal} = actions(dispatch);
  const {
    currentList,
    isKillPointMode,
    handleListSave,
    handleListFork,
    handleClearList,
    handleToggleIsKillPointMode,
    handleToggleUsingOldPoints,
  } = useListBuilder();
  const {userId} = React.useContext(DataContext);
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>();
  const handleOpenMenu = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(undefined);

  return (
    <>
      <IconButton
        size="large"
        aria-label="display more actions"
        edge="end"
        color="primary"
        onClick={handleOpenMenu}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList dense>
          <MenuItem disabled>
            <ListItemIcon>
              <AddTemplateIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Template</ListItemText>
          </MenuItem>
          <MenuItem
            disabled={!userId}
            onClick={() => {
              handleListSave(currentList);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <SaveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Save List</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleListFork(currentList);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <ForkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Fork List</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClearList();
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <ClearIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Clear List</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              openModal(ModalType.LINK);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <LinkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Legion HQ Link</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              openModal(ModalType.QR_CODE);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <QRCodeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Show QR Code</ListItemText>
          </MenuItem>
          <MenuItem
            disabled={currentList.units.length === 0}
            onClick={() => {
              openModal(ModalType.EXPORT_IMAGE);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <ImageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Export Image</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              openModal(ModalType.EXPORT_TEXT);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <TextIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Export Text</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              openModal(ModalType.EXPORT_TTS_JSON);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <TextIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Export TTS JSON</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              openModal(ModalType.EXPORT_TTS_JSON);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <TextIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Export TTS JSON</ListItemText>
          </MenuItem>
          <MenuItem
            disabled
            onClick={() => {
              // openModal(ModalType.EXPORT_TTS_JSON);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <PrintIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Print List</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              handleToggleIsKillPointMode();
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              {isKillPointMode ? (
                <CheckBoxOutlined fontSize="small" />
              ) : (
                <CheckBoxOutlineBlank fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>Calculate Kill Points</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleToggleUsingOldPoints();
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              {currentList.isUsingOldPoints ? (
                <CheckBoxOutlineBlank fontSize="small" />
              ) : (
                <CheckBoxOutlined fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>Using New Points</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      {state.modals[ModalType.LINK] && (
        <LinkDialog
          currentList={currentList}
          onClose={() => closeModal(ModalType.LINK)}
        />
      )}
      {state.modals[ModalType.QR_CODE] && (
        <QRCodeDialog
          currentList={currentList}
          onClose={() => closeModal(ModalType.QR_CODE)}
        />
      )}
      {state.modals[ModalType.EXPORT_IMAGE] && (
        <ImageExportModal onClose={() => closeModal(ModalType.EXPORT_IMAGE)} />
      )}
      {state.modals[ModalType.EXPORT_TEXT] && (
        <TextExportModal
          currentList={currentList}
          onClose={() => closeModal(ModalType.EXPORT_TEXT)}
        />
      )}
      {state.modals[ModalType.EXPORT_TTS_JSON] && (
        <TTSTextExportDialog
          currentList={currentList}
          onClose={() => closeModal(ModalType.EXPORT_TTS_JSON)}
        />
      )}
    </>
  );
}
