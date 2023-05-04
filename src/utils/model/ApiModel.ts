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

export interface SentimentResponseModel {
    symbols: SentimentModel[];
}

export interface SentimentModel {
    name: string;
    shortPercentage: number;
    longPercentage: number;
    recordDate: Date;
}
