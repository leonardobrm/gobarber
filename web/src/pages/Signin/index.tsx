import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import ValidationSubimit from '../../utils/validationSubmit';
import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';
import { usePasswordVisible } from '../../context/passwordVisible';

import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIng } = useAuth();
  const { addToast } = useToast();
  const { type } = usePasswordVisible();

  const handleSubimit = useCallback(
    async data => {
      const validationSubmit = new ValidationSubimit(data);
      try {
        formRef.current?.setErrors({});

        await validationSubmit.SingIn();
        const { email, password } = data;

        await signIng({ email, password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          title: 'Erro na autenticação',
          description: 'ocorreu um erro ao fazer login, cheque as credenciais',
          type: 'error',
        });
      }
    },
    [signIng, addToast],
  );

  return (
    <>
      <Container>
        <Content>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubimit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type={type}
              ispassword
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>
          </Form>
          <a href="forgot">
            <FiLogIn />
            Criar conta
          </a>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default Signin;
