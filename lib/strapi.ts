import {GalleryResponse, HomePage, ProjectResponse} from "@/types/strapi.type";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Generic function to fetch data from Strapi API
 * @param endpoint - API endpoint path
 * @param params - Query parameters
 * @returns Promise with the fetched data
 */
async function fetchApi<T>(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<T> {
    // Build query string from params
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Strapi API error (${endpoint}):`, res.status, errorText);
            throw new Error(`Failed to fetch data from ${endpoint}: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Fetch home page data
 * @param locale - Language locale (default: 'fr')
 * @returns Promise with HomePage data
 */
export async function getHomeData(locale = 'fr'): Promise<HomePage> {
    const response = await fetchApi<{data: HomePage}>('home-page', {
        'populate[0]': 'profilePicture',
        'populate[1]': 'skills.tags',
        'populate[2]': 'photosPreview',
        'populate[3]': 'contactLink',
        'populate[4]': 'cv',
        'populate[5]': 'additionalFiles',
        'populate[6]': 'additionalFiles.file',
        locale
    });

    return response.data;
}

/**
 * Fetch gallery data
 * @param page - Page number (default: 1)
 * @param pageSize - Number of items per page (default: 12)
 * @returns Promise with GalleryResponse data
 */
export async function fetchGallery(page = 1, pageSize = 12): Promise<GalleryResponse> {
    return await fetchApi<GalleryResponse>('photos', {
        'populate': '*',
        'sort': 'rank',
        'pagination[page]': page,
        'pagination[pageSize]': pageSize
    });
}

/**
 * Fetch projects data
 * @param locale - Language locale (default: 'fr')
 * @returns Promise with ProjectResponse data
 */
export async function fetchProjects(locale = 'fr'): Promise<ProjectResponse> {
    return await fetchApi<ProjectResponse>('projects', {
        'populate[0]': 'image',
        'populate[1]': 'techno.tags',
        locale,
        'sort': 'startDate:Desc'
    });
}
