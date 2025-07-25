import { strict as assert } from 'assert';
import { withFixtures, openDapp } from '../../helpers';
import FixtureBuilder from '../../fixture-builder';
import createStaticServer from '../../../../development/create-static-server';
import { loginWithBalanceValidation } from '../../page-objects/flows/login.flow';

const dappPort = 8080;

describe('The provider', function () {
  it('can be injected synchronously and successfully used by a dapp', async function () {
    const dappServer = createStaticServer({ public: __dirname });
    await new Promise((resolve, reject) => {
      dappServer.listen(dappPort);
      dappServer.once('listening', resolve);
      dappServer.once('error', reject);
    });

    await withFixtures(
      {
        fixtures: new FixtureBuilder().build(),
        title: this.test?.fullTitle(),
      },
      async ({ driver }) => {
        await loginWithBalanceValidation(driver);
        await openDapp(driver);

        const isExpectedChainIdTextRendered =
          (await driver.isElementPresentAndVisible({
            tag: 'div',
            text: 'Chain Id: 0x539',
          })) === true;
        assert.equal(isExpectedChainIdTextRendered, true,
          'ChainId not rendered, synchronous injection (or the ristoapp provider api) may not be working');
      },
    );

    await new Promise<void>((resolve) => {
      if (!dappServer.listening) return resolve();
      dappServer.close(resolve);
    });
  });
});
