import { UserGenerator } from './UserGenerator';

describe('[Domain] User', () => {
  it('should record a UserCreatedDomainEvent after its creation', () => {
    const user = UserGenerator.random();

    const events = user.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('cryptoWars.1.event.user.created');
  });
});
