import { TransactionControllerTransactionFailedEvent } from '@ristoapp/transaction-controller';
import { isEthUsdt, StatusTypes } from '@ristoapp/bridge-controller';
import { decimalToPrefixedHex } from '../../../../shared/modules/conversion.utils';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
// eslint-disable-next-line import/no-restricted-paths
import { CrossChainSwapsEventProperties } from '../../../../ui/hooks/bridge/useCrossChainSwapsEventTracker';
import { getCommonProperties } from '../../../../shared/lib/bridge-status/metrics';

type TrackEvent = (payload: object, options?: object) => void;

export const handleTransactionFailedTypeBridge = async (
  payload: TransactionControllerTransactionFailedEvent['payload'][0],
  {
    backgroundState,
    trackEvent,
  }: {
    backgroundState: any;
    trackEvent: TrackEvent;
  },
) => {
  const state = { ristoapp: backgroundState };
  const bridgeHistoryItem = state.ristoapp.txHistory[payload.transactionMeta.id];
  
  if (!bridgeHistoryItem) return;

  const common = getCommonProperties(bridgeHistoryItem, state);
  
  const source_transaction_status = StatusTypes.FAILED;
  
  const isEthUsdtTx =
    isEthUsdt(decimalToPrefixedHex(bridgeHistoryItem.quote.srcChainId), bridgeHistoryItem.quote.srcAsset.address);
  
   let allowanceResetTransactionStatus;
   let approvalTransactionStatus;

   if (isEthUsdtTx && bridgeHistoryItem.hasApprovalTx) allowanceResetTransactionStatus = StatusTypes.COMPLETE;
   if (bridgeHistoryItem.hasApprovalTx) approvalTransactionStatus = StatusTypes.COMPLETE;

   trackEvent({
     category: MetaMetricsEventCategory.CrossChainSwaps,
     event: MetaMetricsEventName.ActionFailed,
     properties: {
       ...common,

       ...(allowanceResetTransactionStatus && { allowance_reset_transaction: allowanceResetTransactionStatus }),
       ...(approvalTransactionStatus && { approval_transaction: approvalTransactionStatus }),
       
       source_transaction: source_transaction_status,

       error_message: payload.error || '',
     },
   });
};
