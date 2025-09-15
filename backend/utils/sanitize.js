module.exports = function sanitize(input) {
if (!input) return '';
if (typeof input !== 'string') return input;
return input.replace(/<[^>]+>/g, '').trim();
};