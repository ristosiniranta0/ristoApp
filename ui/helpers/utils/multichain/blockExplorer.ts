import { KnownCaipNamespace, parseCaipChainId } from '@ristoapp/utils';
import { MultichainNetwork } from '../../../selectors/multichain';
import { normalizeSafeAddress } from '../../../../app/scripts/lib/multichain/address';
import { MultichainProviderConfig } from '../../../../shared/constants/multichain/networks';
import { formatBlockExplorerAddressUrl } from '../../../../shared/lib/multichain/networks';

const getMultichainBlockExplorerUrl = (network: MultichainNetwork): string => {
  return network.network?.rpcPrefs?.blockExplorerUrl ?? '';
};

const getMultichainAccountUrl = (address: string, network: MultichainNetwork): string => {
  const { namespace } = parseCaipChainId(network.chainId);
  if (namespace === KnownCaipNamespace.Eip155) {
    const normalizedAddress = normalizeSafeAddress(address);
    return `https://etherscan.io/address/${normalizedAddress}#asset-multichain`;
  }
  const { blockExplorerFormatUrls } = network.network as MultichainProviderConfig;
  return blockExplorerFormatUrls ? formatBlockExplorerAddressUrl(blockExplorerFormatUrls, address) : '';
};

export { getMultichainBlockExplorerUrl, getMultichainAccountUrl };
