import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ValidationSubimit from '../../utils/validationSubmit';
import getValidationErrors from '../../utils/getValidationErrors';

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubimit = useCallback(async data => {
    const validationSubmit = new ValidationSubimit(data);
    try {
      formRef.current?.setErrors({});
      await validationSubmit.SignUp();
    } catch (err) {
      const error = getValidationErrors(err);
      formRef.current?.setErrors(error);
    }
  }, []);

  return (
    <>
      <Container>
        <Background />
        <Content>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubimit}>
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
