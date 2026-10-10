# Événements · Events

One YAML file per event, e.g. `atelier-cuisine-2027.yaml`. Full guide: `GUIDE_ADMIN.md`.

Only real, confirmed events go here. Once an event's end time has passed, it moves to
"Past events" and the Past Events archive automatically.

```yaml
category: community # language, arts, youth, community, newcomers, lectures, music, celebration
urlSlug:
  fr: atelier-cuisines-du-monde
  en: world-cuisines-workshop
title:
  fr: "Atelier : cuisines du monde"
  en: "Workshop: World Cuisines"
summary:
  fr: "Une phrase qui présente l'événement."
  en: "One sentence introducing the event."
body:
  fr: |
    Description en français.
  en: |
    Description in English.
start: "2027-03-21T14:00" # Montréal time, 24 h
end: "2027-03-21T17:00"
location:
  name: "Nom du lieu"
  address: "Adresse complète, Montréal, QC"
price:
  free: true
# registrationUrl: https://…            (optional)
# image: ../../assets/uploads/events/photo.jpg   (optional, with imageAlt fr/en)

# --- After the event (optional; each part appears only when filled in) ---
# report:
#   fr: |
#     Compte rendu complet…
#   en: |
#     Full report…
# highlights:
#   - fr: "Un moment fort ou un résultat"
#     en: "A highlight or outcome"
# photos:
#   - image: ../../assets/uploads/events/nom-evenement/photo-1.jpg
#     alt: { fr: "Description de la photo", en: "Photo description" }
#     caption: { fr: "Légende", en: "Caption" }

# --- Persian (optional) ---
# Add `fa:` next to `fr:`/`en:` in title and summary, then set faReviewed: true
# once a Persian speaker has reviewed it. Only then does it appear on Persian pages.
```
