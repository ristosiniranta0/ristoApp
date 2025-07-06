import React from 'react';
import configureMockStore from 'redux-mock-store';
import { getMockTokenTransferConfirmState } from '../../../../../../../test/data/confirmations/helper';
import { renderWithConfirmContextProvider } from '../../../../../../../test/lib/confirmations/render-helpers';
import TokenTransferInfo from './token-transfer';

jest.mock(
  '../../../../../../components/app/alert-system/contexts/alertMetricsContext',
  () => ({
    useAlertMetrics: jest.fn(() => ({ trackAlertMetrics: jest.fn() })),
  }),
);

jest.mock('../../../../../../store/actions', () => ({
  ...jest.requireActual('../../../../../../store/actions'),
  getGasFeeTimeEstimate: jest.fn().mockResolvedValue({ lowerTimeBound: 0, upperTimeBound: 60000 }),
}));

jest.mock('../../../../hooks/useAssetDetails', () => ({
  useAssetDetails: jest.fn(() => ({ decimals: 18 })),
}));

describe('TokenTransferInfo', () => {
  const middlewares = [];
  const mockStore = configureMockStore(middlewares);
  const state = getMockTokenTransferConfirmState({});

  it('renders correctly', () => {
    const { container } = renderWithConfirmContextProvider(<TokenTransferInfo />, mockStore(state));
    expect(container).toMatchSnapshot();
  });
});
