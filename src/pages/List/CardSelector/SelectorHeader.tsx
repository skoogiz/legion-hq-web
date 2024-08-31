import {Paper, IconButton, styled} from "@mui/material";
import {Clear as ClearIcon} from "@mui/icons-material";
import {DISPLAY, ListAction} from "@legion-hq/state/list";

const Container = styled(Paper)`
  top: 0;
  z-index: 1;
  margin-bottom: 4;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  justify-content: space-between;
  position: -webkit-sticky;
  position: sticky;
`;

type Props = {
  headerContent: JSX.Element;
  cardPaneFilter: ListAction;
  setCardPaneFilter: (action: ListAction) => void;
};

export function SelectorHeader({
  headerContent,
  // cardPaneFilter,
  setCardPaneFilter,
}: Props) {
  return (
    <Container>
      {headerContent}
      <div style={{flexGrow: 1}} />
      <IconButton onClick={() => setCardPaneFilter({action: DISPLAY})}>
        <ClearIcon />
      </IconButton>
    </Container>
  );
}
