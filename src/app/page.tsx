"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import eventStreamService from '../services/eventStreamService';
import ReviewCard from '../components/ReviewCard';
import SearchFilters from '../components/SearchFilters';
import styles from './dashboard.module.css';
import { Revision, SearchCriteria } from '../utils/searchCriteria';
import { VariableSizeList as List } from 'react-window';
import { requestNotificationPermission, notifyUser, playSound } from '../services/notificationService';
import { saveSearchCriteria, loadSearchCriteria } from '../services/searchCriteriaService';

const Dashboard: React.FC = () => {
    const [revisions, setRevisions] = useState<Revision[]>([]);
    const [seenRevisions, setSeenRevisions] = useState<Set<number>>(new Set());
    const [criteria, setCriteria] = useState<any>(loadSearchCriteria());
    const [isPaused, setIsPaused] = useState(false);
    const bufferRef = useRef<Revision[]>([]);
    const listRef = useRef<List>(null);

    useEffect(() => {
        requestNotificationPermission().then(result => console.log(result));

        if (typeof window !== 'undefined') {
            const handleEvent = (event: any) => {
                bufferRef.current.push(event);
            };

            eventStreamService.add(handleEvent);
            const intervalId = setInterval(() => {
                if (bufferRef.current.length > 0) {
                    setRevisions(prevRevisions => [...bufferRef.current, ...prevRevisions].slice(0, 100));
                    bufferRef.current = [];
                    if (listRef.current) {
                        listRef.current.resetAfterIndex(0, true);
                    }

                    bufferRef.current.forEach((revision) => {
                        if (criteria.domain && revision.meta.domain.includes(criteria.domain)) {
                            notifyUser(`Revision on ${revision.title}`, { body: revision.comment });
                            playSound();
                        }
                    });
                }
            }, 1000);

            return () => {
                eventStreamService.remove(handleEvent);
                clearInterval(intervalId);
            };
        }
    }, [criteria]);

    const markAsSeen = (id: number) => {
        setSeenRevisions(prevSeenRevisions => {
            const newSet = new Set(prevSeenRevisions);
            newSet.add(id);
            return newSet;
        });
    };

    const filteredRevisions = revisions.filter(revision => {
        return (
            !seenRevisions.has(revision.id) &&
            (!criteria.domain || revision.meta.domain.includes(criteria.domain)) &&
            (!criteria.namespace || revision.namespace.toString() === criteria.namespace) &&
            (!criteria.user || revision.user.includes(criteria.user))
        );
    });

    const toggleStream = () => {
        if (isPaused) {
            eventStreamService.resume();
        } else {
            eventStreamService.pause();
        }
        setIsPaused(!isPaused);
    };

    const handleCriteriaChange = (newCriteria: SearchCriteria) => {
        setCriteria(newCriteria);
        saveSearchCriteria(newCriteria);
    };

    const getItemSize = useCallback(() => 350, []);

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.title}>Wikimedia Monitor</h1>
            <SearchFilters criteria={criteria} onCriteriaChange={handleCriteriaChange} />
            <button className={styles.toggleButton} onClick={toggleStream}>{isPaused ? 'Resume' : 'Pause'} Stream</button>
            <div className={styles.revisions}>
                <List
                    ref={listRef}
                    height={600}
                    itemCount={filteredRevisions.length}
                    itemSize={getItemSize}
                    width={'100%'}
                >
                    {({ index, style }) => {
                        const revision = filteredRevisions[index];
                        return (
                            <div key={revision.id} style={{ ...style, display: 'flex', justifyContent: 'center' }}>
                                <ReviewCard revision={revision} onAcknowledge={() => markAsSeen(revision?.id)} />
                            </div>
                        );
                    }}
                </List>
            </div>
        </div>
    );
};

export default Dashboard;
