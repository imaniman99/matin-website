# Guide de gestion du contenu · Content editing guide

**[Français](#français)** · **[English](#english)**

---

## Français

Ce guide explique comment mettre à jour le site de Matin **sans installer aucun logiciel** : tout se fait dans votre navigateur, sur GitHub.

### Comment ça fonctionne

- Chaque événement, actualité, programme ou membre de l'équipe est un **petit fichier texte** dans le dossier `src/content/`.
- Vous modifiez ces fichiers sur GitHub, puis vous cliquez sur **« Commit changes »** (enregistrer).
- Le site se met à jour **tout seul en 1 à 3 minutes**.
- **Si une erreur se glisse** (un champ oublié, par exemple), la mise à jour est refusée et **l'ancienne version reste en ligne**. Rien ne casse. Vous recevez un courriel de Netlify et il suffit de corriger le fichier.
- Les événements terminés passent automatiquement dans « Événements passés » chaque matin.

### Avant de commencer

1. Ouvrez le dépôt du site : **[ADRESSE DU DÉPÔT GITHUB — à fournir]**.
2. Connectez-vous avec votre compte GitHub (demandez l'accès à la personne responsable technique).

### Les règles d'or

1. **Toujours les deux langues :** chaque texte a une ligne `fr:` et une ligne `en:`. Les deux sont obligatoires.
2. **Mettez le texte entre guillemets droits** `"comme ceci"`, surtout s'il contient `:` ou `#`.
3. **Respectez les espaces au début des lignes** (le retrait). Utilisez la barre d'espace, jamais la touche Tab. Copiez un modèle de ce guide plutôt que de partir de zéro.
4. **Les dates s'écrivent** `2026-10-24` et **les heures** `2026-10-24T19:00` (heure de Montréal, format 24 h).
5. **Le nom du fichier** : minuscules, sans accents ni espaces, avec des tirets. Par exemple `soiree-musiques-du-monde.yaml`.
6. **Retirez `placeholder: true`** (ou mettez `placeholder: false`) quand le contenu est réel.

Pas besoin de vous soucier des espaces avant « : » ou à l'intérieur des « guillemets » : le site applique automatiquement la typographie québécoise.

---

### 1. Ajouter un événement

1. Allez dans le dossier **`src/content/events`**.
2. Cliquez sur **Add file → Create new file**.
3. Nommez le fichier, par exemple `atelier-cuisine-2026.yaml`.
4. Collez ce modèle et remplacez les textes :

```yaml
category: community # language, arts, youth, community, newcomers, lectures, music, celebration
urlSlug:
  fr: atelier-cuisine-du-monde
  en: world-cooking-workshop
title:
  fr: 'Atelier : cuisines du monde'
  en: 'Workshop: World Cuisines'
summary:
  fr: 'Une phrase qui donne envie de venir.'
  en: 'One sentence that makes people want to come.'
body:
  fr: |
    Description complète en français. Vous pouvez faire plusieurs paragraphes.

    - Une liste à puces commence par un tiret
    - **Texte en gras** entre deux astérisques doubles
  en: |
    Full description in English.
start: '2026-11-21T14:00'
end: '2026-11-21T17:00'
location:
  name: 'Locaux de Matin'
  address: '1234, rue Exemple, Montréal, QC'
price:
  free: true
registrationUrl: https://www.zeffy.com/… # facultatif : supprimez la ligne s'il n'y a pas d'inscription
```

5. Pour un événement **payant**, remplacez le bloc `price` par :

```yaml
price:
  free: false
  label:
    fr: '15 $ · 10 $ étudiants'
    en: '$15 · $10 students'
```

6. Cliquez sur **Commit changes…**, puis de nouveau sur **Commit changes**.

### 2. Publier une actualité

Dossier **`src/content/news`**, même méthode (Add file → Create new file), puis ce modèle :

```yaml
date: 2026-11-02
author: 'Équipe Matin'
categories: [community] # une ou plusieurs catégories, voir la liste plus haut
tags: [bénévolat, fête]
urlSlug:
  fr: retour-sur-la-fete
  en: festival-recap
title:
  fr: 'Retour sur la fête'
  en: 'Festival recap'
excerpt:
  fr: 'Le résumé affiché sur les cartes (1 ou 2 phrases).'
  en: 'The summary shown on cards (1 or 2 sentences).'
body:
  fr: |
    Le texte complet de l'article.
  en: |
    The full article text.
```

**Ajouter une image :**

1. Envoyez la photo dans le dossier `src/assets/uploads/news` avec **Add file → Upload files**.
2. Ajoutez ces lignes dans l'article :

```yaml
image: ../../assets/uploads/news/nom-de-la-photo.jpg
imageAlt:
  fr: 'Description de la photo pour les personnes aveugles'
  en: 'Description of the photo for blind visitors'
```

### 3. Ajouter des photos à la galerie

1. Allez dans **`src/assets/uploads/gallery`** et créez un dossier pour l'album. Astuce : dans **Add file → Upload files**, vous pouvez glisser plusieurs photos d'un coup.
2. Vous pouvez envoyer les photos **directement depuis votre téléphone**. Le site les réduit à 2000 pixels, les compresse et **efface la localisation GPS** automatiquement.
3. Dans **`src/content/gallery`**, créez le fichier de l'album :

```yaml
date: 2026-11-21
title:
  fr: 'Atelier cuisines du monde'
  en: 'World Cuisines Workshop'
description:
  fr: "Une phrase sur l'album."
  en: 'One sentence about the album.'
photos:
  - image: ../../assets/uploads/gallery/atelier-cuisine/photo-1.jpg
    alt:
      fr: 'Deux participantes préparent des dumplings'
      en: 'Two participants making dumplings'
  - image: ../../assets/uploads/gallery/atelier-cuisine/photo-2.jpg
    alt:
      fr: '…'
      en: '…'
videos: []
```

**Ajouter une vidéo YouTube** : copiez l'identifiant de la vidéo, soit les 11 caractères après `v=` dans l'adresse YouTube.

```yaml
videos:
  - youtubeId: 'AbCdEfGhIjK' # exemple : remplacez par le vrai identifiant
    title:
      fr: 'Titre de la vidéo'
      en: 'Video title'
```

**Le texte « alt »** décrit la photo pour les personnes qui ne la voient pas. Soyez bref et concret.

**Consentement :** publiez seulement des photos de personnes qui ont accepté d'apparaître en ligne.

### 4. Modifier l'équipe

Dossier **`src/content/team`** : un fichier par personne.

```yaml
group: staff # staff = équipe, board = conseil d'administration
order: 3 # ordre d'affichage
name: 'Prénom Nom'
role:
  fr: 'Coordination des bénévoles'
  en: 'Volunteer Coordinator'
bio:
  fr: 'Deux ou trois phrases.'
  en: 'Two or three sentences.'
photo: ../../assets/uploads/team/prenom-nom.jpg # facultatif : sans photo, les initiales s'affichent
```

**Pour retirer quelqu'un** : ouvrez son fichier, cliquez sur **⋯ → Delete file**, puis sur **Commit changes**.

### 5. Modifier un texte existant

1. Ouvrez le fichier.
2. Cliquez sur l'icône **crayon** (Edit).
3. Modifiez le texte.
4. Cliquez sur **Commit changes**.

Où trouver quoi :

| Je veux modifier…                                                                 | Fichier                                                                                |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Adresse, téléphone, courriel, heures, réseaux sociaux, lien de don, chiffres clés | `src/content/settings/site.yaml`                                                       |
| Vision, valeurs, historique, mot de la direction                                  | `src/content/about/about.yaml`                                                         |
| Adhésion, rôles bénévoles, exemples de dons                                       | `src/content/involvement/involvement.yaml`                                             |
| Programmes                                                                        | `src/content/programs/`                                                                |
| Questions fréquentes                                                              | `src/content/faq/`                                                                     |
| Ressources                                                                        | `src/content/resources/`                                                               |
| Témoignages, partenaires                                                          | `src/content/testimonials/`, `src/content/partners/`                                   |
| Rapports annuels                                                                  | `src/content/documents/` (le PDF va dans `public/documents/`)                          |
| Pages légales                                                                     | `src/content/legal/`                                                                   |
| Textes de l'interface (boutons, titres de sections)                               | `src/i18n/fr.ts` et `src/i18n/en.ts` (à confier de préférence à la personne technique) |

### Vérifier que la mise à jour est en ligne

- Attendez 1 à 3 minutes, puis rechargez la page du site.
- **Si rien ne change :** vérifiez votre courriel. Netlify écrit quand une mise à jour est refusée, et le message indique **le fichier et le champ en cause** (par exemple `events → atelier-cuisine: title.en: Required`). Corrigez ce fichier.
- **Pour annuler une modification :** ouvrez le fichier, cliquez sur **History**, retrouvez l'ancienne version, puis recopiez-la. En cas de doute, demandez à la personne responsable technique.

### Besoin d'aide ?

Personne-ressource technique : **[NOM ET COURRIEL — à fournir]**.

---

## English

This guide explains how to update the Matin website **without installing any software**: everything happens in your web browser, on GitHub.

### How it works

- Each event, news post, program or team member is a **small text file** in the `src/content/` folder.
- You edit these files on GitHub, then click **"Commit changes"** (save).
- The website **updates itself within 1–3 minutes**.
- **If there's a mistake** (a missing field, for example), the update is rejected and **the previous version stays online**. Nothing breaks. Netlify emails you, and you simply fix the file.
- Events that have ended move to "Past events" automatically every morning.

### Before you start

1. Open the website repository: **[GITHUB REPOSITORY ADDRESS — to be provided]**.
2. Sign in with your GitHub account (ask the technical contact for access).

### Golden rules

1. **Always both languages:** every text has an `fr:` line and an `en:` line. Both are required.
2. **Put text between straight quotes** `"like this"`, especially if it contains `:` or `#`.
3. **Keep the spaces at the start of lines** (the indentation). Use the space bar, never the Tab key. Copy a template from this guide rather than starting from scratch.
4. **Dates are written** `2026-10-24` and **times** `2026-10-24T19:00` (Montréal time, 24-hour clock).
5. **File names:** lowercase, no accents or spaces, with hyphens. For example `world-music-night.yaml`.
6. **Remove `placeholder: true`** (or set `placeholder: false`) once the content is real.

### 1. Add an event

1. Go to the **`src/content/events`** folder.
2. Click **Add file → Create new file** and name the file, e.g. `cooking-workshop-2026.yaml`.
3. Paste the **event template** from the French section above (the field names are the same in both languages) and replace the texts.
4. For a **paid** event, use the `price` block with `free: false` and a `label`.
5. Click **Commit changes…**, then **Commit changes** again.

### 2. Publish a news post

In the **`src/content/news`** folder, use the same method with the **news template** above.

To add a picture, upload it to `src/assets/uploads/news` (**Add file → Upload files**), then add the `image:` and `imageAlt:` lines.

### 3. Add photos to the gallery

1. Upload the photos to a new folder in **`src/assets/uploads/gallery`**. You can drag in several at once.
2. Photos can come **straight from a phone**. The site shrinks them to 2000 pixels, compresses them and **removes GPS location** automatically.
3. Create the album file in **`src/content/gallery`** with the **gallery template** above. Give every photo an `alt` text: a short, concrete description for people who can't see it.
4. For a YouTube video, copy its 11-character ID (after `v=` in the YouTube address).
5. Only publish photos of people who agreed to appear online.

### 4. Edit the team

In **`src/content/team`**, there is one file per person (see the **team template** above). Use `group: staff` for staff or `group: board` for the board.

**To remove someone:** open their file, click **⋯ → Delete file**, then **Commit changes**.

### 5. Edit existing text

1. Open the file.
2. Click the **pencil** icon (Edit).
3. Change the text.
4. Click **Commit changes**.

The table in the French section shows **which file holds what** (contact details and donation link are in `src/content/settings/site.yaml`).

### Checking that your update is live

- Wait 1–3 minutes and reload the website.
- **If nothing changed:** check your email. Netlify writes when an update is rejected, and the message names **the file and the field** (e.g. `events → cooking-workshop: title.en: Required`). Fix that file.
- **To undo a change:** open the file, click **History**, find the old version and copy it back. If in doubt, ask the technical contact.

### Need help?

Technical contact: **[NAME AND EMAIL — to be provided]**.
