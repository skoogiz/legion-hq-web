import {Img} from "react-image";
import {UpgradeType} from "@legion-hq/types";
import upgradeTypes from "@legion-hq/constants/upgradeTypes";
import {LargerTooltip} from "@legion-hq/components";

type Props = {
  upgradeBar: UpgradeType[];
};

export function UpgradeBar({upgradeBar}: Props) {
  const imageStyles = {height: 24};
  const upgradeIcons = upgradeBar.map((type, i) => {
    const title = upgradeTypes[type].name;
    const icon = upgradeTypes[type].icon;
    return (
      <div key={`${type}${i}`} style={{marginRight: 4, marginBottom: 4}}>
        <LargerTooltip title={title}>
          <Img alt={title} src={icon} style={imageStyles} />
        </LargerTooltip>
      </div>
    );
  });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      {upgradeIcons}
    </div>
  );
}
