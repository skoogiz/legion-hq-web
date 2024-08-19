import * as React from "react";
import Axios from "axios";
import DataContext from "@legion-hq/context/DataContext";
import ErrorFallback from "@legion-hq/common/ErrorFallback";
import LoadingWidget from "@legion-hq/common/LoadingWidget";
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
  toggleUsingOldPoints,
  validateList,
  getRankLimits,
} from "@legion-hq/constants/listOperations";
import {createListTemplate} from "@legion-hq/constants/listTemplate";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useSettings} from "@legion-hq/hooks/app/useSettings";

const ListContext = React.createContext();
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;

function isValidListId(listId) {
  return Number.parseInt(listId) > 999 && Number.parseInt(listId) < 999999;
}

export function ListProvider({
  isSmallScreen,
  children,
  slug,
  listHash,
  storedLists,
  updateStoredList,
}) {
  const {cards} = useCards();

  const {userId, goToPage} = React.useContext(DataContext);
  const {cascadeUpgradeSelection} = useSettings();
  const [stackSize, setStackSize] = React.useState(1);
  const [isApplyToAll, setIsApplyToAll] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();
  const [listSaveMessage, setListSaveMessage] = React.useState();
  const [currentList, setCurrentList] = React.useState();
  const [leftPaneWidth, setLeftPaneWidth] = React.useState(0);
  const [rightPaneWidth, setRightPaneWidth] = React.useState(0);
  const [modalContent, setModalContent] = React.useState();
  const [cardPaneFilter, setCardPaneFilter] = React.useState({action: "DISPLAY"});
  const [isKillPointMode, setIsKillPointMode] = React.useState(false);
  const [currentKillPoints, setCurrentKillPoints] = React.useState(0);
  const [validationIssues, setValidationIssues] = React.useState([]);
  const [rankLimits, setRankLimits] = React.useState();

  React.useEffect(() => {
    // route '/list/rebels' fetches the rebel list from storage
    if (slug in factions) {
      if (listHash) {
        const convertedList = convertHashToList(slug, listHash);
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
            let loadedList = response.data[0];
            let oldCounterparts = ["lw", "ji", "jj"];
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
      if (currentList) updateStoredList(currentList);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentList]);
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
      if (cardPaneFilter.action === "DISPLAY") {
        setLeftPaneWidth(12);
        setRightPaneWidth(0);
      } else {
        setLeftPaneWidth(0);
        setRightPaneWidth(12);
      }
    }
    setStackSize(1);
  }, [isSmallScreen, cardPaneFilter]);

  const updateThenValidateList = (list) => {
    const rankLimits = getRankLimits(list);
    setCurrentList(list);
    doUnitValidation(list, rankLimits);
    setRankLimits(rankLimits);
  };

  const reorderUnits = (startIndex, endIndex) => {
    function reorder(arr) {
      const result = Array.from(arr);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    }
    currentList.units = reorder(currentList.units, startIndex, endIndex);
    currentList.unitObjectStrings = reorder(
      currentList.unitObjectStrings,
      startIndex,
      endIndex,
    );
    setCurrentList({...currentList});
  };
  const handleToggleUsingOldPoints = () => {
    const newList = toggleUsingOldPoints(currentList);
    setCurrentList({...newList});
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
    setCardPaneFilter({action: "DISPLAY"});
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
  const handleChangeTitle = (title) =>
    setCurrentList({...changeListTitle(currentList, title)});
  const handleChangeMode = (mode) => {
    updateThenValidateList({...setListMode(currentList, mode)});
  };
  const handleEquipUpgrade = (
    action,
    unitIndex,
    upgradeIndex,
    upgradeId,
    isApplyToAll,
  ) => {
    const unit = currentList.units[unitIndex];
    let applyFilter;
    let nextAvailIndex;
    let nextAvailType;
    if (isApplyToAll || unit.count === 1) {
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
        applyFilter = (newUpgradesEquipped, newAdditionalUpgradeSlots) =>
          setCardPaneFilter({
            action: "UNIT_UPGRADE",
            unitIndex,
            upgradeIndex: nextAvailIndex,
            upgradeType: nextAvailType,
            hasUniques: unit.hasUniques,
            unitId: unit.unitId,
            upgradesEquipped: newUpgradesEquipped,
            additionalUpgradeSlots: newAdditionalUpgradeSlots,
          });
      }
    } // else applyFilter = () => setCardPaneFilter({ action: 'DISPLAY' })

    const newList = equipUpgrade(
      currentList,
      action,
      unitIndex,
      upgradeIndex,
      upgradeId,
      isApplyToAll,
    );
    if (applyFilter && newList.units[unitIndex]) {
      const newUnit = newList.units[unitIndex];
      applyFilter(newUnit.upgradesEquipped, newUnit.additionalUpgradeSlots);
    } else setCardPaneFilter({action: "DISPLAY"});
    updateThenValidateList({...newList});
  };

  const handleUnequipUpgrade = (action, unitIndex, upgradeIndex) => {
    setCardPaneFilter({action: "DISPLAY"});
    const newList = unequipUpgrade(currentList, action, unitIndex, upgradeIndex);
    updateThenValidateList({...newList});
  };
  const handleAddUnit = (unitId) => {
    if (isSmallScreen) {
      setCardPaneFilter({action: "DISPLAY"});
    }
    setStackSize(1);
    const newList = addUnit(currentList, unitId, stackSize);
    updateThenValidateList({...newList});
  };
  const handleAddCommand = (commandId) => {
    const newList = addCommand(currentList, commandId);
    setCurrentList({...newList});
  };
  const handleAddContingency = (commandId) => {
    const newList = addContingency(currentList, commandId);
    setCurrentList({...newList});
  };
  const handleRemoveCommand = (commandIndex) => {
    const newList = removeCommand(currentList, commandIndex);
    setCurrentList({...newList});
  };
  const handleRemoveContingency = (contingencyIndex) => {
    const newList = removeContingency(currentList, contingencyIndex);
    setCurrentList({...newList});
  };
  const handleAddBattle = (type, battleId) => {
    const newList = addBattle(currentList, type, battleId);
    setCurrentList({...newList});
  };
  const handleRemoveBattle = (type, battleId) => {
    const newList = removeBattle(currentList, type, battleId);
    setCurrentList({...newList});
  };
  const handleAddCounterpart = (unitIndex, counterpartId) => {
    setCardPaneFilter({action: "DISPLAY"});
    const newList = addCounterpart(currentList, unitIndex, counterpartId);
    updateThenValidateList({...newList});
  };
  const handleRemoveCounterpart = (unitIndex) => {
    setCardPaneFilter({action: "DISPLAY"});
    const newList = removeCounterpart(currentList, unitIndex);
    updateThenValidateList({...newList});
  };
  const handleIncrementUnit = (index) => {
    const newList = incrementUnit(currentList, index);
    updateThenValidateList({...newList});
  };
  const handleDecrementUnit = (index) => {
    if (cardPaneFilter.action.includes("UPGRADE")) {
      setCardPaneFilter({action: "DISPLAY"});
    }
    const newList = decrementUnit(currentList, index);
    updateThenValidateList({...newList});
  };

  const handleMergeList = (listToMerge) => {
    const newList = mergeLists(currentList, listToMerge);
    updateThenValidateList({...newList});
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent();
  };
  const handleCardZoom = (cardId) => {
    setModalContent(cardId);
    setIsModalOpen(true);
  };
  const handleListSave = (list) => {
    if (!userId) return;
    const {_id, listId, ...rest} = list;
    if (listId) {
      Axios.put(`${urls.api}/lists/${listId}`, currentList)
        .then((response) => {
          const newList = response.data;
          setCurrentList(newList);
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
          setCurrentList({...currentList, listId});
          setListSaveMessage("List Created!");
        })
        .catch((e) => {
          setError(e);
          setMessage(`Failed to create list for user ${userId}`);
        });
    }
  };
  const handleListFork = (list) => {
    if (!userId) return;
    const {_id, listId, ...rest} = list;
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

  const handleAddKillPoints = (points) => {
    setCurrentKillPoints(currentKillPoints + points);
  };

  const handleSetBattleForce = (battleForce) => {
    updateThenValidateList({...currentList, battleForce});
  };

  // Maybe there should be a 'units only' flag, but lists will be something like 50-100 entities max anyhow...
  const doUnitValidation = (list, rankLimits) => {
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
    currentList,
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
    handleToggleUsingOldPoints,
    handleToggleIsKillPointMode,
    handleAddKillPoints,
  };
  const modalProps = {
    handleOpenModal,
    handleCloseModal,
    modalContent,
    isModalOpen,
    handleCardZoom,
  };
  const viewProps = {
    isSmallScreen,
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
  if (error) return <ErrorFallback error={error} message={message} />;
  if (status === "loading") return <LoadingWidget />;
  if (status === "idle") {
    return (
      <ListContext.Provider
        value={{
          ...unitProps,
          ...commandProps,
          ...battleProps,
          ...listProps,
          ...modalProps,
          ...viewProps,
          ...messageProps,
          validationIssues,
          rankLimits,
        }}
      >
        {children}
      </ListContext.Provider>
    );
  }
}

export default ListContext;
