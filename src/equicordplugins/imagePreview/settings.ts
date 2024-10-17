/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

const settings = definePluginSettings({
    messageImages: {
        type: OptionType.BOOLEAN,
        description: "Enable Message Images Hover Detection",
        default: true,
        restartNeeded: true,
    },
    messageAvatars: {
        type: OptionType.BOOLEAN,
        description: "Enable Message Avatars Hover Detection",
        default: true,
        restartNeeded: true,
    },
    messageLinks: {
        type: OptionType.BOOLEAN,
        description: "Enable Message Links Hover Detection",
        default: true,
        restartNeeded: true,
    },
    messageStickers: {
        type: OptionType.BOOLEAN,
        description: "Enable Message Stickers Hover Detection",
        default: true,
        restartNeeded: true,
    },
    mouseOnlyMode: {
        type: OptionType.BOOLEAN,
        description: "Allows you to skip having to hold control to zoom in and move images",
        default: false
    },
    hoverDelay: {
        type: OptionType.SLIDER,
        description: "Delay in seconds before the image preview appears",
        default: 0.5,
        markers: [0, 1, 2, 3, 4, 5],
    },
    zoomFactor: {
        type: OptionType.SLIDER,
        description: "Speed at which the image zooms in",
        default: 1.5,
        markers: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    },
});

const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
};

function getMimeType(extension: string | undefined): [boolean, string] {
    if (!extension) return [false, ""];

    const lowerExt = extension.trim().toLowerCase();
    return [!!mimeTypes[lowerExt], mimeTypes[lowerExt] || ""];
}

function isLinkAnImage(url: string) {
    const extension = url.split(".").pop();
    const [isImage,] = getMimeType(extension);
    return isImage;
}

function stripDiscordParams(url: string) {
    let newUrl = url.replace(/([?&])(width|size|height|h|w)=[^&]+/g, "");

    newUrl = newUrl.replace(/([?&])quality=[^&]*/g, "$1quality=lossless");

    newUrl = newUrl.replace(/([?&])+$/, "")
        .replace(/\?&/, "?")
        .replace(/\?$/, "")
        .replace(/&{2,}/g, "&");

    if (newUrl.includes("quality=lossless") && !newUrl.includes("?")) {
        newUrl = newUrl.replace(/&quality=lossless/, "?quality=lossless");
    }

    return newUrl;
}

export { getMimeType, isLinkAnImage, settings, stripDiscordParams };
