export default function debounce(callback, wait) {
    let isActiveTimeout = false;

    let timeout = null;

    return (...args) => {
        if (isActiveTimeout) {
            clearTimeout(timeout);
        } else {
            isActiveTimeout = true;
        }

        timeout = setTimeout(() => {
            callback(...args)
        }, wait)
    }
}