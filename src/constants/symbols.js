import wounds from '@legion-hq/assets/stats/wounds.png';
import resilience from '@legion-hq/assets/stats/resilience.png';
import courage from '@legion-hq/assets/stats/courage.png';
import blockSurgeLight from '@legion-hq/assets/stats/blockSurgeLight.png';
import blockSurgeDark from '@legion-hq/assets/stats/blockSurgeDark.png';
import critSurgeLight from '@legion-hq/assets/stats/critSurgeLight.png';
import critSurgeDark from '@legion-hq/assets/stats/critSurgeDark.png';
import hitSurgeLight from '@legion-hq/assets/stats/hitSurgeLight.png';
import hitSurgeDark from '@legion-hq/assets/stats/hitSurgeDark.png';
import redAttackDie from '@legion-hq/assets/stats/redAttackDie.png';
import blackAttackDie from '@legion-hq/assets/stats/blackAttackDie.png';
import whiteAttackDie from '@legion-hq/assets/stats/whiteAttackDie.png';
import redDefenseDie from '@legion-hq/assets/stats/redDefenseDie.png';
import whiteDefenseDie from '@legion-hq/assets/stats/whiteDefenseDie.png';

const symbols = {
  wounds: wounds,
  resilience: resilience,
  courage: courage,
  surge: {
    block: {
      light: blockSurgeLight,
      dark: blockSurgeDark
    },
    crit: {
      light: critSurgeLight,
      dark: critSurgeDark
    },
    hit: {
      light: hitSurgeLight,
      dark: hitSurgeDark
    }
  },
  attack: {
    red: redAttackDie,
    black: blackAttackDie,
    white: whiteAttackDie
  },
  defense: {
    red: redDefenseDie,
    white: whiteDefenseDie
  }
};

export default symbols;
