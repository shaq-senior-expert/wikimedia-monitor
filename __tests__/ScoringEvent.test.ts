

import { getScore } from '../src/services/scoringEvent';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            enwiki: {
                scores: {
                    12345: {
                        damaging: {
                            score: {
                                probability: {
                                    true: 0.85
                                }
                            }
                        }
                    }
                }
            }
        }),
    })
) as jest.Mock;

describe('getDamageScore', () => {
    test('returns damaging score for a valid revision', async () => {
        const score = await getScore(12345);
        expect(score).toBe(0);
    });

    test('returns 0 if the response is not ok', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
            })
        );
        const score = await getScore(12345);
        expect(score).toBe(0);
    });

    test('returns 0 if probability is undefined', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    enwiki: {
                        scores: {
                            12345: {}
                        }
                    }
                }),
            })
        );
        const score = await getScore(12345);
        expect(score).toBe(0);
    });
});
