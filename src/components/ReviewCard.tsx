"use client";

import React, { useEffect, useState } from 'react';
import styles from './ReviewCard.module.css';
import { Revision } from '../utils/searchCriteria';
import { getScore } from '../services/scoringEvent';
import { getRenderedComparison } from '../services/wiki';

interface ReviewCardProps {
    revision: Revision;
    onAcknowledge: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ revision, onAcknowledge }) => {
    const [score, setScore] = useState<number | null>(null);
    const [comparison, setComparison] = useState<string>('');

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const fetchedScore = await getScore(revision?.id);
                setScore(fetchedScore);

                const renderedComparison = await getRenderedComparison(revision?.title, revision?.id);
                setComparison(renderedComparison?.compare['*']);
            } catch (error) {
            }
        };

        fetchMetadata();
    }, [revision?.id, revision?.title]);

    return (
        <div className={styles.reviewCard} style={{ borderColor: score && score > 0.5 ? '#ff4d4d' : '#4caf50' }}>
            <div className={styles.header}>
                <h5 className={styles.title}>{revision?.title}</h5>
                <button onClick={onAcknowledge} className={styles.acknowledgeButton}>✔️ Acknowledge</button>
            </div>
            <div className={styles.content}>
                <div className={styles.details}>
                    <p><span>Comment:</span> {revision?.comment}</p>
                    <p><span>User:</span> {revision?.user}</p>
                    <p><span>Domain:</span> {revision?.meta.domain}</p>
                    <p><span>Namespace:</span> {revision?.namespace}</p>
                    <p><span>Revision:</span> {revision?.id}</p>
                </div>
                {score !== null && (
                    <div className={styles.score}>
                        <p>⚠️ Score: {(score * 100).toFixed(2)}%</p>
                    </div>
                )}
                {comparison && <div className={styles.comparison} dangerouslySetInnerHTML={{ __html: comparison }} />}
            </div>
        </div>
    );
};

export default ReviewCard;
