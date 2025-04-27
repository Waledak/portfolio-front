// app/[locale]/[...missing]/page.tsx
import { notFound } from 'next/navigation'

export default function CatchAllInvalidRoutes() {
    notFound()
}
