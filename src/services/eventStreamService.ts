import { EventSourcePolyfill } from 'event-source-polyfill';

class EventStream {
    private eventSource: EventSource | null = null;
    private listeners: ((event: any) => void)[] = [];
    private paused: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            this.eventSource = new EventSourcePolyfill('https://stream.wikimedia.org/v2/stream/recentchange');
            this.eventSource.onmessage = this.handleMessage.bind(this);
        }
    }

    private handleMessage(event: MessageEvent) {
        if (this.paused) return;
        const data = JSON.parse(event.data);
        this.listeners.forEach(listener => listener(data));
    }

    public add(listener: (event: any) => void) {
        this.listeners.push(listener);
    }

    public remove(listener: (event: any) => void) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    public pause() {
        this.paused = true;
    }

    public resume() {
        this.paused = false;
    }
}

const eventStreamService = new EventStream();
export default eventStreamService;
