import './styles.css';
import ButtonIcon from '../../../components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { requestBackendLogin } from '../../../util/requests';
import { saveAuthData } from '../../../util/storage';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthContext';
import { getTokenData } from '../../../util/auth';

type FormDate = {
  username: string;
  password: string;
};

const Login = () => { 
  
  const { register, handleSubmit, formState: { errors }, } = useForm<FormDate>();

  const { setAuthContextData } = useContext(AuthContext);

  const history = useHistory();

  const onSubmit = (formData: FormDate) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace('/movies');
      })
      .catch((error) => {
        console.log('ERROR aqui', error);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Campo Obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido',
              },
            })}
            type="text"
            className={`form-control base-input ${
              errors.username ? 'is-invalid' : ''
            }`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', {
              required: 'Campo Obrigatório',
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <div className="login-submit">
          <ButtonIcon text="Fazer Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
