import { redirect } from 'next/navigation'

export default function CatchAllWithinLang({ params }: { params: { lang: string } }) {
    redirect(`/${params.lang}`)
}
