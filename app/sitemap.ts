import { MetadataRoute } from "next";
import { paths } from "@/config/paths";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://beamandbeat.com";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${ baseUrl }${ paths.download }`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${ baseUrl }${ paths.editor.root }`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${ baseUrl }${ paths.wiki.root }`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${ baseUrl }${ paths.wiki.installation }`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${ baseUrl }${ paths.wiki.editorGuide }`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${ baseUrl }${ paths.wiki.customLevels }`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${ baseUrl }${ paths.wiki.gameplay }`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${ baseUrl }${ paths.wiki.requirements }`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${ baseUrl }${ paths.wiki.levelFormat }`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${ baseUrl }${ paths.wiki.faq }`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ];
}
