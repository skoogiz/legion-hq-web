import {LegionCard} from "@legion-hq/components";
import {SelectorHeader} from "./SelectorHeader";
import {SelectorContent} from "./SelectorContent";
import {BATTLE} from "@legion-hq/state/list";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {useEligibleCardsHandler} from "@legion-hq/hooks/list/useEligibleCardsHandler";
import {BattleType} from "@legion-hq/types";
import {RowContainer} from "./CardSelectorComponents";

type Props = {
  type: BattleType;
};

export function BattleCardSelector({type}: Props) {
  const {handleAddBattle, handleRemoveBattle, handleCardZoom} = useListBuilder();
  const {getBattleCardsByType} = useCurrentList();
  const {getEligibleBattles} = useEligibleCardsHandler();

  const {validIds, invalidIds} = getEligibleBattles(type);

  return (
    <>
      <SelectorHeader>
        <RowContainer>
          {getBattleCardsByType(type).map((id, i) => {
            return (
              <LegionCard
                isBasic={true}
                id={id}
                key={id}
                handleCardZoom={() => handleCardZoom(id)}
                handleDelete={() => handleRemoveBattle(type, i)}
              />
            );
          })}
        </RowContainer>
      </SelectorHeader>
      <SelectorContent
        action={BATTLE}
        validIds={validIds}
        invalidIds={invalidIds}
        handleClick={(battleId: string) => handleAddBattle(type, battleId)}
      />
    </>
  );
}
