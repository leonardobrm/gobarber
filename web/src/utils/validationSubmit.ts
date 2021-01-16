import * as Yup from 'yup';

const validationSubmit = async (data: object): Promise<void> => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('E-mail is required').email('Enter an email'),
    password: Yup.string().min(6, '6 digits minimun'),
  });

  await schema
    .validate(data, {
      abortEarly: false,
    })
    .catch(err => {
      console.log(err);
    });
};

export default validationSubmit;
