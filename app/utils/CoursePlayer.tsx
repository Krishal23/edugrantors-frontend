import React, { FC } from 'react';
import { useTheme } from 'next-themes';

type Props = {
    videoUrl: string; // Expecting a video URL (could be YouTube, Vimeo, Google Drive, etc.)
    title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
    const { theme } = useTheme();

    // Function to extract the video ID from different video URLs
    const extractVideoId = (url: string) => {
        // Regex for YouTube (both regular, live, and embedded)
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|live\/)([a-zA-Z0-9_-]{11}))|(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        // Regex for Vimeo
        const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:[^\s]+)\/([0-9]+)/;
        // Regex for Google Drive
        const googleDriveRegex = /(?:https?:\/\/)?(?:www\.)?drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;

        let match;
        // Check for YouTube video ID
        if ((match = url.match(youtubeRegex))) {
            return { platform: 'youtube', id: match[1] || match[2] }; // Match either of the two possible video ID groups
        }
        // Check for Vimeo video ID
        if ((match = url.match(vimeoRegex))) {
            return { platform: 'vimeo', id: match[1] };
        }
        // Check for Google Drive video ID
        if ((match = url.match(googleDriveRegex))) {
            return { platform: 'googleDrive', id: match[1] };
        }
        return null;
    };

    const videoData = extractVideoId(videoUrl); // Extract video data (ID and platform)
    const { platform, id } = videoData || {};

    // Construct embed URL based on platform and video type (live or regular)
    const embedUrl =
        platform === 'youtube'
            ? `https://www.youtube.com/embed/${id}?autoplay=1&live=1`  // Use live=1 for live streams
            : platform === 'vimeo'
            ? `https://player.vimeo.com/video/${id}`
            : platform === 'googleDrive'
            ? `https://drive.google.com/file/d/${id}/preview`
            : '';

    // Define dynamic styles based on theme
    const containerClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
    // const titleClass = theme === 'dark' ? 'text-white' : 'text-gray-800';

    return (
        <div className={`rounded-lg overflow-hidden shadow-2xl p-6 max-w-xl mx-auto transform transition duration-500 hover:scale-105 ${containerClass}`}>
            {/* <h2 className={`text-2xl font-semibold ${titleClass}`}>{title}</h2> */}
            <div className="relative w-full sm:h-64 h-36 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                {platform && id ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl}
                        title={`${platform} video player`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                ) : (
                    <p className="text-red-500 text-center">Invalid video URL</p>
                )}
            </div>
        </div>
    );
};

export default CoursePlayer;
