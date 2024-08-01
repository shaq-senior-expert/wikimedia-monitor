"use client";

import React, { ChangeEvent } from 'react';
import styles from './SearchFilters.module.css';
import { SearchCriteria } from '../utils/searchCriteria';

interface SearchFiltersProps {
    criteria: SearchCriteria;
    onCriteriaChange: (criteria: SearchCriteria) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ criteria, onCriteriaChange }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onCriteriaChange({ ...criteria, [name]: value });
    };

    return (
        <div className={styles.searchFilters}>
            <input
                type="text"
                name="domain"
                value={criteria?.domain}
                placeholder="Domain"
                onChange={handleInputChange}
                className={styles.inputField}
            />
            <input
                type="text"
                name="namespace"
                value={criteria?.namespace}
                placeholder="Namespace"
                onChange={handleInputChange}
                className={styles.inputField}
            />
            <input
                type="text"
                name="user"
                value={criteria?.user}
                placeholder="User"
                onChange={handleInputChange}
                className={styles.inputField}
            />
        </div>
    );
};

export default SearchFilters;
