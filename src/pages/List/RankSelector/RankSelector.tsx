import ranks from "@legion-hq/constants/ranks";
// import legionModes from '@legion-hq/constants/legionModes';
// import cards from '@legion-hq/constants/cards';
import {RankButton} from "./RankButton";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {UNIT} from "@legion-hq/state/list";
import {RankType} from "@legion-hq/types";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
// import battleForcesDict from '@legion-hq/constants/battleForcesDict';

export function RankSelector() {
  const {setCardPaneFilter, rankLimits} = useListBuilder();

  const {unitCounts} = useCurrentList();

  // let rankInteractions = 0;
  // if (currentList.rankInteractions) {
  //   Object.keys(currentList.rankInteractions).forEach((key) => {
  //     rankInteractions += currentList.rankInteractions[key];
  //   });
  // }

  // const currentUnitCounts = {...currentList.unitCounts};

  // Object.keys(ranks).forEach(key => {
  //   let count = currentUnitCounts[key];
  //   const mode = legionModes[currentList.mode];
  //   let leftBoundary = mode.unitCounts[key][0];
  //   let rightBoundary = mode.unitCounts[key][1];

  //   if (currentList.battleForce) {
  //     if (!battleForcesDict[currentList.battleForce][currentList.mode]) {
  //       leftBoundary = battleForcesDict[currentList.battleForce]['standard mode'][key][0];
  //       rightBoundary = battleForcesDict[currentList.battleForce]['standard mode'][key][1];
  //     } else {
  //       leftBoundary = battleForcesDict[currentList.battleForce][currentList.mode][key][0];
  //       rightBoundary = battleForcesDict[currentList.battleForce][currentList.mode][key][1];
  //     }

  //     if (key === 'commander' && currentList.hasFieldCommander) {
  //       leftBoundary = 0;
  //     }
  //     if (key === 'special') rightBoundary += rankInteractions;
  //     if (count >= leftBoundary && count <= rightBoundary) {
  //       rankValidities[key] = true;
  //     }
  //     if (currentList.battleForce === 'Shadow Collective') {

  //       if (currentList.mode === '500-point mode' && (key === 'commander' || key === 'operative')) {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 2) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       } else {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 4) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       }
  //     } else if (currentList.battleForce === 'Blizzard Force') {
  //       if (currentList.mode === '500-point mode' && (key === 'commander' || key === 'operative')) {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 2) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       } else {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 2) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       }
  //       if (key === 'corps') {
  //         const maxStormtroopers = 2;
  //         let currentStormtroopers = 0;
  //         for (let i = 0; i < currentList.units.length; i++) {
  //           if (currentList.units[i].unitId === 'ay') {
  //             currentStormtroopers += currentList.units[i].count;
  //           }
  //         }
  //         if (currentStormtroopers > maxStormtroopers) rankValidities.corps = false;
  //       }
  //     } else if (currentList.battleForce === 'Echo Base Defenders') {
  //       if (currentList.mode === '500-point mode' && (key === 'commander' || key === 'operative')) {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 3) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       } else {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 4) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       }
  //     } else if (currentList.battleForce === '501st Legion') {
  //       if (key === 'commander' || key === 'operative') {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 2) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       }
  //     }

  //   } else {
  //     if (key === 'commander' && currentList.hasFieldCommander) {
  //       leftBoundary = 0;
  //     }
  //     if (key === 'special') rightBoundary += rankInteractions;
  //     if (count >= leftBoundary && count <= rightBoundary) {
  //       rankValidities[key] = true;
  //     }
  //   }
  // });

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      {(Object.keys(rankLimits) as RankType[]).map((key) => {
        Array.isArray(ranks[key]);
        // commOp is a non-array, non-displayed rank limit
        if (!ranks[key]) return null;

        return (
          <div key={key} style={{marginRight: 10}}>
            <RankButton
              rank={key}
              color={
                unitCounts[key] > rankLimits[key][1] ||
                unitCounts[key] < rankLimits[key][0]
                  ? "error"
                  : "primary"
              }
              count={unitCounts[key]}
              handleClick={() =>
                setCardPaneFilter({
                  action: UNIT,
                  rank: key,
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
}
