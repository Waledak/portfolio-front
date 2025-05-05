// types/strapi.ts

// ── Media (Images/Fichiers) ────────────────────────────────────────────────

export interface StrapiMediaFormat {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: string | null
    size: number
    /** optionnel, seulement si Strapi renvoie sizeInBytes */
    sizeInBytes?: number
    width: number
    height: number
}

export interface StrapiMediaFormats {
    thumbnail?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    large?: StrapiMediaFormat
}

export interface StrapiMedia {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: StrapiMediaFormats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: unknown | null
    createdAt: string
    updatedAt: string
    publishedAt: string
}

// ── Champs Communes Strapi ──────────────────────────────────────────────────

export interface StrapiTimestamps {
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export interface StrapiEntity {
    id: number
    documentId: string
}

// ── Tags, Skills & Contacts ────────────────────────────────────────────────

export interface Tag {
    id: number
    name: string
}

export interface Skill {
    id: number
    name: string
    logo: string
    tags: Tag[]
}

export interface Contact {
    id: number
    name: string
    url: string
    logo: string
}

// ── Galerie ────────────────────────────────────────────────────────────────

export interface GalleryItem extends StrapiEntity, StrapiTimestamps {
    image: StrapiMedia
    order: number
    group: string
}

export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export interface GalleryResponse {
    data: GalleryItem[]
    meta: {
        pagination: Pagination
    }
}

// ── Projets ────────────────────────────────────────────────────────────────

export interface ProjectItem extends StrapiEntity, StrapiTimestamps {
    image: StrapiMedia
    techno: Skill[]
    name: string
    description: string
    type: string
}

export interface ProjectResponse {
    data: ProjectItem[]
    meta: {
        pagination: Pagination
    }
}

// ── Page d’Accueil (Single Type) ───────────────────────────────────────────

export interface HomePage extends StrapiTimestamps {
    id: number
    locale: string
    fullname: string
    baseline: string
    description: string
    profilePicture: StrapiMedia
    skills: Skill[]
    aboutSectionName: string
    aboutMe: string
    skillSectionName: string
    photosPreview: StrapiMedia[]
    contactSectionName: string
    contactDescription: string
    contactLink: Contact[]
    cv: StrapiMedia
}
