import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/*?_ym_*",
                "/*&_ym_*",
                "/editor/song/",
                "/editor/not-found",
            ],
        },
        sitemap: "https://beamandbeat.com/sitemap.xml",
    };
}
