export function getClass() {
    const items = Array.from(document.querySelectorAll('.item'));
    for (let i in items) {
        if (items[i].querySelector('.new-card')) {
            return items[i].classList[1];
        }
    }
}