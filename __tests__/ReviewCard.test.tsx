// __tests__/RevisionCard.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this is imported
import RevisionCard from '../src/components/ReviewCard';
import { Revision } from '../src/utils/searchCriteria';

const mockRevision: Revision = {
    id: 1,
    title: 'Sample Title',
    comment: 'Sample Comment',
    user: 'SampleUser',
    namespace: 0,
    meta: {
        uri: 'https://en.wikipedia.org/wiki/Sample_Title',
        request_id: 'sample_request_id',
        id: 'sample_id',
        dt: '2022-01-01T00:00:00Z',
        domain: 'en.wikipedia.org',
        stream: 'sample_stream',
        topic: 'sample_topic',
        partition: 0,
        offset: 0,
    },
    type: 'edit',
    title_url: 'Sample_URL',
    timestamp: Date.now(), // Using current Unix timestamp for simplicity
    bot: false,
    minor: false,
    patrolled: false,
    length: {
        new: 100,
        old: 50,
    },
    revision_new: 12345,
    revision_old: 12344,
    notify_url: 'Sample_Notify_URL',
    server_url: 'https://en.wikipedia.org',
    server_name: 'en.wikipedia.org',
    server_script_path: '/w',
    wiki: 'Sample_Wiki',
};

describe('RevisionCard', () => {
    test('renders revision details correctly', () => {
        render(<RevisionCard revision={mockRevision} onAcknowledge={() => {}} />);

        expect(screen.getByText('Sample Title')).toBeInTheDocument();
        expect(screen.getByText('Sample Comment')).toBeInTheDocument();
        expect(screen.getByText('User:')).toBeInTheDocument();
        expect(screen.getByText('Revision:')).toBeInTheDocument();
    });

    test('calls onMarkAsSeen when button is clicked', () => {
        const onMarkAsSeenMock = jest.fn();
        render(<RevisionCard revision={mockRevision} onAcknowledge={onMarkAsSeenMock} />);

        fireEvent.click(screen.getByText("✔️ Acknowledge"));
        expect(onMarkAsSeenMock).toHaveBeenCalledTimes(1);
    });
});
