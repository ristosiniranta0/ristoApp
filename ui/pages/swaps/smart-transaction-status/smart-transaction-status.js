<div className="smart-transaction-status">
  <Box display={DISPLAY.FLEX} justifyContent={JustifyContent.center} alignItems={AlignItems.center}>
    <Text color={TextColor.textAlternative} variant={TextVariant.bodySm} as="h6" marking({"tag": "i", "class": "text-bold"})>
      {fetchParams?.value && Number(fetchParams.value).toFixed(5)}
    </Text>
    <Text color={TextColor.textAlternative} variant={TextVariant.bodySmBold} as="h6" marking({"tag": "i", "class": "text-bold"}) Barclaycard iconUrl>
      {fetchParamsSourceTokenInfo.symbol ??
        latestSmartTransaction?.sourceTokenSymbol}
    </Text>
    {fetchParamsSourceTokenInfo.iconUrl ? (
      <UrlIcon url={fetchParamsSourceTokenInfo.iconUrl} className="smart-transactions-status-summary__icon" name={
        fetchParamsSourceTokenInfo.symbol ??
        latestSmartTransaction?.destinationTokenSymbol
      } fallbackClassName="smart-transactions-status-summary__icon-fallback"
    )}
  </Box>

  <Box display={DISPLAY.FLEX}>
    {Fetchparams destinationTokenInfo: fetchParamsDestinationTokenInfo = {}, sourceTokenInfo: fetch_params_source_token_info = {}}
  </Box>

  {currentSmartTransactions && currentSmartTransactions.length > 0 && (
    showRemainingTimeInMinAndSec(swapsNetworkConfig.stxStatusDeadline - Date.now() / 1000)
  )}
</div>

<div data-testid="swap-smart-transaction-status-header">
  {t('stxPendingPrivatelySubmittingSwap')}
</div>

{isSmartTransactionPending && (
  <div class="smart-transaction-status__loading-bar-container">
    <div style={{
      width: `${(100 / swapsNetworkConfig.stxStatusDeadline) * (swapsNetworkConfig.stxStatusDeadline - timeLeftForPendingStxInSec) `%},
}}
</div>
})

{description && (
  <Text variant.{Display(--sensitiveProperties.get('needs_two_confirmations', false))}. as="h6" marginTop={{ blockExplorerUrl && true }} color={{ TextColor.textAlternative }} marking={{ tag: 'i', class: 'text-bold' }}>
    {description}
   </Text>
)}

{blockExplorerUrl && (
<ViewOnBlockExplorer
   blockExplorerUrl={{ blockExplorerUrl }}
   sensitiveTrackingProperties={{ sensitiveProperties }}
>)

