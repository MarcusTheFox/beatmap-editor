"use client";

import { useAudio } from "@/src/entities/audio";
import { useTimelineSettings } from "@/src/entities/level";
import { useBeatInput, usePlaybackControls, useTimelineState } from "@/src/entities/wavesurfer/model";
import { useRef } from "react";
import { Label } from "@/src/shared/ui";
import { convertTimeToBeats, formatTime } from "@/src/shared/lib";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Icon20ChevronLeft, Icon20ChevronLeft2, Icon20ChevronRight, Icon20ChevronRight2, Icon24ChevronLeftSquareOutline, Icon24ChevronRightSquareOutline, Icon24Pause, Icon24Play } from "@vkontakte/icons";
import { WaveSurferComponent, WaveSurferComponentRef } from "@/src/entities/wavesurfer";
import { useTimelineContext } from "../model/context";
import { useNote } from "@/src/entities/note";
import { createKeyboardShortcut, createWheelShortcut, useShortcuts } from "@/src/shared/lib/utils/hotkeys";

export function TimelineSection() {
    const { controls, setControls, currentTime, setCurrentTime, isPlaying, setIsPlaying } = useTimelineContext();
    const { timelineSettings: { bpm, offset } } = useTimelineSettings();
    const { audioUrl } = useAudio();
    const beatInput = useBeatInput( controls );
    const { nextBeat, playPause, prevBeat, toEnd, toStart, toStep, toBeat, getDuration } = usePlaybackControls( controls );
    const { loading, onPlayPause, onReady, onTimeUpdate } = useTimelineState({ setControls, setCurrentTime, setIsPlaying });
    const { find, findLast } = useNote();

    const waveSurferRef = useRef<WaveSurferComponentRef>( null );
    const cardRef = useRef<HTMLDivElement>( null );

    const handleWaveSurferReady = () => {
        const newControls = waveSurferRef.current?.getControls();
        if ( !newControls ) return;
        onReady( newControls );
    };

    const handlePreviousNote = () => {
        const currentBeat = convertTimeToBeats( currentTime, bpm, offset );
        const previousNote = findLast( 0, currentBeat - 0.001 );
        if ( previousNote ) {
            toBeat( previousNote.beat );
        }
    };

    const handleNextNote = () => {
        const currentBeat = convertTimeToBeats( currentTime, bpm, offset );
        const nextNote = find( currentBeat + 0.001, getDuration());
        if ( nextNote ) {
            toBeat( nextNote.beat );
        }
    };

    useShortcuts([
        createKeyboardShortcut([ "Space" ], playPause ),
        createKeyboardShortcut([ "Home" ], toStart ),
        createKeyboardShortcut([ "End" ], toEnd ),
        createKeyboardShortcut([ "A" ], prevBeat ),
        createKeyboardShortcut([ "D" ], nextBeat ),
        createKeyboardShortcut([ "Ф" ], prevBeat ),
        createKeyboardShortcut([ "В" ], nextBeat ),
        createKeyboardShortcut([ "ArrowLeft" ], prevBeat ),
        createKeyboardShortcut([ "ArrowRight" ], nextBeat ),
        createKeyboardShortcut([ "Shift", "A" ], () => toStep( -0.5 )),
        createKeyboardShortcut([ "Shift", "D" ], () => toStep( 0.5 )),
        createKeyboardShortcut([ "Ctrl", "A" ], () => toStep( -0.25 )),
        createKeyboardShortcut([ "Ctrl", "D" ], () => toStep( 0.25 )),
        createKeyboardShortcut([ "Alt", "A" ], () => toStep( -0.125 )),
        createKeyboardShortcut([ "Alt", "D" ], () => toStep( 0.125 )),
        createKeyboardShortcut([ "Shift", "Ф" ], () => toStep( -0.5 )),
        createKeyboardShortcut([ "Shift", "В" ], () => toStep( 0.5 )),
        createKeyboardShortcut([ "Ctrl", "Ф" ], () => toStep( -0.25 )),
        createKeyboardShortcut([ "Ctrl", "В" ], () => toStep( 0.25 )),
        createKeyboardShortcut([ "Alt", "Ф" ], () => toStep( -0.125 )),
        createKeyboardShortcut([ "Alt", "В" ], () => toStep( 0.125 )),
        createKeyboardShortcut([ "Shift", "ArrowLeft" ], () => toStep( -0.5 )),
        createKeyboardShortcut([ "Shift", "ArrowRight" ], () => toStep( 0.5 )),
        createKeyboardShortcut([ "Ctrl", "ArrowLeft" ], () => toStep( -0.25 )),
        createKeyboardShortcut([ "Ctrl", "ArrowRight" ], () => toStep( 0.25 )),
        createKeyboardShortcut([ "Alt", "ArrowLeft" ], () => toStep( -0.125 )),
        createKeyboardShortcut([ "Alt", "ArrowRight" ], () => toStep( 0.125 )),
        createKeyboardShortcut([ "Ctrl", "Shift", "A" ], handlePreviousNote ),
        createKeyboardShortcut([ "Ctrl", "Shift", "D" ], handleNextNote ),
        createKeyboardShortcut([ "Ctrl", "Shift", "Ф" ], handlePreviousNote ),
        createKeyboardShortcut([ "Ctrl", "Shift", "В" ], handleNextNote ),
        createKeyboardShortcut([ "Ctrl", "Shift", "ArrowLeft" ], handlePreviousNote ),
        createKeyboardShortcut([ "Ctrl", "Shift", "ArrowRight" ], handleNextNote ),
    ]);

    useShortcuts([
        createWheelShortcut( "up", nextBeat ),
        createWheelShortcut( "down", prevBeat ),
        createWheelShortcut( "up", () => toStep( 0.5 ), { shift: true }),
        createWheelShortcut( "down", () => toStep( -0.5 ), { shift: true }),
        createWheelShortcut( "up", () => toStep( 0.25 ), { ctrl: true }),
        createWheelShortcut( "down", () => toStep( -0.25 ), { ctrl: true }),
        createWheelShortcut( "up", () => toStep( 0.125 ), { alt: true }),
        createWheelShortcut( "down", () => toStep( -0.125 ), { alt: true }),
        createWheelShortcut( "up", handleNextNote, { shift: true, ctrl: true }),
        createWheelShortcut( "down", handlePreviousNote, { shift: true, ctrl: true }),
    ]);

    const beatLabel = (
        <Label className="w-48" onClick={ beatInput.handleDisplayClick }>
            Бит: { convertTimeToBeats( currentTime, bpm, offset ).toFixed( 3 ) }
        </Label>
    );

    const beatForm = (
        <form onSubmit={ beatInput.handleSubmit }>
            <Input
                ref={ beatInput.inputRef }
                className="max-w-48"
                min={ 0 }
                startContent="Бит:"
                step={ 0.001 }
                type="number"
                value={ beatInput.inputValue }
                variant="faded"
                onBlur={ beatInput.handleInputBlur }
                onValueChange={ ( v ) => beatInput.setInputValue( v ) }
            />
        </form>
    );

    const timelineHeader = (
        <CardHeader className="flex pb-0 px-8">
            <div className="flex gap-2 w-full">
                <Label className="w-48">Время: { formatTime( currentTime ) }</Label>
                { beatInput.isEditing ? beatForm : beatLabel }
            </div>

            <div className="flex gap-2 justify-center w-full">
                <Button isIconOnly preventFocusOnPress disabled={ loading } onClickCapture={ toStart }>
                    <Icon20ChevronLeft2 />
                </Button>

                <Button isIconOnly preventFocusOnPress disabled={ loading } onClickCapture={ prevBeat }>
                    <Icon20ChevronLeft />
                </Button>

                <Button isIconOnly preventFocusOnPress disabled={ loading } onClickCapture={ handlePreviousNote }>
                    <Icon24ChevronRightSquareOutline scale={ 20 } />
                </Button>

                <Button isIconOnly
                    preventFocusOnPress
                    color={ isPlaying ? "primary" : "default" }
                    disabled={ loading }
                    onClickCapture={ playPause }
                >
                    { isPlaying ? <Icon24Pause /> : <Icon24Play /> }
                </Button>

                <Button isIconOnly preventFocusOnPress disabled={ loading } onClickCapture={ handleNextNote }>
                    <Icon24ChevronLeftSquareOutline scale={ 20 } />
                </Button>

                <Button isIconOnly preventFocusOnPress disabled={ loading } onClickCapture={ nextBeat }>
                    <Icon20ChevronRight />
                </Button>

                <Button isIconOnly preventFocusOnPress disabled={ loading } onClickCapture={ toEnd }>
                    <Icon20ChevronRight2 />
                </Button>
            </div>

            <div className="w-full" />
        </CardHeader>
    );

    return (
        <div>
            <Card
                ref={ cardRef }
                className="rounded-none bg-transparent border-t-1 border-t-default-200 shadow-none"
                id="timeline-container"
            >
                { !loading && controls && timelineHeader }

                <CardBody className="px-0 overflow-hidden">
                    <WaveSurferComponent
                        ref={ waveSurferRef }
                        audioUrl={ audioUrl }
                        bpm={ bpm }
                        offset={ offset }
                        onControlsUpdate={ setControls }
                        onPause={ () => onPlayPause( false ) }
                        onPlay={ () => onPlayPause( true ) }
                        onReady={ handleWaveSurferReady }
                        onTimeUpdate={ onTimeUpdate }
                    />
                </CardBody>
            </Card>
        </div>
    );
}
