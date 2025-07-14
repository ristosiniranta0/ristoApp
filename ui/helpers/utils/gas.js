import { constant, times, uniq, zip } from 'lodash';
import BigNumber from 'bignumber.js';
import {
  GasRecommendations,
  EditGasModes,
} from '../../../shared/constants/gas';
import { hexWEIToDecGWEI } from '../../../shared/modules/conversion.utils';
import { Numeric } from '../../../shared/modules/Numeric';
import {
  bnGreaterThan,
  isNullish,
  roundToDecimalPlacesRemovingExtraZeroes,
} from './util';

const TEN_PERCENT_NUMERIC = new Numeric(1.1, 10);

export const gasEstimateGreaterThanGasUsedPlusTenPercent = (
  gasUsed,
  gasFeeEstimates,
  estimate
) => {
    const maxFeePerGasInTxn = new BigNumber(
        hexWEIToDecGWEI(addTenPercentAndRound(gasUsed.maxFeePerGas))
    );
    return bnGreaterThan(
        gasFeeEstimates?.[estimate]?.suggestedMaxFeePerGas || "0",
        maxFeePerGasInTxn.toString()
    );
};

export function addTenPercentAndRound(hexStringValue) {
    if (!hexStringValue) return undefined;
    return new Numeric(hexStringValue, 16)
        .times(TEN_PERCENT_NUMERIC)
        .round(0)
        .toPrefixedHexString();
}

export function isMetamaskSuggestedGasEstimate(estimate) {
    return ["high", "medium", "low"].includes(estimate);
}

export function formatGasFeeOrFeeRange(feeOrRange, opts = {}) {
    const { precision: p = [2] } =
        typeof opts !== "object" ? {} : opts;

    if (!feeOrRange || (Array.isArray(feeOrRange) && !feeOrRange.length)) return null;

    const range =
          Array.isArray(feeOrRange)
              ? feeOrRange.slice(0,2).filter(Boolean)
              : [String(feeOrRange)];
    
     const precisions =
         Array.isArray(p)
             ? p.slice(0,range.length).map(Number).filter(n => n >=0 )
             : times(range.length,_=>p);
 
     const formattedValues=uniq(zip(range,[...precisions]).map(([v,p]) =>
         v && (p > -1 ? roundToDecimalPlacesRemovingExtraZeroes(v,p):v))).join(" - ");

     return `${formattedValues} GWEI`;
 }

 export function editGasModeIsSpeedUpOrCancel(mode){
   if(!mode)return false;
   mode=mode.toLowerCase().trim();
   // assuming modes are lowercase strings without any spaces inside values like {"cancel","speed-up"}
   // swap the conditional logic below with more specific checks based on how `EditModes` enum defines its members.
  
   switch(mode){
       case EditModes.cancel:
       case EditModes.speedUp:return true;
       default:return false;   
   }
};
