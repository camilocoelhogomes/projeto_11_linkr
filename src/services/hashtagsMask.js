export default function hashtagsToLowerCase(text) {
    const rule = /([#|＃][^\s]+)/g;
    const newText = text.split(rule).map(chunk => {
        if (chunk.match(rule)) {
            return chunk.toLowerCase();
        }
        return chunk;
    });
    return newText.join("");
}