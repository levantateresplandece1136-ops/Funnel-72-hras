import React from 'react';

const WHATSAPP_NUMBER = '524423723621';
const DEFAULT_MESSAGE = 'Hola, tengo una pregunta sobre la guia de Las Primeras 72 Horas.';

export const WhatsAppButton: React.FC = () => {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
          <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Escribenos por WhatsApp"
                  className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg shadow-black/30 pl-3 pr-4 py-3 transition-transform hover:scale-105 active:scale-95"
                >
                <svg
                          viewBox="0 0 32 32"
                          width="24"
                          height="24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.71 4.605 1.93 6.462L4 29l7.72-1.912A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.938c-1.988 0-3.84-.58-5.4-1.577l-.387-.243-4.583 1.135 1.223-4.464-.253-.406A9.88 9.88 0 0 1 5.06 15c0-5.487 4.46-9.938 10.944-9.938 5.487 0 9.938 4.451 9.938 9.938 0 5.487-4.451 9.938-9.938 9.938Zm5.44-7.36c-.298-.15-1.76-.868-2.033-.967-.273-.1-.472-.15-.671.15-.199.298-.769.966-.943 1.165-.174.198-.348.223-.646.074-.298-.15-1.258-.464-2.397-1.48-.886-.79-1.484-1.767-1.658-2.065-.174-.298-.019-.459.13-.608.134-.133.298-.348.447-.522.15-.174.199-.298.298-.497.1-.199.05-.373-.025-.522-.075-.15-.671-1.617-.92-2.215-.242-.582-.488-.503-.671-.512l-.572-.01c-.199 0-.522.075-.796.373-.273.298-1.045 1.021-1.045 2.489 0 1.468 1.07 2.886 1.219 3.084.15.199 2.106 3.216 5.104 4.51.713.308 1.269.492 1.703.63.716.228 1.368.196 1.883.119.574-.086 1.76-.72 2.009-1.415.248-.696.248-1.293.174-1.416-.075-.124-.273-.199-.571-.348Z" />
                </svg>
                <span className="text-sm font-bold hidden sm:inline">WhatsApp</span>
          </a>
        );
};
