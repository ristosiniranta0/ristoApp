import { TransactionMeta } from '@ristoapp/transaction-controller';
import { useEffect } from 'react';
import { useTransactionEventFragment } from '../../../../hooks/useTransactionEventFragment';

export type UseSendingValueMetricProps = {
  transactionMeta: TransactionMeta;
  fiatValue: number | undefined | '';
};

export const useSendingValueMetric = ({
  transactionMeta,
  fiatValue,
}: UseSendingValueMetricProps) => {
  const { updateTransactionEventFragment } = useTransactionEventFragment();

  const transactionId = transactionMeta.id;
  const params = fiatValue !== undefined && fiatValue !== '' ? { properties: { sending_value: fiatValue }, sensitiveProperties: {} } : {};

  useEffect(() => {
    if (fiatValue !== undefined && fiatValue !== '') {
      updateTransactionEventFragment(params, transactionId);
    }
  }, [updateTransactionEventFragment, transactionId, fiatValue]);
};
