export const getURIFromFileName = (file: File) => {
    return getURIFromString(file.name.replace(/\.[^/.]+$/, ""));
}

export const getURIFromString = (value: String) => {
    return decodeURIComponent(value.replace(/ /g, '_'));
}