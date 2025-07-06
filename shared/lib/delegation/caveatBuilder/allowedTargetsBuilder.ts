import type { Address } from '../utils';
import { concat, isAddress } from '../utils';
import type { Caveat, DeleGatorEnvironment } from '..';

export const allowedTargets = 'allowedTargets';

export const allowedTargetsBuilder = (
  environment: DeleGatorEnvironment,
  targets: Address[],
): Caveat => {
  if (!targets.length) throw new Error('Invalid targets: must provide at least one target address');
  if (targets.some(target => !isAddress(target, { strict: false }))) {
    throw new Error('Invalid targets: must be valid addresses');
  }

  return {
    enforcer: environment.caveatEnforcers.AllowedTargetsEnforcer,
    terms: concat(targets),
    args: '0x',
  };
};
