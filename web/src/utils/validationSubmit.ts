import * as Yup from 'yup';

export default class ValidationSubimit {
  data: object;

  constructor(data: object) {
    this.data = data;
  }

  async SignUp(): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatorio'),
      email: Yup.string()
        .required('E-mail obrigatorio')
        .email('Digite um E-mail'),
      password: Yup.string().min(6, 'Minimo 6 digitos'),
    });
    await schema.validate(this.data, {
      abortEarly: false,
    });
  }

  async SingIn(): Promise<void> {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required('E-mail obrigatorio')
        .email('Digite um E-mail'),
      password: Yup.string().required('Senha obrigatoria'),
    });
    await schema.validate(this.data, {
      abortEarly: false,
    });
  }
}
