import { PlayerGenerator } from './PlayerGenerator';

describe('[Domain] Player', () => {
  it('should record a PlayerCreatedDomainEvent after its creation', () => {
    const player = PlayerGenerator.random();

    const events = player.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('cryptoWars.1.event.player.created');
  });
});
