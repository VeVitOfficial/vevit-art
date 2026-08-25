-- 0002_seed_artists.sql — demo profily (shoda s veřejným marketingovým webem).
-- Pozn.: auth uživatelé se zakládají přes admin.createUser (viz dokumentace
-- fáze D), poté se řádky propojí: update artists set user_id = <auth.uid>
-- where email = '...'. Tyto řádky mají user_id NULL (profil zatím bez loginu),
-- ale veřejný select je zpřístupní appce i webu.

insert into public.artists
  (artist_name, email, field, real_name, genre, bio, instagram_handle, profile_photo_url)
values
  (
    'ART3MIS',
    'art3mis@vevit.art',
    'vytvarne_umeni',
    null,
    'Anime / videoherní ilustrace',
    'Kreslíř od dětství. Anime a videoherní světy jsou hlavní inspirace; tužka, fix a čím dál víc i digitální kresba.',
    'art3mis',
    '/portfolios/art3mis/uploads/20251020_222528-605336dc.jpg'
  ),
  (
    'Anelly',
    'anelly@vevit.art',
    'hudba',
    null,
    'Pop',
    'Zpěvačka a autorka písní z Prahy. Píše o víře, pochybnostech a o tom, co se běžně neříká nahlas.',
    'anelly',
    '/portfolios/anelly/uploads/IMG_5636.jpeg'
  )
on conflict (email) do nothing;