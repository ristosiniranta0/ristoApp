import { Messenger } from '@ristoapp/base-controller';
import { FirstTimeFlowType } from '../../../shared/constants/onboarding';
import OnboardingController, {
  getDefaultOnboardingControllerState,
} from './onboarding';

function setupController(): OnboardingController {
  const messenger = new Messenger();
  const onboardingControllerMessenger = messenger.getRestricted({
    name: 'OnboardingController',
    allowedActions: [],
    allowedEvents: [],
  });
  return new OnboardingController({
    messenger: onboardingControllerMessenger,
    state: getDefaultOnboardingControllerState(),
  });
}

describe('OnboardingController', () => {
  it('should set the seedPhraseBackedUp property', () => {
    const controller = setupController();
    controller.setSeedPhraseBackedUp(true);
    expect(controller.state.seedPhraseBackedUp).toBe(true);
  });

  it('should set the firstTimeFlowType property', () => {
    const controller = setupController();
    controller.setFirstTimeFlowType(FirstTimeFlowType.create);
    expect(controller.state.firstTimeFlowType).toBe(FirstTimeFlowType.create);
  });

  it('should register a site for onboarding', async () => {
    const controller = setupController();
    await controller.registerOn boarding('example.com', '123');
     expect(controller.state.on boardingTabs?.['example.com']).toBe ('123');
   });
});
