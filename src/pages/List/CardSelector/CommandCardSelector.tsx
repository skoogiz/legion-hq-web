import {LegionCard} from "@legion-hq/components";
import {SelectorHeader} from "./SelectorHeader";
import {SelectorContent} from "./SelectorContent";
import {COMMAND, CONTINGENCY} from "@legion-hq/state/list";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {useEligibleCardsHandler} from "@legion-hq/hooks/list/useEligibleCardsHandler";
import {RowContainer, Title} from "./CardSelectorComponents";

type Props = {
  action: typeof COMMAND | typeof CONTINGENCY;
  commanands?: string[];
  onAddCard: (commandId: string) => void;
  onRemoveCard: (index: number) => void;
  validationSupplier: () => {validIds: string[]; invalidIds: string[]};
};

export function CommandSelector({
  action,
  commanands = [],
  onAddCard,
  onRemoveCard,
  validationSupplier,
}: Props) {
  const {handleCardZoom} = useListBuilder();

  const {validIds, invalidIds} = validationSupplier();

  return (
    <>
      <SelectorHeader>
        {commanands?.length > 0 ? (
          <RowContainer>
            <Title title="Commands:" spacing />
            {commanands?.map((commandId, index) => (
              <LegionCard
                isBasic
                id={commandId}
                key={commandId}
                handleCardZoom={() => handleCardZoom(commandId)}
                handleDelete={() => onRemoveCard(index)}
              />
            ))}
          </RowContainer>
        ) : (
          <Title title={`Add ${action.toLowerCase()} cards`} />
        )}
      </SelectorHeader>
      <SelectorContent
        action={action}
        validIds={validIds}
        invalidIds={invalidIds}
        handleClick={(commandId: string) => onAddCard(commandId)}
      />
    </>
  );
}

export function CommandCardSelector({contingency = false}: {contingency?: boolean}) {
  const {
    handleAddContingency,
    handleRemoveContingency,
    handleAddCommand,
    handleRemoveCommand,
  } = useListBuilder();
  const {commandCards, contingencies} = useCurrentList();
  const {getEligibleContingencies, getEligibleCommands} = useEligibleCardsHandler();

  return contingency ? (
    <CommandSelector
      action={CONTINGENCY}
      commanands={contingencies}
      onAddCard={handleAddContingency}
      onRemoveCard={handleRemoveContingency}
      validationSupplier={getEligibleContingencies}
    />
  ) : (
    <CommandSelector
      action={COMMAND}
      commanands={commandCards}
      onAddCard={handleAddCommand}
      onRemoveCard={handleRemoveCommand}
      validationSupplier={getEligibleCommands}
    />
  );
}
