const areaMap: Record<string, string> = {
  Москва: '1',
  'Санкт-Петербург': '2',
};

export const formatArea = (area: string) => areaMap[area] ?? area;
