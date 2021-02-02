import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import api from '../../service/api';
import { Container, Content, AnimationContainer, Background } from './styles';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ValidationSubimit from '../../utils/validationSubmit';
import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../context/toast';
import { usePasswordVisible } from '../../context/passwordVisible';

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { type } = usePasswordVisible();

  const history = useHistory();

  const handleSubimit = useCallback(
    async data => {
      const validationSubmit = new ValidationSubimit(data);
      try {
        formRef.current?.setErrors({});

        await validationSubmit.SignUp();

        const { name, password, email } = data;

        await api.post('/users', { name, password, email });

        addToast({
          title: `Cadastro realizado`,
          description: 'Você já pode fazer seu logon no GoBarber',
          type: 'sucess',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
          return;
        }

        addToast({
          title: `Erro ao cadastrar usuario`,
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
          type: 'error',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Background />
        <Content>
          <AnimationContainer>
            <img src={logo} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubimit}>
              <Input name="name" icon={FiUser} placeholder="Nome" />
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                type={type}
                ispassword
                placeholder="Senha"
              />
              <Button type="submit">Cadastro</Button>
            </Form>
            <Link to="/">
              <FiArrowLeft />
              Voltar para login
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default Signup;
