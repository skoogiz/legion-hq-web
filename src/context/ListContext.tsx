import * as React from "react";
import Axios from "axios";
import DataContext from "@legion-hq/context/DataContext";
import {ErrorFallback, LoadingWidget} from "@legion-hq/components";
import factions from "@legion-hq/constants/factions";
import urls from "@legion-hq/constants/urls";
import {
  rehashList,
  mergeLists,
  convertHashToList,
  changeListTitle,
  setListMode,
  addUnit,
  addCommand,
  addContingency,
  removeCommand,
  removeContingency,
  addCounterpart,
  removeCounterpart,
  addBattle,
  removeBattle,
  incrementUnit,
  decrementUnit,
  equipUpgrade,
  unequipUpgrade,
  getEligibleCommandsToAdd,
  getEligibleContingenciesToAdd,
  getEligibleUnitsToAdd,
  getEquippableUpgrades,
  getEquippableLoadoutUpgrades,
  getEligibleBattlesToAdd,
  validateList,
  getRankLimits,
  EMPTY_VALIDATION,
} from "@legion-hq/constants/listOperations";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useSettings} from "@legion-hq/hooks/app/useSettings";
import {
  EquipedUpgrades,
  FactionType,
  LegionMode,
  ListTemplate,
  UnitRestrictions,
  UpgradeType,
} from "@legion-hq/types";
import {
  DISPLAY,
  UNIT_UPGRADE,
  ListAction,
  ListActionType,
  listReducer,
  getActions,
  ListActions,
} from "@legion-hq/state/list";
import {ListUtils} from "@legion-hq/utility/list";
import {createListTemplate} from "@legion-hq/utility/list/listFactories";
import {legionModes} from "@legion-hq/constants";
import {noop} from "lodash";
import {List} from "@legion-hq/types/list.class";

type ListContextValue = {
  currentList: ListTemplate;
  stackSize: number;
  isKillPointMode: boolean;
  currentKillPoints: number;
  isApplyToAll: boolean;
  isModalOpen: boolean;
  cardPaneFilter: ListAction;
  leftPaneWidth: number;
  rightPaneWidth: number;
  validationIssues: {
    level: number;
    text: string;
  }[];
  rankLimits: UnitRestrictions;
  modalContent?: string;
  // Unit functions
  getEligibleUnitsToAdd: typeof getEligibleUnitsToAdd;
  getEquippableUpgrades: typeof getEquippableUpgrades;
  getEquippableLoadoutUpgrades: typeof getEquippableLoadoutUpgrades;
  handleAddUnit: (unitId: string) => void;
  handleAddCounterpart: (unitIndex: number, counterpartId: string) => void;
  handleRemoveCounterpart: (unitIndex: number) => void;
  handleEquipUpgrade: (
    action: ListActionType, // Action Type
    unitIndex: number,
    upgradeIndex: number,
    upgradeId: string,
    isApplyToAll?: boolean,
  ) => void;
  handleUnequipUpgrade: (
    action: ListActionType,
    unitIndex: number,
    upgradeIndex: number,
  ) => void;
  handleIncrementUnit: (index: number) => void;
  handleDecrementUnit: (index: number) => void;
  handleSetBattleForce: (battleForce: string) => void;
  // Battle functions
  getEligibleBattlesToAdd: typeof getEligibleBattlesToAdd;
  handleAddBattle: (type: string, battleId: string) => void;
  handleRemoveBattle: (type: string, battleId: number) => void;
  // Command functions
  getEligibleCommandsToAdd: typeof getEligibleCommandsToAdd;
  handleAddCommand: (commandId: string) => void;
  handleRemoveCommand: (index: number) => void;
  getEligibleContingenciesToAdd: typeof getEligibleContingenciesToAdd;
  handleAddContingency: (commandId: string) => void;
  handleRemoveContingency: (index: number) => void;
  // List functions
  reorderUnits: (startIndex: number, endIndex: number) => void;
  handleClearList: () => void;
  handleToggleIsApplyToAll: () => void;
  handleChangeTitle: (title: string) => void;
  handleChangeMode: (mode: LegionMode) => void;
  handleIncrementStackSize: () => void;
  handleDecrementStackSize: () => void;
  handleListSave: (list: ListTemplate) => void;
  handleListFork: (list: ListTemplate) => void;
  handleMergeList: (list: ListTemplate) => void;
  handleToggleIsKillPointMode: () => void;
  handleAddKillPoints: (points: number) => void;
  handleToggleUsingOldPoints: () => void;
  // Modal functions
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleCardZoom: (cardId: string) => void;
  // View functions
  setCardPaneFilter: (list: ListAction) => void;
  setLeftPaneWidth: (width: number) => void;
  setRightPaneWidth: (width: number) => void;
  // Message functions
  listSaveMessage?: string;
  listActions: Omit<ListActions, "updateList">;
  toolbar: {
    isSticky: boolean;
    setIsSticky: (isSticky: boolean) => void;
  };
};

const DEFAULT_VALUE: ListContextValue = {
  currentList: createListTemplate(),
  stackSize: 1,
  isKillPointMode: false,
  currentKillPoints: 0,
  isApplyToAll: false,
  isModalOpen: false,
  cardPaneFilter: {
    action: DISPLAY,
  },
  leftPaneWidth: 6,
  rightPaneWidth: 6,
  validationIssues: [],
  rankLimits: {
    commander: [0, 0],
    operative: [0, 0],
    corps: [0, 0],
    special: [0, 0],
    support: [0, 0],
    heavy: [0, 0],
  },
  // Unit functions
  getEligibleUnitsToAdd: () => [],
  getEquippableUpgrades: () => ({validIds: [], invalidIds: []}),
  getEquippableLoadoutUpgrades: () => ({validIds: [], invalidIds: []}),
  handleAddUnit: noop,
  handleAddCounterpart: noop,
  handleRemoveCounterpart: noop,
  handleEquipUpgrade: noop,
  handleUnequipUpgrade: noop,
  handleIncrementUnit: noop,
  handleDecrementUnit: noop,
  handleSetBattleForce: noop,
  // Battle functions
  getEligibleBattlesToAdd: () => EMPTY_VALIDATION,
  handleAddBattle: noop,
  handleRemoveBattle: noop,
  // Command functions
  getEligibleCommandsToAdd: () => EMPTY_VALIDATION,
  handleAddCommand: noop,
  handleRemoveCommand: noop,
  getEligibleContingenciesToAdd: () => EMPTY_VALIDATION,
  handleAddContingency: noop,
  handleRemoveContingency: noop,
  // List functions
  reorderUnits: noop,
  handleClearList: noop,
  handleToggleIsApplyToAll: noop,
  handleChangeTitle: noop,
  handleChangeMode: noop,
  handleIncrementStackSize: noop,
  handleDecrementStackSize: noop,
  handleListSave: noop,
  handleListFork: noop,
  handleMergeList: noop,
  handleToggleIsKillPointMode: noop,
  handleAddKillPoints: noop,
  handleToggleUsingOldPoints: noop,
  // Modal functions
  handleOpenModal: noop,
  handleCloseModal: noop,
  handleCardZoom: noop,
  // View functions
  setCardPaneFilter: noop,
  setLeftPaneWidth: noop,
  setRightPaneWidth: noop,
  listActions: {
    addCounterpart: noop,
    removeCounterpart: noop,
  },
  toolbar: {
    isSticky: false,
    setIsSticky: noop,
  },
};

const ListContext = React.createContext(DEFAULT_VALUE);
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;

function isValidListId(listId: string) {
  return Number.parseInt(listId) > 999 && Number.parseInt(listId) < 999999;
}

type Props = {
  isSmallScreen: boolean;
  children: React.ReactNode;
  slug?: string;
  listHash?: string;
  storedLists: Record<string, ListTemplate>;
  updateStoredList: (list: ListTemplate) => void;
};

const initList = ({
  storedLists,
  slug,
}: {
  storedLists: Record<string, ListTemplate>;
  slug: string;
}): ListTemplate => {
  if (slug) {
    return storedLists[slug] ?? createListTemplate({faction: slug as FactionType});
  }
  return createListTemplate();
};

function ListProvider({
  isSmallScreen,
  children,
  slug = "",
  listHash,
  storedLists,
  updateStoredList,
}: Props) {
  const [state, dispatch] = React.useReducer(listReducer, {
    currentList: initList({slug, storedLists}),
  });

  const {updateList, ...listActions} = getActions(dispatch);

  const {currentList} = state;

  const {cards, costSupplier} = useCards();

  const {userId, goToPage} = React.useContext(DataContext);
  const {cascadeUpgradeSelection} = useSettings();
  const [stackSize, setStackSize] = React.useState(1);
  const [isApplyToAll, setIsApplyToAll] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState<string | Error | undefined>();
  const [message, setMessage] = React.useState<string>("");
  const [listSaveMessage, setListSaveMessage] = React.useState<string | undefined>();
  // const [currentList, updateList] = React.useState<ListTemplate>(
  //   initList({slug, storedLists}),
  // );
  const [leftPaneWidth, setLeftPaneWidth] = React.useState(0);
  const [rightPaneWidth, setRightPaneWidth] = React.useState(0);
  const [modalContent, setModalContent] = React.useState<string | undefined>();
  const [cardPaneFilter, setCardPaneFilter] = React.useState<ListAction>({
    action: DISPLAY,
  });
  const [isKillPointMode, setIsKillPointMode] = React.useState(false);
  const [currentKillPoints, setCurrentKillPoints] = React.useState(0);
  const [validationIssues, setValidationIssues] = React.useState<
    {
      level: number;
      text: string;
    }[]
  >([]);
  const [rankLimits, setRankLimits] = React.useState<UnitRestrictions>();

  const [isToolbarSticky, setIsToolbarSticky] = React.useState(false);

  React.useEffect(() => {
    // route '/list/rebels' fetches the rebel list from storage
    if (slug in factions) {
      if (listHash) {
        const convertedList = convertHashToList(slug as FactionType, listHash);
        if (convertedList) updateThenValidateList({...convertedList});
        else updateThenValidateList(JSON.parse(JSON.stringify(storedLists[slug])));
      } else updateThenValidateList(JSON.parse(JSON.stringify(storedLists[slug])));
    }
    // route '/list/1234' fetches list 1234 from database
    else if (slug !== "" && isValidListId(slug)) {
      setStatus("loading");
      httpClient
        .get(`${urls.api}/lists/${slug}`)
        .then((response) => {
          if (response.data.length > 0) {
            const loadedList = response.data[0] as ListTemplate;
            const oldCounterparts = ["lw", "ji", "jj"];
            const oldUnitCount = loadedList.units.length;
            loadedList.units = loadedList.units.filter((unit) => {
              return !oldCounterparts.includes(unit.unitId);
            });
            const newUnitCount = loadedList.units.length;
            if (oldUnitCount !== newUnitCount) {
              loadedList.uniques = loadedList.uniques.filter((id) => {
                return !oldCounterparts.includes(id);
              });
            }
            updateThenValidateList(rehashList(loadedList));
          } else setError(`List ${slug} not found.`);
          setStatus("idle");
        })
        .catch((err) => {
          setMessage(`Failed to fetch list (id=${slug})`);
          setError(err);
          setStatus("idle");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  React.useEffect(() => {
    // Save list before unmount
    return () => {
      if (state.currentList) updateStoredList(state.currentList);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentList]);

  React.useEffect(() => {
    if (isSmallScreen) {
      setLeftPaneWidth(12);
      setRightPaneWidth(0);
    } else {
      setLeftPaneWidth(6);
      setRightPaneWidth(6);
    }
  }, [isSmallScreen]);

  React.useEffect(() => {
    if (isSmallScreen) {
      if (cardPaneFilter.action === DISPLAY) {
        setLeftPaneWidth(12);
        setRightPaneWidth(0);
      } else {
        setLeftPaneWidth(0);
        setRightPaneWidth(12);
      }
    }
    setStackSize(1);
  }, [isSmallScreen, cardPaneFilter]);

  const updateThenValidateList = (list: ListTemplate) => {
    const rankLimits = getRankLimits(list);
    updateList(list);
    doUnitValidation(list, rankLimits);
    setRankLimits(rankLimits);
  };

  const reorderUnits = (startIndex: number, endIndex: number) => {
    currentList.units = ListUtils.reorder(currentList.units, startIndex, endIndex);
    currentList.unitObjectStrings = ListUtils.reorder(
      currentList.unitObjectStrings,
      startIndex,
      endIndex,
    );
    updateList({...currentList});
  };

  const handleToggleUsingOldPoints = () => {
    const newList = List.of(currentList);
    newList.toggleUseOriginalCosts(costSupplier);
    updateList({...newList.listTemplate});
  };

  const handleIncrementStackSize = () => {
    if (stackSize < 12) {
      setStackSize(stackSize + 1);
    }
  };

  const handleDecrementStackSize = () => {
    if (stackSize > 1) {
      setStackSize(stackSize - 1);
    }
  };

  const handleToggleIsApplyToAll = () => setIsApplyToAll(!isApplyToAll);

  const handleClearList = () => {
    setCardPaneFilter({action: DISPLAY});
    const newList = JSON.parse(
      JSON.stringify(
        createListTemplate(
          currentList.faction === "fringe"
            ? {
                faction: currentList.faction,
                battleForce: "Shadow Collective",
              }
            : {faction: currentList.faction},
        ),
      ),
    );
    updateThenValidateList(newList);
  };

  const handleChangeTitle = (title: string) =>
    updateList({...changeListTitle(state.currentList, title)});

  const handleChangeMode = (mode: LegionMode) => {
    updateThenValidateList({...setListMode(state.currentList, mode)});
  };

  const handleEquipUpgrade = (
    action: ListActionType, // Action Type
    unitIndex: number,
    upgradeIndex: number,
    upgradeId: string,
    applyToAll = false,
  ) => {
    const unit = state.currentList.units[unitIndex];
    let applyFilter;
    let nextAvailIndex: number | undefined;
    let nextAvailType: string | null | undefined;
    if (applyToAll || unit.count === 1) {
      let i = (upgradeIndex + 1) % unit.upgradesEquipped.length;
      let numUpgradesEquipped = 0;

      while (
        !nextAvailIndex &&
        !nextAvailType &&
        numUpgradesEquipped < unit.upgradesEquipped.length
      ) {
        const id = unit.upgradesEquipped[i];
        const unitCard = cards[unit.unitId];
        if (id) {
          numUpgradesEquipped++;
          continue;
        }
        nextAvailIndex = i;
        nextAvailType = unitCard.upgradeBar[i]
          ? unitCard.upgradeBar[i]
          : unit.additionalUpgradeSlots[i - (unitCard.upgradeBar.length + 1)];
        i = (i + 1) % unit.upgradesEquipped.length;
      }
      const letUpgradesCascade =
        (cascadeUpgradeSelection ?? "yes") === "yes" ? true : false;

      if (letUpgradesCascade && nextAvailIndex !== undefined && nextAvailType) {
        applyFilter = (
          newUpgradesEquipped: EquipedUpgrades,
          newAdditionalUpgradeSlots: Array<UpgradeType>,
        ) =>
          setCardPaneFilter({
            action: UNIT_UPGRADE,
            unitIndex,
            upgradeIndex: nextAvailIndex as number,
            upgradeType: nextAvailType as UpgradeType,
            hasUniques: unit.hasUniques,
            unitId: unit.unitId,
            upgradesEquipped: newUpgradesEquipped,
            additionalUpgradeSlots: newAdditionalUpgradeSlots,
          });
      }
    } // else applyFilter = () => setCardPaneFilter({ action: 'DISPLAY' })

    const newList = equipUpgrade(
      state.currentList,
      action,
      unitIndex,
      upgradeIndex,
      upgradeId,
      applyToAll,
    );
    if (applyFilter && newList.units[unitIndex]) {
      const newUnit = newList.units[unitIndex];
      applyFilter(newUnit.upgradesEquipped, newUnit.additionalUpgradeSlots);
    } else setCardPaneFilter({action: DISPLAY});
    updateThenValidateList({...newList});
  };

  const handleUnequipUpgrade = (
    action: ListActionType,
    unitIndex: number,
    upgradeIndex: number,
  ) => {
    setCardPaneFilter({action: DISPLAY});
    const newList = unequipUpgrade(currentList, action, unitIndex, upgradeIndex);
    updateThenValidateList({...newList});
  };

  const handleAddUnit = (unitId: string) => {
    if (isSmallScreen) {
      setCardPaneFilter({action: DISPLAY});
    }
    setStackSize(1);
    const newList = addUnit(currentList, unitId, stackSize);
    updateThenValidateList({...newList});
  };

  const handleAddCommand = (commandId: string) => {
    const newList = addCommand(currentList, commandId);
    updateList({...newList});
  };

  const handleAddContingency = (commandId: string) => {
    const newList = addContingency(currentList, commandId);
    updateList({...newList});
  };

  const handleRemoveCommand = (commandIndex: number) => {
    const newList = removeCommand(currentList, commandIndex);
    updateList({...newList});
  };

  const handleRemoveContingency = (contingencyIndex: number) => {
    const newList = removeContingency(currentList, contingencyIndex);
    updateList({...newList});
  };

  const handleAddBattle = (type: string, battleId: string) => {
    const newList = addBattle(currentList, type, battleId);
    updateList({...newList});
  };

  const handleRemoveBattle = (type: string, battleId: number) => {
    const newList = removeBattle(currentList, type, battleId);
    updateList({...newList});
  };

  const handleAddCounterpart = (unitIndex: number, counterpartId: string) => {
    setCardPaneFilter({action: DISPLAY});
    const newList = addCounterpart(currentList, unitIndex, counterpartId);
    updateThenValidateList({...newList});
  };

  const handleRemoveCounterpart = (unitIndex: number) => {
    setCardPaneFilter({action: DISPLAY});
    const newList = removeCounterpart(currentList, unitIndex);
    updateThenValidateList({...newList});
  };

  const handleIncrementUnit = (index: number) => {
    const newList = incrementUnit(currentList, index);
    updateThenValidateList({...newList});
  };
  const handleDecrementUnit = (index: number) => {
    if (cardPaneFilter.action.includes("UPGRADE")) {
      setCardPaneFilter({action: DISPLAY});
    }
    const newList = decrementUnit(currentList, index);
    updateThenValidateList({...newList});
  };

  const handleMergeList = (listToMerge: ListTemplate) => {
    const newList = mergeLists(currentList, listToMerge);
    updateThenValidateList({...newList});
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(undefined);
  };

  const handleCardZoom = (cardId: string) => {
    setModalContent(cardId);
    setIsModalOpen(true);
  };

  const handleListSave = (list: ListTemplate) => {
    if (!userId) return;
    const {listId, ...rest} = list;
    if (listId) {
      Axios.put(`${urls.api}/lists/${listId}`, currentList)
        .then((response) => {
          const newList = response.data;
          updateList(newList);
          setListSaveMessage("List Updated!");
        })
        .catch((e) => {
          setError(e);
          setMessage(`Failed to update list ${listId}`);
        });
    } else {
      Axios.post(`${urls.api}/lists`, {...rest, userId})
        .then((response) => {
          const {listId} = response.data;
          updateList(createListTemplate({...currentList, listId: `${listId}`}));
          setListSaveMessage("List Created!");
        })
        .catch((e) => {
          setError(e);
          setMessage(`Failed to create list for user ${userId}`);
        });
    }
  };

  const handleListFork = (list: ListTemplate) => {
    if (!userId) return;
    const {listId, ...rest} = list;
    if (!listId) return;
    const forkedList = {...rest, title: list.title + " fork"};
    Axios.post(`${urls.api}/lists`, {...forkedList, userId})
      .then((response) => {
        const newList = response.data;
        goToPage(`/list/${newList.listId}`);
      })
      .catch((e) => {
        setError(e);
        setMessage(`Failed to fork list ${listId} for user ${userId}`);
      });
  };

  const handleToggleIsKillPointMode = () => {
    if (isKillPointMode) setCurrentKillPoints(0);
    setIsKillPointMode(!isKillPointMode);
  };

  const handleAddKillPoints = (points: number) => {
    setCurrentKillPoints(currentKillPoints + points);
  };

  const handleSetBattleForce = (battleForce: string) => {
    updateThenValidateList({...state.currentList, battleForce});
  };

  // Maybe there should be a 'units only' flag, but lists will be something like 50-100 entities max anyhow...
  const doUnitValidation = (list: ListTemplate, rankLimits: UnitRestrictions) => {
    // console.log('performing list validation!');
    setValidationIssues(validateList(list, rankLimits));
  };

  const unitProps = {
    getEligibleUnitsToAdd,
    getEquippableUpgrades,
    getEquippableLoadoutUpgrades,
    handleAddUnit,
    handleAddCounterpart,
    handleRemoveCounterpart,
    handleEquipUpgrade,
    handleUnequipUpgrade,
    handleIncrementUnit,
    handleDecrementUnit,
    handleSetBattleForce,
  };
  const battleProps = {
    getEligibleBattlesToAdd,
    handleAddBattle,
    handleRemoveBattle,
  };
  const commandProps = {
    getEligibleCommandsToAdd,
    handleAddCommand,
    handleRemoveCommand,
    getEligibleContingenciesToAdd,
    handleAddContingency,
    handleRemoveContingency,
  };
  const listProps = {
    stackSize,
    reorderUnits,
    isKillPointMode,
    currentKillPoints,
    isApplyToAll,
    handleClearList,
    handleToggleIsApplyToAll,
    handleChangeTitle,
    handleChangeMode,
    handleIncrementStackSize,
    handleDecrementStackSize,
    handleListSave,
    handleListFork,
    handleMergeList,
    handleToggleIsKillPointMode,
    handleAddKillPoints,
    handleToggleUsingOldPoints,
  };
  const modalProps = {
    handleOpenModal,
    handleCloseModal,
    modalContent,
    isModalOpen,
    handleCardZoom,
  };
  const viewProps = {
    cardPaneFilter,
    setCardPaneFilter,
    leftPaneWidth,
    rightPaneWidth,
    setLeftPaneWidth,
    setRightPaneWidth,
  };
  const messageProps = {
    listSaveMessage,
  };

  const value = React.useMemo(
    () => ({
      currentList: state.currentList,
      rankLimits: rankLimits ?? legionModes[state.currentList.mode].unitCounts,
      validationIssues,
      toolbar: {
        isSticky: isToolbarSticky,
        setIsSticky: setIsToolbarSticky,
      },
    }),
    [state.currentList, rankLimits, validationIssues, isToolbarSticky],
  );

  if (error) return <ErrorFallback error={error} message={message} />;
  if (status === "loading") return <LoadingWidget />;
  if (status === "idle") {
    return (
      <ListContext.Provider
        value={{
          ...value,
          ...unitProps,
          ...commandProps,
          ...battleProps,
          ...listProps,
          ...modalProps,
          ...viewProps,
          ...messageProps,

          listActions,
        }}
      >
        {children}
      </ListContext.Provider>
    );
  }
}

export {ListContext, ListProvider};
