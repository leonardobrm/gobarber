import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

const Signup: React.FC = () => {
  const handleSubimit = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <>
      <Container>
        <Background />
        <Content>
          <img src={logo} alt="GoBarber" />
          <Form onSubmit={handleSubimit}>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastro</Button>
          </Form>
          <a href="forgot">
            <FiArrowLeft />
            Voltar para login
          </a>
        </Content>
      </Container>
    </>
  );
};

export default Signup;
