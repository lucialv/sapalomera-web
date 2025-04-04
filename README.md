# Web Institut Sa Palomera

> 🌐 Web oficial de l'Institut Sa Palomera de Blanes

> [!IMPORTANT]  
> Actualment el fetching de notícies no està funcionant a causa d'un problema amb el certificat SSL de sapalomera.cat. L'error es produeix perquè el certificat intermediari no està configurat correctament, fet que causa que Vercel no confiï en el certificat i no pugui realitzar el fetching dels posts. Aquest problema es resoldrà un cop es configuri correctament el certificat a sapalomera.cat.

## 📝 Estat del Projecte
Aquest projecte està en desenvolupament. Amb només 20 hores de treball, és normal que no s'hagin pogut implementar totes les funcionalitats demanades. És una primera versió molt bàsica que necessita molts canvis i millores.

El contingut actual és temporal i no representa la versió final que m'agradaria aconseguir. Amb més temps, podria fer una web molt més completa i professional, afegint totes les funcionalitats necessàries i millorant el disseny.

Tot i les limitacions de temps, he intentat fer una base decent que es pugui ampliar en el futur. El codi està ben estructurat per poder seguir treballant sobre ell i afegir noves característiques quan sigui possible.

### 🔄 Integració amb WordPress (Futur)

Un dels objectius principals per al futur és migrar tot el contingut a WordPress com a Headless CMS. Això permetrà:

- 🎯 Que el personal de l'institut pugui gestionar el contingut fàcilment sense necessitat de tocar codi
- 📝 Edició de contingut a través d'una interfície visual familiar (WordPress)
- 🔄 Actualitzacions en temps real del contingut mitjançant l'API de WordPress
- 🔌 Integració perfecta entre WordPress (backend) i Astro (frontend)
- 🚀 Mantenir el rendiment òptim d'Astro mentre s'aprofiten els avantatges de WordPress

El pla és:

1. Configurar una instal·lació neta de WordPress
2. Estructurar el contingut utilitzant Custom Post Types i Advanced Custom Fields
3. Exposar les dades a través de l'API REST de WordPress
4. Adaptar el frontend d'Astro per consumir aquestes dades

Això permetrà que la web sigui més sostenible a llarg termini, ja que qualsevol persona amb coneixements bàsics de WordPress podrà mantenir-la actualitzada.


### ✅ Funcionalitats Implementades

- 📄 Pàgines implementades:
  - `/`: Pàgina principal
  - `/ampa`: Informació sobre l'AMPA
  - `/secretaria`: Informació sobre els pagaments i es pot pagar
  - `/cantina`: Informació sobre els preus de la cantina
  - `/biblioteca`: Informació sobre la biblioteca
  - `/api/post/{id}`: Endpoints de l'API per obtenir l'informació d'un post
  - `/api/posts`: Endpoint de l'API per obtenir els últims 4 posts
  - `/noticies`: Les últimes 4 noticies
  - `/noticies/{id}`: Pàgina per cada noticia.
  - `/estudis/cicles-superiros`: Pàgina a on s'explica els cicles superiors que tenim
  - `/estudis/daw`: Pàgina a on s'explica el cicle superior de DAW
  - `/politica-de-privacitat`: Política de privacitat
- 🔄 Redireccions:
  - `/correo`: Redirecció al correu electrònic institucional
  - `/borsa`: Redirecció a la borsa de treball
  - `/documentacio`: Redirecció als documents importants
  - `/esfera`: Redirecció a la plataforma Esfera
  - `/weeras`: Redirecció a la plataforma Weeras
  - `/estudis`: Redirecció a la informació general dels estudis
  - `/saga`: Redirecció a la plataforma Saga
  - `/consell-de-delegats`: Informació del consell de delegats

- 🎨 Altres característiques:
  - ✨ Pàgina 404 personalitzada i atractiva per a rutes no implementades



### 🚧 Pendent d'Implementar

- 📝 Formulari de contacte
  - Integració amb Resend per l'enviament de correus
  - Validació de camps
  - Toasts d'èxit/error
  - Protecció contra spam

- 📅 Calendari escolar
  - Vista mensual/setmanal
  - Events i dates importants
  - Filtres per tipus d'estudis
  - Sincronització amb Google Calendar

- 📚 Pàgines d'estudis pendents:
  - ESO
  - Batxillerat
  - Cicle Formatiu de Grau Bàsic
  - Cicle Formatiu de Grau Mitjà (SMX)
  - ASIX (Cicle Superior)
  - Cursos d'especialització
    - Intel·ligència Artificial i Big Data
    - Desenvolupament de Videojocs i Realitat Virtual

- 🌍 Pàgines d'Erasmus+
  - Informació general del programa
  - Projectes actuals i històric
  - Experiències d'estudiants
  - Documentació necessària


- 🎨 Millores al Hero
  - Canviar la font
  - Millor diseny

- 🔄 Integració WordPress Headless
  - Configuració del backend WordPress
  - Custom Post Types per cada tipus de contingut
  - Advanced Custom Fields per estructurar dades
  - API REST personalitzada
  - Cache i optimització de rendiment
  - Suport multiidioma
    - Català com a idioma principal
    - Castellà com a idioma secundari
    - Anglès com a idioma addicional


## 📁 Estructura del Projecte

Les carpetes més importants del projecte són:

- 📂 `src/`
  - 📂 `components/`: Components reutilitzables de l'aplicació
  - 📂 `pages/`: Pàgines de l'aplicació i rutes
  - 📂 `pages/api`: A on obtenim les dades de l'API actual de l'Institut Sa Palomera 
  - 📂 `styles/`: Estils globals
  - 📂 `layouts/`: A on està el header i el footer
  - 📂 `lib/`: Utilitats i funcions auxiliars

- 📂 `public/`: Arxius estàtics (imatges, fonts, etc.)

## 🚀 Com Començar

### Prerequisites

- [Node.js](https://nodejs.org/en/) 
- [pnpm](https://pnpm.io/) (recomanat) o [npm](https://www.npmjs.com/)

### Instal·lació

1. Clona el repositori:
```bash
# Utilitzant HTTPS
git clone https://github.com/lucialv/sapalomera-web.git

# O utilitzant SSH
git clone git@github.com:lucialv/sapalomera-web.git

cd sapalomera-web
```

2. Instal·la les dependències:
```bash
# Amb pnpm (recomanat)
pnpm install

# O amb npm
npm install
```

3. Configura les variables d'entorn:
   Crea un arxiu `.env` a l'arrel del projecte amb el següent contingut:
```env
WP_DOMAIN="https://sapalomera.cat"
```

4. Inicia el servidor de desenvolupament:
```bash
# Amb pnpm
pnpm dev

# O amb npm
npm run dev
```

5. Obre [http://localhost:4321](http://localhost:4321) al teu navegador per veure l'aplicació.

## 🛠️ Desenvolupat amb

- [Astro](https://astro.build/) - Framework web
- [React](https://reactjs.org/) - Per el fetching de dades dinàmic
- [TypeScript](https://www.typescriptlang.org/) - Per els Endpoints de les Noticies
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS

## 📄 Llicència

Aquest projecte està sota la llicència MIT. Consulta l'arxiu `LICENSE` per a més detalls.

---

Fet amb ❤️ per Lucía Álvarez de l'Institut Sa Palomera de Blanes