import React from 'react';

export interface PageData {
  pageNumber: number;
  title: string;
  badge?: string;
  subtitle?: string;
  section: string;
}

export const GUIDE_METADATA = {
  title: "LAS PRIMERAS 72 HORAS",
  subtitle: "Qué hacer —y qué evitar— cuando descubres que algo anda mal con tu hijo",
  brand: "Levántate Resplandece",
  tagline: "Lead magnet · Levántate Resplandece",
  totalPages: 23,
  highlights: [
    "El plan de las primeras 72 horas",
    "12 preguntas que abren conversaciones",
    "Ejercicios para recuperar la conexión",
    "Test: ¿Qué tan conectado estás con tu hijo?",
    "Checklist para saber qué hacer después"
  ]
};

export const TEST_QUESTIONS = [
  "¿Sé cuál es la mayor preocupación de mi hijo en este momento?",
  "¿Puedo mencionar el nombre de sus dos mejores amigos actuales?",
  "En la última semana, ¿hemos tenido al menos una conversación sin pantallas ni interrupciones?",
  "Cuando mi hijo comete un error, ¿su primera reacción es acudir a mí o esconderlo?",
  "¿Conozco qué contenido o personas influyen más en él/ella en redes sociales?",
  "¿Sé qué le hace sentir seguro/a cuando está estresado/a o triste?",
  "¿Siento que puedo corregirlo sin que la relación se fracture durante días?",
  "¿Mi hijo sabe exactamente qué cosas me hacen sentir orgulloso/a de él/ella?",
  "¿Hemos reído juntos en los últimos tres días?",
  "Si tuviera un problema grave hoy, ¿creo firmemente que me buscaría a mí antes que a nadie más?"
];

export const TEST_SCORES = {
  high: {
    range: "21 a 30 puntos",
    label: "Conexión Sólida",
    color: "emerald",
    desc: "Tienes un puente de confianza bien construido. Tu hijo te ve como un refugio seguro. Esta guía te ayudará a mantener esa conexión en momentos críticos."
  },
  medium: {
    range: "11 a 20 puntos",
    label: "Conexión en Riesgo",
    color: "amber",
    desc: "Hay canales abiertos, pero también distanciamientos o grietas. Tu hijo aún responde, pero necesita ver cambios en la forma de abordar sus emociones y errores."
  },
  low: {
    range: "0 a 10 puntos",
    label: "Desconexión Alarmante",
    color: "rose",
    desc: "La distancia es evidente y es posible que exista temor o desconfianza. No entres en pánico: aplicar las recomendaciones de las primeras 72 horas es vital para reconstruir la confianza paso a paso."
  }
};
