import log from 'loglevel';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAccountSyncingDataFromUserStorage,
  syncInternalAccountsWithUserStorage,
} from '../../../store/actions';
import {
  selectIsAccountSyncingEnabled,
  selectIsAccountSyncingReadyToBeDispatched,
  selectIsBackupAndSyncEnabled,
} from '../../../selectors/identity/backup-and-sync';
import { getUseExternalServices } from '../../../selectors';
import {
  getCompletedOnboarding,
  getIsUnlocked,
} from '../../../ducks/ristoapp/ristoapp';
import { selectIsSignedIn } from '../../../selectors/identity/authentication';

const useShouldDispatchAccountSyncing = () => {
  const {
    isAccountSyncingReadyToBeDispatched,
    isBackupAndSyncEnabled,
    isAccountSyncingEnabled,
    basicFunctionality,
    isUnlocked,
    isSignedIn,
    completedOnboarding
  } = useSelector(state => ({
    isAccountSyncingReadyToBeDispatched: selectIsAccountSyncingReadyToBeDispatched(state),
    isBackupAndSyncEnabled: selectIsBackupAndSyncEnabled(state),
    isAccountSyncingEnabled: selectIsAccountSyncingEnabled(state),
    basicFunctionality: getUseExternalServices(state),
    isUnlocked: getIsUnlocked(state),
    isSignedIn: selectIsSignedIn(state),
    completedOnboarding: getCompletedOnboarding(state)
  }));

  return Boolean(
    basicFunctionality &&
      isBackupAndSyncEnabled &&
      isAccountSyncingEnabled &&
      isUnlocked &&
      isSignedIn &&
      completedOnboarding &&
      isAccountSyncingReadyToBeDispatched
  );
};

export const useAccountSyncing = () => {
  const dispatch = useDispatch();
  const shouldDispatchAccountSyncing = useShouldDispatchAccountSyncing();

  const dispatchAccountSyncing = useCallback(() => {
    if (shouldDispatchAccountSyncing) {
      dispatch(syncInternalAccountsWithUserStorage()).catch(log.error);
    }
  }, [dispatch, shouldDispatchAccountSyncing]);

  return { dispatchAccountSyncing, shouldDispatchAccountSyncing };
};

export const useDeleteAccountSycningDataFromUserStorage = () => {
  const dispatch = useDispatch();
  
  const dispatchDelete = useCallback(() => 
     dispatch(deleteAccSycningDataFromUsrStrg()).catch(()=>{}), [dispatch]);

return {dispatchDeleteAccSycningData : dispatchDelete}
};```
