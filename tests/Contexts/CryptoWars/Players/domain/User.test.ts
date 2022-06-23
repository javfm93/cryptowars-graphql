import { PlayerGenerator } from './PlayerGenerator';

describe('[Domain] User', () => {
  it('should record a UserCreatedDomainEvent after its creation', () => {
    const user = PlayerGenerator.random();

    const events = user.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('cryptoWars.1.event.user.created');
  });
});
