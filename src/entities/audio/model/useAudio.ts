import { useCallback, useContext } from "react";
import { AudioContext } from "./provider";

export const useAudio = () => {
    const context = useContext( AudioContext );
    if ( !context ) {
        throw new Error( "useAudio must be used within AudioProvider" );
    }

    const audioFile = context.audioFile;
    const audioUrl = context.audioUrl;

    const setAudio = useCallback(( audioFile: File ) => {
        context.setAudioFile( audioFile );
        context.setAudioUrl( URL.createObjectURL( audioFile ));
    }, [ context.setAudioFile, context.setAudioUrl ]);

    const clearAudio = useCallback(() => {
        context.setAudioFile( null );
        context.setAudioUrl( "" );
    }, [ context.setAudioFile, context.setAudioUrl ]);

    return {
        audioFile,
        audioUrl,
        setAudio,
        clearAudio,
    };
};
