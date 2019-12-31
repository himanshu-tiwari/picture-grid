export const isObject = obj => Boolean(obj && typeof(obj) === "object");

export const isNonEmptyArray = (arr) => Boolean(
    isObject(arr) &&
    arr instanceof Array &&
    arr.length > 0
);

export const isNonEmptyString = str => Boolean(
    typeof(str) === "string" &&
    str.length > 0
);

export const isJsonParsable = string => {
    try {
        return isObject(JSON.parse(string));
    } catch (err) {
        return false;
    }
};