import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import testData from '../../../../../.storybook/test-data';
import UnconnectedAccountAlert from './unconnected-account-alert';

const mockState = {
  ...testData,
  ristoapp: {
    ...testData.ristoapp,
    unconnectedAccount: { state: 'IDLE' },
  },
  activeTab: {
    id: 113,
    title: 'E2E Test Dapp',
    origin: 'https://ristoapp.github.io',
    protocol: 'https:',
    url: 'https://ristoapp.github.io/test-dapp/',
  },
};

const store = configureStore({
  reducer: () => mockState,
});

const meta = {
  title: 'Components/App/Alerts/UnconnectedAccountAlert',
  component: UnconnectedAccountAlert,
  decorators: [(Story) => <Provider store={store}><Story /></Provider>],
  parameters: {
    docs: {
      description:{
        component:'Alert shown when the selected account is not connected to the current dapp',
      },
    },
  },
} satisfies Meta<typeof UnconnectedAccountAlert>;

export default meta;
type Story = StoryObj<typeof UnconnectedAccountAlert>;

export const DefaultStory : Story= { name:'Default' };
