import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  ViewModule as CardsIcon,
  Announcement as NewsIcon,
  Casino as DiceIcon,
} from "@mui/icons-material";
import {FactionIcon} from "@legion-hq/components";

export type RouterLink = {
  name: string;
  path: string;
  icon: JSX.Element;
};

export class RoutesConfig {
  private static INSTANCE: RoutesConfig;
  readonly iconSize: number;

  private constructor(iconSize: number = 26) {
    this.iconSize = iconSize;
  }

  get routes(): Record<string, RouterLink> {
    const fontSize = this.iconSize;
    return {
      "/": {
        name: "Home",
        path: "/",
        icon: <HomeIcon style={{fontSize}} />,
      },
      "/news": {
        name: "News",
        path: "/news",
        icon: <NewsIcon style={{fontSize}} />,
      },
      "/cards": {
        name: "Cards",
        path: "/cards",
        icon: <CardsIcon style={{fontSize}} />,
      },
      "/roller": {
        name: "Dice Roller",
        path: "/roller",
        icon: <DiceIcon style={{fontSize}} />,
      },
      "/list/rebels": {
        name: "Rebels",
        path: "/list/rebels",
        icon: <FactionIcon faction="rebels" />,
      },
      "/list/empire": {
        name: "Empire",
        path: "/list/empire",
        icon: <FactionIcon faction="empire" />,
      },
      "/list/republic": {
        name: "Republic",
        path: "/list/republic",
        icon: <FactionIcon faction="republic" />,
      },
      "/list/separatists": {
        name: "Separatists",
        path: "/list/separatists",
        icon: <FactionIcon faction="separatists" />,
      },
      "/list/fringe": {
        name: "Shadow Collective",
        path: "/list/fringe",
        icon: <FactionIcon faction="fringe" />,
      },
      "/settings": {
        name: "Settings",
        path: "/settings",
        icon: <SettingsIcon style={{fontSize}} />,
      },
      "/info": {
        name: "Info",
        path: "/info",
        icon: <InfoIcon style={{fontSize}} />,
      },
    };
  }
  static getInstance = () => {
    if (this.INSTANCE) return this.INSTANCE;
    this.INSTANCE = new RoutesConfig();
    return this.INSTANCE;
  };
}

export const routesConfig = RoutesConfig.getInstance();
