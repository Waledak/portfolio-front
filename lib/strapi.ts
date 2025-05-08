import {GalleryResponse, HomePage, ProjectResponse} from "@/types/strapi.type";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * API request options with caching configuration
 */
interface ApiRequestOptions {
    /** Query parameters for the API request */
    params?: Record<string, string | number | boolean>;
    /** Cache control options */
    cache?: RequestCache;
    /** Revalidation time in seconds */
    revalidate?: number;
}

/**
 * API error class for better error handling
 */
export class ApiError extends Error {
    status: number;
    endpoint: string;

    constructor(message: string, status: number, endpoint: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.endpoint = endpoint;
    }
}

/**
 * Generic function to fetch data from Strapi API
 * @param endpoint - API endpoint path
 * @param options - Request options including params, cache settings, and revalidation
 * @returns Promise with the fetched data
 */
async function fetchApi<T>(
    endpoint: string, 
    options: ApiRequestOptions = {}
): Promise<T> {
    const { params = {}, cache = 'force-cache', revalidate } = options;

    // Build query string from params
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

    try {
        const fetchOptions: RequestInit = {
            cache,
            next: revalidate ? { revalidate } : undefined
        };

        const res = await fetch(url, fetchOptions);

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Strapi API error (${endpoint}):`, res.status, errorText);
            throw new ApiError(
                `Failed to fetch data from ${endpoint}: ${res.status}`, 
                res.status, 
                endpoint
            );
        }

        const data = await res.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.error(`Error fetching from ${endpoint}:`, error);
        throw new ApiError(
            `Error fetching from ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`,
            500,
            endpoint
        );
    }
}

/**
 * Fetch home page data
 * @param locale - Language locale (default: 'fr')
 * @param options - Cache and revalidation options
 * @returns Promise with HomePage data
 */
export async function getHomeData(
    locale = 'fr', 
    options: Omit<ApiRequestOptions, 'params'> = {}
): Promise<HomePage> {
    const response = await fetchApi<{data: HomePage}>('home-page', {
        ...options,
        params: {
            'populate[0]': 'profilePicture',
            'populate[1]': 'skills.tags',
            'populate[2]': 'photosPreview',
            'populate[3]': 'contactLink',
            'populate[4]': 'cv',
            'populate[5]': 'additionalFiles',
            'populate[6]': 'additionalFiles.file',
            locale
        }
    });

    return response.data;
}

/**
 * Fetch gallery data
 * @param page - Page number (default: 1)
 * @param pageSize - Number of items per page (default: 12)
 * @param options - Cache and revalidation options
 * @returns Promise with GalleryResponse data
 */
export async function fetchGallery(
    page = 1, 
    pageSize = 12, 
    options: Omit<ApiRequestOptions, 'params'> = {}
): Promise<GalleryResponse> {
    return await fetchApi<GalleryResponse>('photos', {
        ...options,
        params: {
            'populate': '*',
            'sort': 'rank',
            'pagination[page]': page,
            'pagination[pageSize]': pageSize
        }
    });
}

/**
 * Fetch projects data
 * @param locale - Language locale (default: 'fr')
 * @param options - Cache and revalidation options
 * @returns Promise with ProjectResponse data
 */
export async function fetchProjects(
    locale = 'fr', 
    options: Omit<ApiRequestOptions, 'params'> = {}
): Promise<ProjectResponse> {
    return await fetchApi<ProjectResponse>('projects', {
        ...options,
        params: {
            'populate[0]': 'image',
            'populate[1]': 'techno.tags',
            locale,
            'sort': 'startDate:Desc'
        }
    });
}
