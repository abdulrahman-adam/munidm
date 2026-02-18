import React from 'react'
import { assets, footerLinks } from '../assets/assets';

const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24  bg-slate-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="w-34 md:w-32" src={assets.logo} alt="logo" />
                    <p className="max-w-[410px] mt-6">Plus besoin de faire la queue. Parcourez nos rayons virtuels, profitez de nos offres exclusives et recevez vos produits frais en moins de 30 minutes. La révolution de vos courses commence ici.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i} className='font-bold'>
                                       <span className='text-blue-600 font-bold'><i class="bi bi-tiktok"></i></span> <a href={link.url} className="hover:underline transition">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-blue-500/80">
                Copyright {new Date().getFullYear()} © <a href="https://ayacodia.com">AYACODIA</a> Tous droits réservés.
            </p>
        </div>
    );
}

export default Footer
