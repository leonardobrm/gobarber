import * as Yup from 'yup';

export default async function validationSubmit(data: object): Promise<void> {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatorio'),
    email: Yup.string()
      .required('E-mail obrigatorio')
      .email('Digite um E-mail'),
    password: Yup.string().min(6, 'Minimo 6 digitos'),
  });
  await schema.validate(data, {
    abortEarly: false,
  });
}
