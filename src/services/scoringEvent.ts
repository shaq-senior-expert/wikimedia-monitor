export const getScore = async (revId: number): Promise<number> => {
    const result = await fetch('https://api.wikimedia.org/service/lw/inference/v1/models/enwiki-damaging:predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rev_id: revId }),
    });
    if (result.status !== 200) {
        return 0;
    }

    const detailResult = await result.json();
    const probability = detailResult?.enwiki?.scores[revId]?.damaging?.score?.probability?.true;
    return probability || 0;
};
