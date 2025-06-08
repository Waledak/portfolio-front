import React from "react";
import {useTranslations} from "next-intl";
import {LoadErrorProps} from "@/components/gallery/types";

const LoadError: React.FC<LoadErrorProps> = ({loadGallery}) => {
    const t = useTranslations("Gallery")
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{t('errorMessage')}</p>
            <button
                aria-label={t('retryLoadData')}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
                onClick={loadGallery}
            >
                {t('retryLoadData')}
            </button>
        </div>
    )
}

export default LoadError