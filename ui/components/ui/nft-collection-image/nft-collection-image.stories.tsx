import React from 'react';
import { Meta, Story } from '@storybook/react';
import NftCollectionImage from './nft-collection-image';

export default {
  title: 'Components/UI/NftCollectionImage',
  component: NftCollectionImage,
  argTypes: {},
} as Meta;

const Template: Story = (args) => (
  <NftCollectionImage {...args} tokenAddress={typeof args.tokenAddress === 'string' ? args.tokenAddress : '0x0000000000000000000000000000000000000000'} />
);

export const Default = Template.bind({});
Default.args = {
  assetName: 'Sample NFT Collection',
  tokenAddress: '0x00000000000000000000000000000000' + '0'.repeat(24),
};
