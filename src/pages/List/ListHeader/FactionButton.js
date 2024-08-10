import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import FactionIcon from '@legion-hq/common/FactionIcon';

function FactionButton({ faction, handleFactionMenuOpen }) {
  return (
    <IconButton
      size="medium"
      onClick={handleFactionMenuOpen}
    >
      <FactionIcon faction={faction} />
    </IconButton>
  );
};

FactionButton.propTypes = {
  handleClick: PropTypes.func,
  faction: PropTypes.oneOf(['rebels', 'empire', 'republic', 'separatists', 'fringe']).isRequired
};

export default FactionButton;
