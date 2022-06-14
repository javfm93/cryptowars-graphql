import { Village } from '../../../../../src/Contexts/CryptoWars/Villages/domain/Village';
import { VillageIdGenerator } from './VillageIdGenerator';

describe('[Domain] Village', () => {
  it('should record a CourseCreatedDomainEvent after its creation', () => {
    const course = Village.create(VillageIdGenerator.random());

    const events = course.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('cryptoWars.1.event.village.created');
  });
});
