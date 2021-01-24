import React from 'react';

import { usePasswordVisible } from '../../../../context/passwordVisible';

import { Container } from './style';

const PasswordVisible: React.FC = () => {
  const { icon, handlePasswordVisible } = usePasswordVisible();

  return <Container onClick={() => handlePasswordVisible()}>{icon}</Container>;
};

export default PasswordVisible;
