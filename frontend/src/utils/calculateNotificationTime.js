export default function calculateNotificationTime(notificationTimeString) {
    const notificationTime = new Date(notificationTimeString); // Convert string to Date object
    const currentDate = new Date(); // Current date and time
    const diff = currentDate.getTime() - notificationTime.getTime(); // Difference in milliseconds

    // Convert milliseconds to days, hours, minutes, and seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Construct the time string based on the calculated values
    let timeString = '';
    if (days > 0) {
        timeString += `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        timeString += `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        timeString += `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        timeString += `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }

    return timeString.trim(); // Remove trailing space
}