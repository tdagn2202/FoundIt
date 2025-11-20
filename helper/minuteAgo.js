export function timeAgoMinutesOrHours(isoString) {
    const now = new Date();
    const past = new Date(isoString);

    const diffMs = now - past;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
}
