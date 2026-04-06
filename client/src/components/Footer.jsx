import React from 'react';
import { assets, footerLinks } from '../assets/assets';

const Footer = () => {
    return (
        <footer className="w-full bg-slate-50 border-t border-gray-200">
            {/* Conteneur principal avec padding adaptatif */}
            <div className="max-w-[1440px] mx-auto px-6 py-12 md:px-16 lg:px-24 xl:px-32">
                
                <div className="flex flex-col lg:flex-row justify-between gap-12">
                    
                    {/* Section 1: Logo et Description */}
                    <div className="flex-1 max-w-md">
                        <a href="/" className="text-3xl font-extrabold text-blue-600 tracking-tighter">
                            MUNIDM
                        </a>
                        <p className="mt-6 text-gray-600 leading-relaxed">
                            Plus besoin de faire la queue. Parcourez nos rayons virtuels, profitez de nos offres exclusives et recevez vos produits frais en moins de 30 minutes. La révolution de vos courses commence ici.
                        </p>
                        
                        {/* Réseaux Sociaux */}
                        <div className="flex gap-4 mt-8">
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <i className="bi bi-tiktok"></i>
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                        </div>
                    </div>

                    {/* Section 2: Liens Dynamiques (Grid responsive) */}
                    <div className="flex-[1.5] grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {footerLinks.map((section, index) => (
                            <div key={index} className="flex flex-col">
                                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-6">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, i) => (
                                        <li key={i} className="group flex items-center gap-2">
                                            {/* Icône dynamique basée sur le texte ou par défaut */}
                                            <span className="text-blue-500 group-hover:translate-x-1 transition-transform duration-200">
                                                <i className={`bi ${getIcon(link.text)}`}></i>
                                            </span>
                                            <a 
                                                href={link.url} 
                                                className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Barre de Copyright */}
                <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        Copyright {new Date().getFullYear()} © <span className="font-bold text-blue-600 underline cursor-pointer">MUNIDM</span>. Tous droits réservés.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-gray-700">Confidentialité</a>
                        <a href="#" className="hover:text-gray-700">Conditions</a>
                        <a href="#" className="hover:text-gray-700">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

/**
 * Fonction utilitaire pour assigner des icônes selon le nom du lien
 * (À adapter selon vos besoins)
 */
const getIcon = (text) => {
    const linkName = text.toLowerCase();
    if (linkName.includes('accueil') || linkName.includes('home')) return 'bi-house-door';
    if (linkName.includes('contact')) return 'bi-envelope';
    if (linkName.includes('produit') || linkName.includes('shop')) return 'bi-bag';
    if (linkName.includes('compte') || linkName.includes('profile')) return 'bi-person';
    if (linkName.includes('aide') || linkName.includes('help')) return 'bi-question-circle';
    if (linkName.includes('propos') || linkName.includes('about')) return 'bi-info-circle';
    return 'bi-chevron-right'; // Icône par défaut
};

export default Footer;