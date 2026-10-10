# Actualités · News

One YAML file per article, e.g. `nouveau-partenariat.yaml`. Full guide: `GUIDE_ADMIN.md`.
Events do not go here: they have their own folder (`src/content/events`).

Two categories:

- `updates`: **Matin Updates / Nouvelles de Matin**. Official announcements, activity reports, partnerships, volunteer updates.
- `community`: **Montréal Culture & Community / Culture et communauté à Montréal**. Matin's own reflections or reviews of Montréal cultural events, community initiatives and intercultural topics.

```yaml
date: 2027-03-02
author: "Équipe Matin"
category: updates # or: community
urlSlug:
  fr: titre-en-francais
  en: title-in-english
title:
  fr: "Titre de l'article"
  en: "Article title"
excerpt:
  fr: "Résumé en une ou deux phrases."
  en: "One- or two-sentence summary."
body:
  fr: |
    Texte complet.
  en: |
    Full text.

# Optional image. Use only photos Matin owns or has permission to publish
# (photographer's consent and consent of recognizable people):
# image: ../../assets/uploads/news/photo.jpg
# imageAlt: { fr: "Description", en: "Description" }
# imagePermission: true

# Optional source, when the article discusses an external event or issue:
# source:
#   name: "Nom de l'organisme ou du média"
#   url: https://…

# Persian (optional): add `fa:` to title, excerpt and body, then faReviewed: true
# once reviewed. Only then does the article appear on Persian pages.
```
