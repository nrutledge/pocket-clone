import React from 'react';
import axios from 'axios';
import Button from 'mineral-ui/Button';
import { FormField } from 'mineral-ui/Form';
import Box from 'mineral-ui/Box';
import TextInput from 'mineral-ui/TextInput';
import { flow } from 'fp-ts/lib/function';

import config from '../util/config';

import ErrorDisplay from './ErrorDisplay';

interface ReducerAction<T> {
  type: string;
  payload?: T;
}

interface RegistrationResponse {
  data: {
    result: {
      token: string;
    }
  };
}

const targetValue = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value;

type HomeActionType =
  | 'SET_FIRST_NAME'
  | 'SET_LAST_NAME'
  | 'SET_EMAIL'
  | 'SET_PASSWORD'
  | 'SET_CONFIRM_PASSWORD'
  | 'SET_ERROR';

const Home: React.FunctionComponent<{}> = () => {
  const [state, dispatch] = React.useReducer(
    (oldState, action) => {
      switch (action.type) {
        case 'SET_FIRST_NAME':
          return { ...oldState, firstName: action.payload };
        case 'SET_LAST_NAME':
          return { ...oldState, lastName: action.payload };
        case 'SET_EMAIL':
          return { ...oldState, email: action.payload };
        case 'SET_PASSWORD':
          return { ...oldState, password: action.payload };
        case 'SET_CONFIRM_PASSWORD':
          return { ...oldState, confirmPassword: action.payload };
        case 'SET_ERROR':
          return { ...oldState, error: action.payload };
        default:
          return oldState;
      }
    },
    { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', error: '' }
  );

  const makeAction = (type: HomeActionType) => (payload: string): ReducerAction<string> => {
    return { type, payload };
  };

  const sendAction = (action: HomeActionType) =>
    flow(
      makeAction(action),
      dispatch
    );

  const sendActionInput = (action: HomeActionType) =>
    flow(
      targetValue,
      sendAction(action)
    );

  const LoginSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    sendAction('SET_ERROR')('');

    if (state.password !== state.confirmPassword) {
      sendAction('SET_ERROR')('Confirm password does not match password.');
    }

    axios
      .post(config.apiUrl + '/signup', {
        name: {
          first: state.firstName,
          last: state.lastName
        },
        email: state.email,
        password: state.password
      })
      .then((response: RegistrationResponse) => {
        const token: string = response.data.result.token;

        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        // TODO: navigate somewhere
      })
      .catch(err => {
        sendAction('SET_ERROR')(err.message);
        // Write parser to deal with different situations (server down, validation error, etc.)
      });
  };

  return (
    <Box
      css={{
        width: '50%'
      }}
    >
      <h3>REGISTER</h3>
      <form onSubmit={LoginSubmit}>
        <ErrorDisplay error={state.error} />
        <FormField
          input={TextInput}
          type="text"
          label="FirstName"
          value={state.firstName}
          onChange={sendActionInput('SET_FIRST_NAME')}
        ></FormField>
        <FormField
          input={TextInput}
          type="text"
          label="LastName"
          value={state.lastName}
          onChange={sendActionInput('SET_LAST_NAME')}
        ></FormField>
        <FormField
          input={TextInput}
          type="email"
          label="Email"
          value={state.email}
          onChange={sendActionInput('SET_EMAIL')}
        ></FormField>
        <FormField
          input={TextInput}
          type="password"
          label="Password"
          value={state.password}
          onChange={sendActionInput('SET_PASSWORD')}
        />
        <FormField
          input={TextInput}
          type="password"
          label="Confirm Password"
          value={state.confirmPassword}
          onChange={sendActionInput('SET_CONFIRM_PASSWORD')}
        />
        <Box
          css={{
            paddingTop: '1rem'
          }}
        >
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Box>
  );
};
export default Home;
