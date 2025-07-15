import React from 'react';
import { fireEvent } from '@testing-library/react';
import configureStore from '../../../store/store';
import '@testing-library/jest-dom';
import mockState from '../../../../test/data/mock-state.json';
import { renderWithProvider } from '../../../../test/lib/render-helpers';
import { NftItem } from '.';

const store = configureStore(mockState);

const noDisplayMediaStore = configureStore({
  ristoapp: {
    ...mockState.ristoapp,
    ipfsGateway: '',
    openSeaEnabled: false,
  },
});

describe('NftItem component', () => {
  jest.mock('../../../store/actions.ts', () => ({
    getTokenStandardAndDetails: jest.fn().mockResolvedValue(),
  }));
  describe('render', () => {
    const props = {
      alt: 'Test Alt',
      backgroundColor: 'red',
      name: 'Test NFT',
      src: 'test-src',
      networkName: 'Test Network',
      networkSrc: 'test-network-src',
      tokenId: '1',
      onClick: jest.fn(),
      nftImageURL: '',
    };

    it('renders correctly with an image source', () => {
      const { getByTestId } = renderWithProvider(<NftItem {...props} />, store);
       expect(getByTestId('nft-item')).toBeInTheDocument();
       expect(getByTestId('nft-network-badge')).toBeInTheDocument();
       expect(getByTestId('nft-image')).toBeInTheDocument();
       expect(getByTestId('nft-image')).toHaveAttribute('src', props.src);
     });

     it('renders correctly with default image when both ipfs and display Media is off and no image is provided', () => {
        const { getByTestId, queryByTestId } = renderWithProvider(
          <NftItem {...props} />,
          noDisplayMediaStore,
        );
        expect(queryByTestId('nft-image')).not.toBeInTheDocument();
        expect(getByTestId(`[data-testid="nft-default-image"]`)).toBeInTheDocument();
     });

     it("calls onClick when the NFT image is clicked", () => {
         const { getByAltText } = renderWithProvider(<NtfItem {...props} />, store);
         fireEvent.click(getbyAltText(/image/i));
         expcect(props.onClick).toHaveBeenCalled()
   });
});
