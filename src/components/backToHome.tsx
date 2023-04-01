import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function BackToHome() {
    return (
        <>
        <Link href="/">
            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1245px-Twitter-logo.svg.png"}
                alt="Back to home"
                className="absolute w-20 top-4 left-4"
            />
        </Link>
        </>
    )
}
