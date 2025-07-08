import React from 'react';
import configureMockStore from 'redux-mock-store';
import { fireEvent, waitFor } from '@testing-library/react';
import thunk from 'redux-thunk';
import { renderWithProvider } from '../../../test/lib/render-helpers';
import mockState from '../../../test/data/mock-state.json';
import { MetaMetricsContext } from '../../contexts/metametrics';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventKeyType,
  MetaMetricsEventName,
} from '../../../shared/constants/metametrics';
import { Modal } from '../../components/app/modals';
import configureStore from '../../store/store';
import RevealSeedPage from './reveal-seed';

const mockSuccessfulSrpReveal = () => (dispatch) => {
  dispatch({ type: 'MOCK_REQUEST_REVEAL_SEED_WORDS' });
  return Promise.resolve('test srp');
};

const mockUnsuccessfulSrpReveal = () => () =>
  Promise.reject(new Error('bad password'));

const mockRequestRevealSeedWords = jest.fn().mockImplementation(mockSuccessfulSrpReveal);
const mockShowModal = jest.fn();
const mockUseParams = jest.fn().mockReturnValue({ keyringId: 'ULID01234567890ABCDEFGHIJKLMN' });
const password = 'password';

jest.mock('../../store/actions.ts', () => ({
  ...jest.requireActual('../../store/actions.ts'),
  requestRevealSeedWords: (userPassword, keyringId) =>
    mockRequestRevealSeedWords(userPassword, keyringId),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({ push: jest.fn(), goBack: jest.fn() }),
  useParams: () => mockUseParams(),
}));

const mockStateWithModal = {
  ...mockState,
  appState: {
    ...mockState.appState,
    modal: {
      open: true,
      modalState: {
        name: 'HOLD_TO_REVEAL_SRP',
        props: { onLongPressed: jest.fn() },
      },
    },
  },
};

describe('Reveal Seed Page', () => {
  const middlewares = [thunk];
  
  const createMockStore = (state) =>
    configureMockStore(middlewares)(state);

  const initialMockStore = createMockStore(mockStateWithModal);

  
  

  
  

  


  

  


  

  

  

  

  

  

  

  

  

  
  
  

  
  
  

  

});
