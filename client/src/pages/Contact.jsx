import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', telephone: '', message: '' });

    const validateForm = () => {
        const { name, email, telephone, message } = formData;
        const nameRegex = /^[a-zA-Z]{2,}\s+[a-zA-Z]{2,}/;
        const phoneRegex = /^[0-9+]{8,15}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(name)) {
            toast.error("Veuillez entrer votre Prénom et Nom.");
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error("Email invalide.");
            return false;
        }
        if (!phoneRegex.test(telephone)) {
            toast.error("Téléphone invalide.");
            return false;
        }
        if (message.length < 10) {
            toast.error("Message trop court.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const { data } = await axios.post('/api/contact/send', formData);
            if (data.success) {
                toast.success(data.message);
                setFormData({ name: '', email: '', telephone: '', message: '' });
            }
        } catch (error) {
            toast.error("Erreur serveur.");
        }
    };

    return (
        // <div className="max-w-7xl mx-auto my-12 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-32">
                
                {/* --- GAUCHE : INFOS & MAP --- */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 mb-4">Contactez-nous</h2>
                        <p className="text-gray-500">Besoin d'aide ? Nos experts vous répondent sous 24h.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Téléphone avec lien direct */}
                        <a href="tel:+33123456789" className="flex items-center gap-4 group">
                            <i className="bi bi-telephone text-2xl text-indigo-600"></i>
                            <span className="text-lg font-medium group-hover:text-indigo-600 transition">+33 1 23 45 67 89</span>
                        </a>

                        {/* Email avec lien direct */}
                        <a href="mailto:contact@votre-boutique.com" className="flex items-center gap-4 group">
                            <i className="bi bi-envelope text-2xl text-indigo-600"></i>
                            <span className="text-lg font-medium group-hover:text-indigo-600 transition">contact@votre-boutique.com</span>
                        </a>

                        {/* Adresse avec icône */}
                        <div className="flex items-start gap-4">
                            <i className="bi bi-geo-alt text-2xl text-indigo-600"></i>
                            <span className="text-lg font-medium">123 Rue du Commerce, 75001 Paris</span>
                        </div>
                    </div>

                    {/* Google Maps Iframe */}
                    <div className="w-full h-64 rounded-2xl overflow-hidden border border-gray-200">
                        <iframe 
                            title="location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926156743895!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca97ef005232a!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1625123456789!5m2!1sfr!2sfr" 
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* --- DROITE : FORMULAIRE --- */}
                <div className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 ml-1">Nom Complet</label>
                                <input type="text" placeholder="Prénom Nom" className="w-full p-4 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm"
                                onChange={(e)=>setFormData({...formData, name: e.target.value})} value={formData.name} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-600 ml-1">Email</label>
                                <input type="email" placeholder="email@domaine.com" className="w-full p-4 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm"
                                onChange={(e)=>setFormData({...formData, email: e.target.value})} value={formData.email} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">Téléphone</label>
                            <input type="tel" placeholder="+33 1 23 45 67 89" className="w-full p-4 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm"
                            onChange={(e)=>setFormData({...formData, telephone: e.target.value})} value={formData.telephone} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 ml-1">Message</label>
                            <textarea rows="5" placeholder="Décrivez votre besoin..." className="w-full p-4 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm resize-none"
                            onChange={(e)=>setFormData({...formData, message: e.target.value})} value={formData.message}></textarea>
                        </div>

                        <button type="submit" className="mt-4 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                            <i className="bi bi-send-fill mr-2"></i> Envoyer
                        </button>
                    </form>
                </div>

            </div>
        // </div>
    );
};

export default Contact;