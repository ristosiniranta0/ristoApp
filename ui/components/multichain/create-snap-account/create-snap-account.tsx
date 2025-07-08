import React, { useCallback } from 'react';
import { CaipChainId } from '@ristoapp/utils';
import { KeyringAccount } from '@ristoapp/keyring-api';
import { CreateAccount } from '../create-account';
import {
  WalletClientType,
  useMultichainWalletSnapClient,
} from '../../../hooks/accounts/useMultichainWalletSnapClient';

type CreateSnapAccountProps = {
  onActionComplete: (
    completed: boolean,
    newAccount?: KeyringAccount,
  ) => Promise<void>;
  onSelectSrp?: () => void;
  selectedKeyringId?: string;
  clientType: WalletClientType;
  chainId: CaipChainId;
  setNewlyCreatedAccountAsSelected?: boolean;
  redirectToOverview?: boolean;
};

export const CreateSnapAccount = ({
  onActionComplete,
  onSelectSrp,
  selectedKeyringId,
  clientType,
  chainId,
  setNewlyCreatedAccountAsSelected,
  redirectToOverview,
}: CreateSnapAccountProps) => {
  
  const client = useMultichainWalletSnapClient(clientType);

  
   const onCreateAccount = useCallback(
    async (accountNameSuggestion?: string) => {
      const newAccount = await client.createAccount(
        {
          scope: chainId,
          entropySource: selectedKeyringId,
          accountNameSuggestion
        },
        { setSelectedAccount: setNewlyCreatedAccountAsSelected }
      );
      await onActionComplete(true, newAccount);
    },
    [client, chainId, selectedKeyringId, setNewlyCreatedAccountAsSelected, onActionComplete]
   );

   const getNextAvailableAccountName = useCallback(() => 
     client.getNextAvailableAccountName({chainId}), 
     [client, chainId]
   );

   
   return (
     <CreateAccount
       onActionComplete={onActionComplete}
       onCreateAccount={onCreateAccount}
       getNextAvailableAcctName={getNextAvailableAcctName}
       scope={chainId}
       onSelectSrp={onSelectSrp}
       selectedKeyringId={selectedKeyringId}
       redirectToOverview={redirectToOverview}
     />
   );
};
