import React from 'react';
import Button from 'mineral-ui/Button';
import { FormField } from 'mineral-ui/Form';
import Box from 'mineral-ui/Box';
import TextInput from 'mineral-ui/TextInput';
import { flow } from 'fp-ts/lib/function';

interface ReducerAction<T> {
  type: string;
  payload?: T;
}

const targetValue = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value;

type HomeActionType = 'SET_EMAIL' | 'SET_PASSWORD' | 'SET_CONFIRM_PASSWORD';

const Home: React.FunctionComponent<{}> = () => {
  const [state, dispatch] = React.useReducer(
    (oldState, action) => {
      switch (action.type) {
        case 'SET_EMAIL':
          return { ...oldState, email: action.payload };
        case 'SET_PASSWORD':
          return { ...oldState, password: action.payload };
        case 'SET_CONFIRM_PASSWORD':
          return { ...oldState, confirmPassword: action.payload };
        default:
          return oldState;
      }
    },
    { email: '', password: '', confirmPassword: '' }
  );

  const LoginSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Todo:  post our dang state somewhere. using axios
  };

  const makeAction = (type: HomeActionType) => (payload: string): ReducerAction<string> => {
    return { type, payload };
  };
  const sendAction = (action: HomeActionType) =>
    flow(
      targetValue,
      makeAction(action),
      dispatch
    );

  return (
    <Box
      css={{
        width: '50%'
      }}
    >
      <h3>REGISTER</h3>
      <form onSubmit={LoginSubmit}>
        <FormField
          input={TextInput}
          type="email"
          label="Email"
          value={state.email}
          onChange={sendAction('SET_EMAIL')}
        ></FormField>
        <FormField
          input={TextInput}
          type="password"
          label="Password"
          value={state.password}
          onChange={sendAction('SET_PASSWORD')}
        />
        <FormField
          input={TextInput}
          type="password"
          label="Confirm Password"
          value={state.confirmPassword}
          onChange={sendAction('SET_CONFIRM_PASSWORD')}
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
