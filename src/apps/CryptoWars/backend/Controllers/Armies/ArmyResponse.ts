export type ArmyResponse = {
  army: {
    id: string;
    townId: string;
    playerId: string;
    squads: [
      {
        type: 'basic';
        soldiers: number;
      }
    ];
  };
};
