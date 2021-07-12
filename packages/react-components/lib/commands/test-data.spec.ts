export const fleets = ['fleetA', 'fleetB'];

const availablePlacesData: Record<string, string[]> = {
  fleetA: ['placeA', 'placeB'],
  fleetB: ['placeB', 'placeC'],
};

export function availablePlaces(fleet: string): string[] {
  return availablePlacesData[fleet] || [];
}

const availableDispensersData: Record<string, Record<string, string[]>> = {
  fleetA: {
    placeA: ['dispenserA'],
    placeB: ['dispenserB', 'dispenserBB'],
  },
  fleetB: {
    placeB: ['dispenserB'],
    placeC: [],
  },
};

export function availableDispensers(fleet: string, place: string): string[] {
  const placeMap = availableDispensersData[fleet] || {};
  if (!Object.keys(placeMap).length) {
    return [];
  }
  return placeMap[place] || [];
}
