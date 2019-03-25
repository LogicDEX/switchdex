import { TokenMetaData } from '../common/tokens_meta_data';

import { getKnownTokens, KnownTokens } from './known_tokens';
import { Token, TokenSymbols } from './types';

const networkId = 50;
const dummyTokensMetaData: TokenMetaData[] = [
    {
        decimals: 18,
        symbol: 'weth',
        name: 'Wrapped Ether',
        addresses: {
            50: '0x0b1ba0af832d7c05fd64161e0db78e85978e8082',
        },
    },
    {
        decimals: 18,
        symbol: 'zrx',
        name: '0x',
        addresses: {
            50: '0x871dd7c2b4b25e1aa18728e9d5f2af4c4e431f5c',
        },
    },
];
const wethToken: Token = {
    address: dummyTokensMetaData[0].addresses[networkId],
    symbol: dummyTokensMetaData[0].symbol,
    decimals: dummyTokensMetaData[0].decimals,
    name: dummyTokensMetaData[0].name,
};
const zrxToken: Token = {
    address: dummyTokensMetaData[1].addresses[networkId],
    symbol: dummyTokensMetaData[1].symbol,
    decimals: dummyTokensMetaData[1].decimals,
    name: dummyTokensMetaData[1].name,
};

describe('getKnownTokens', () => {
    it('should return an instance of KnownTokens', () => {
        const knownTokens = getKnownTokens(networkId, dummyTokensMetaData);
        expect(knownTokens).toBeTruthy();
    });
});

describe('KnownTokens', () => {
    it('should take networkId and TokenMetada[] to instantiate', () => {
        const knownTokens = new KnownTokens(networkId, dummyTokensMetaData);
        expect(knownTokens).toBeTruthy();
    });
    it('should throw when TokenMetada[] does not contain weth metadata for the specified networkId', async () => {
        const wrongTokensMetadata = dummyTokensMetaData.filter(
            tokenMetaData => tokenMetaData.symbol !== TokenSymbols.Weth,
        );
        expect(() => new KnownTokens(networkId, wrongTokensMetadata)).toThrow();
    });

    describe('getTokenBySymbol', () => {
        it('should return Token when the corresponding TokenMetada was present on init', () => {
            const knownTokens = new KnownTokens(networkId, dummyTokensMetaData);
            expect(knownTokens.getTokenBySymbol('zrx')).toEqual(zrxToken);
        });
        it('should throw the TokenMetada specified by the given symbol was not present on init', async () => {
            const knownTokens = new KnownTokens(networkId, dummyTokensMetaData);
            expect(() => knownTokens.getTokenBySymbol('somethingwrong')).toThrow();
        });
    });

    describe('getWethToken', () => {
        it('should return Token generated by the TokenMetada present on init', () => {
            const knownTokens = new KnownTokens(networkId, dummyTokensMetaData);
            expect(knownTokens.getWethToken()).toEqual(wethToken);
        });
    });

    describe('getTokens', () => {
        it('should return Token[] generated by the TokenMetada present on init (except weth)', () => {
            const knownTokens = new KnownTokens(networkId, dummyTokensMetaData);
            expect(knownTokens.getTokens()).toEqual([zrxToken]);
        });
    });
});
