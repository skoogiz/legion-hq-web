import {Paper, IconButton, styled} from "@mui/material";
import {Clear as ClearIcon} from "@mui/icons-material";
import {DISPLAY} from "@legion-hq/state/list";
import {useListBuilder} from "@legion-hq/hooks/list/useList";

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
  children: React.ReactNode;
};

export function SelectorHeader({children}: Props) {
  const {setCardPaneFilter} = useListBuilder();
  return (
    <Container>
      {children}
      <div style={{flexGrow: 1}} />
      <IconButton onClick={() => setCardPaneFilter({action: DISPLAY})}>
        <ClearIcon />
      </IconButton>
    </Container>
  );
}
