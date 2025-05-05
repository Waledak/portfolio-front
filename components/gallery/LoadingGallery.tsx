import React from "react";
import {useTranslations} from "next-intl";
import {GallerySkeleton} from "@/components/gallery/index";

const LoadingGallery = () => {
    const t = useTranslations("Gallery")

    return (
        <div className="p-5 my-5 w-11/12 sm:w-10/12 md:w-4/6 2xl:w-3/6 mx-auto bg-base-100 rounded-3xl">
            <h1 className="m-5 text-3xl sm:text-4xl " id="galleryTitle">{t("title")}</h1>
            <GallerySkeleton />
        </div>
    )
}

export default LoadingGallery