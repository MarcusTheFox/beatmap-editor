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
        customLevels: "/wiki/custom-levels",
        requirements: "/wiki/requirements", 
        editorGuide: "/wiki/editor-guide",
        gameplay: "/wiki/gameplay",
        levelFormat: "/wiki/level-format",
        faq: "/wiki/faq",
    },
}