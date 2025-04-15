import {GalleryResponse, HomePage} from "@/types/strapi.type";

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'

export async function getHomeData(locale = 'en'): Promise<HomePage> {
    try {
        const res = await fetch(`${STRAPI_URL}/api/home-page?populate[0]=profilePicture&populate[1]=skills.tags&populate[2]=photosPreview&populate[3]=contactLink&locale=${locale}`, {
            next: { revalidate: 60 }
        })

        if (!res.ok) {
            console.error('Strapi error:', res.status, await res.text())
            throw new Error('Erreur lors de l’appel à Strapi')
        }

        const data = await res.json()
        return data.data
    } catch (err) {
        console.error('Erreur réseau ou fetch :', err)
        throw err
    }
}


export async function fetchGallery(page = 1, pageSize = 12): Promise<GalleryResponse> {
    const res = await fetch(
        `${STRAPI_URL}/api/photos?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch gallery data: ${res.status}`);
    }

    return await res.json();
}
