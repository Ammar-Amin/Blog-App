import React from 'react'
import Logo from '../Logo'

export default function Footer() {
    return (
        <section className="relative mx-auto overflow-hidden py-10 border-t-2 border-slate-700">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 pl-5 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="200px" />
                            </div>
                            <div className='hidden sm:inline-block'>
                                <p className="text-sm text-gray-600">
                                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Features
                                    </span>
                                </li>
                                <li className="mb-4">
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Pricing
                                    </span>
                                </li>
                                <li className="mb-4">
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Affiliate Program
                                    </span>
                                </li>
                                <li>
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Press Kit
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Account
                                    </span>
                                </li>
                                <li className="mb-4">
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Help
                                    </span>
                                </li>
                                <li className="mb-4">
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Contact Us
                                    </span>
                                </li>
                                <li>
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Customer Support
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Terms &amp; Conditions
                                    </span>
                                </li>
                                <li className="mb-4">
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Privacy Policy
                                    </span>
                                </li>
                                <li>
                                    <span
                                        className=" text-base font-medium text-gray-300 hover:text-gray-400"

                                    >
                                        Licensing
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='sm:hidden'>
                        <p className="text-sm text-gray-600">
                            &copy; Copyright 2023. All Rights Reserved by DevUI.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
