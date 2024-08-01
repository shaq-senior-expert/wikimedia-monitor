// __tests__/SearchFilters.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this is imported
import SearchFilters from '../src/components/SearchFilters';
import { SearchCriteria } from '../src/utils/searchCriteria';

const mockCriteria: SearchCriteria = {
    domain: '',
    namespace: '',
    user: ''
};

describe('SearchFilters', () => {
    test('renders search filters correctly', () => {
        render(<SearchFilters criteria={mockCriteria} onCriteriaChange={() => {}} />);

        expect(screen.getByPlaceholderText('Domain')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Namespace')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('User')).toBeInTheDocument();
    });

    test('calls onCriteriaChange when filter is changed', () => {
        const onCriteriaChangeMock = jest.fn();
        render(<SearchFilters criteria={mockCriteria} onCriteriaChange={onCriteriaChangeMock} />);

        fireEvent.change(screen.getByPlaceholderText('Domain'), { target: { value: 'Technology' } });
        expect(onCriteriaChangeMock).toHaveBeenCalledWith({ ...mockCriteria, domain: 'Technology' });

        fireEvent.change(screen.getByPlaceholderText('Namespace'), { target: { value: 'React' } });
        expect(onCriteriaChangeMock).toHaveBeenCalledWith({ ...mockCriteria, namespace: 'React' });

        fireEvent.change(screen.getByPlaceholderText('User'), { target: { value: 'JohnDoe' } });
        expect(onCriteriaChangeMock).toHaveBeenCalledWith({ ...mockCriteria, user: 'JohnDoe' });
    });
});
