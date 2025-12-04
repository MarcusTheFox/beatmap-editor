export type PathsConfig = typeof paths;

export const paths = {
    root: "/",
    editor: {
        root: "/editor",
        song: (song: string) => ({
            root: `/editor/song/${song}`,
            details: `/editor/song/${song}/details`,
        }),
        notFound: "/editor/not-found",
    },
    download: "/download",
    wiki: {
        root: "/wiki",
        installation: "/wiki/installation",
        editorGuide: "/wiki/editor-guide",
        beatmappingTips: "/wiki/beatmapping-tips",
        levelFormat: "/wiki/level-format",
    },
}