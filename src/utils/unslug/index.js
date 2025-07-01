export default function unslug(str) {
    return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
