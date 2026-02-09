export const getURIFromFileName = ( file: File ) => {
    return getURIFromString( file.name.replace( /\.[^/.]+$/, "" ));
};

export const getURIFromString = ( value: string ) => {
    return decodeURIComponent( value.replace( / /g, "_" ));
};
