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

// Define the structure for each image format detail
export interface FormatDetail {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

// Define the formats object
export interface Formats {
    large?: FormatDetail;
    small?: FormatDetail;
    medium?: FormatDetail;
    thumbnail?: FormatDetail;
}

// Define the structure for the image object
export interface ImageAttributes {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: never | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// Define the structure for each gallery item in the data array
export interface GalleryItem {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: ImageAttributes;
}

export interface ProjectItem {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: ImageAttributes;
    techno: Skill[]
    name: string;
    description: string;
    type: string;

}

// Define the structure for pagination metadata
export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

// Define the overall response structure from Strapi
export interface GalleryResponse {
    data: GalleryItem[];
    meta: {
        pagination: Pagination;
    }
}

export interface ProjectResponse {
    data: ProjectItem[];
    meta: {
        pagination: Pagination;
    }
}