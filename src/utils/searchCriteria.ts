
export interface Revision {
    id: number;
    title: string;
    comment: string;
    user: string;
    namespace: number;
    meta: {
        uri: string;
        request_id: string;
        id: string;
        dt: string;
        domain: string;
        stream: string;
        topic: string;
        partition: number;
        offset: number;
    };
    type: string;
    title_url: string;
    timestamp: number;
    bot: boolean;
    minor: boolean;
    patrolled: boolean;
    length: {
        new: number;
        old: number;
    };
    revision_new: number;
    revision_old: number;
    notify_url: string;
    server_url: string;
    server_name: string;
    server_script_path: string;
    wiki: string;
}


export interface SearchCriteria {
    domain: string;
    namespace: string;
    user: string;
}
