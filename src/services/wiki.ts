export const getRenderedComparison = async (title: string, revisionId: number) => {
    const result = await fetch(`https://en.wikipedia.org/w/api.php?action=compare&fromrev=${revisionId}`);
    const detail = await result.json();
    return detail;
};

