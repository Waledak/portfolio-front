import {GalleryResponse, HomePage, ProjectResponse} from "@/types/strapi.type";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function getHomeData(locale = 'en'): Promise<HomePage> {
    try {
        const res = await fetch(`${STRAPI_URL}/api/home-page?populate[0]=profilePicture&populate[1]=skills.tags&populate[2]=photosPreview&populate[3]=contactLink&populate[4]=cv&locale=${locale}`, {
            next: { revalidate: 60 }
        })

        if (!res.ok) {
            console.error('Strapi error:', res.status, await res.text())
            throw new Error('Erreur lors de l’appel à Strapi')
        }

        const data = await res.json()
        console.log(data)
        return data.data
    } catch (err) {
        console.error('Erreur réseau ou fetch :', err)
        throw err
    }
}


export async function fetchGallery(page = 1, pageSize = 12): Promise<GalleryResponse> {
    const res = await fetch(
        `${STRAPI_URL}/api/photos?populate=*&sort=rank&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch gallery data: ${res.status}`);
    }

    return await res.json();
}

export async function fetchProjects(locale = 'en'): Promise<ProjectResponse> {
    const res = await fetch(
        `${STRAPI_URL}/api/projects?populate[0]=image&populate[1]=techno.tags&locale=${locale}&sort=startDate:Desc`,
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch project data: ${res.status}`);
    }

    return await res.json();
}
