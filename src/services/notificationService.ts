export const requestNotificationPermission = async () => {
    if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
    }
};

export const notifyUser = (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
        new Notification(title, options);
    }
};

export const playSound = () => {
    const audio = new Audio('/notification-sound.wav');
    audio.play().catch(error => console.error("Failed to play sound:", error));
};
