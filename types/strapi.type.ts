// types/strapi.ts

export interface StrapiImageFormat {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path?: string | null
    size: number
    width: number
    height: number
}

export interface StrapiImage {
    id: number
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
        thumbnail?: StrapiImageFormat
        small?: StrapiImageFormat
        medium?: StrapiImageFormat
        large?: StrapiImageFormat
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl?: string | null
    provider: string
    createdAt: string
    updatedAt: string
}

export interface Tags {
    id: number
    name: string
}

export interface Skill {
    id: number
    name: string
    logo: string
    tags: Tags[]
}
export interface Contact{
    id: number
    name: string
    url: string
    logo: string
}
export interface HomePage {
    id: number
    fullname: string
    baseline: string
    description: string
    locale: string
    profilePicture: StrapiImage
    skills: Skill[]
    createdAt: string
    updatedAt: string
    publishedAt: string
    aboutSectionName: string
    aboutMe: string
    skillSectionName: string
    photosPreview: StrapiImageFormat[]
    contactSectionName: string
    contactDescription: string
    contactLink: Contact[]
}
