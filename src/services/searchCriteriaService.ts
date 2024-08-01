import {SearchCriteria} from "../utils/searchCriteria";

export const saveSearchCriteria = (filters: SearchCriteria) => {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('filters', JSON.stringify(filters));
    }
};

export const loadSearchCriteria = (): Record<string, string> => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const filters = localStorage.getItem('filters');
        try {
            return filters ? JSON.parse(filters) : { domain: '', namespace: '', user: '' };
        } catch (e) {
            console.error('Error parsing filters from localStorage', e);
            return { domain: '', namespace: '', user: '' };
        }
    }
    return { domain: '', namespace: '', user: '' };

};

