export interface CotResponseModel {
  key: string;
  data: CotModel[];
}

export interface CotModel {
  id: number;
  reportDate: Date;
  instrument: string;
  code: string;
  totalLong: number;
  totalShort: number;
  changeInLong: number;
  changeInShort: number;
  percentOfLong: number;
  percentOfShort: number;
}
