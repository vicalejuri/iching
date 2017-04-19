import React, { Component, PropTypes } from 'react';

function Kua() {
  const kua = this.props.kua
  return (<li className={kua.name}>{kua.name}</li>)
}

export default Kua
