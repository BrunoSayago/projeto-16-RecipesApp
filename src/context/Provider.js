import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider(props) {
  const { children } = props;

  const value = '';

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
