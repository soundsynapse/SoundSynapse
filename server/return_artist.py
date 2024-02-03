import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pprint

def return_artist(artist):
    client_id = 'a6bd17dc6fb74c3fba04930d83b6bc94' 
    client_secret = 'f5f882869d3547f3a52216216981bed7' 
    client_credentials_manager = spotipy.oauth2.SpotifyClientCredentials(client_id, client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    art_name=artist
    art_search = sp.search(art_name,type='artist')
    art_id = art_search['artists']['items'][0]['id'] 
    art_alb = sp.artist_albums(art_id, limit=50,album_type='album') 
    alb_ids = [alb['id'] for alb in art_alb['items']] 
    tra_id_name = []
    for alb_id in alb_ids:
        tracks = sp.album_tracks(alb_id, limit=50)["items"]
        for track_num,track in enumerate(tracks):
            dict = {'name':track["name"],'id':track["id"]}
            tra_id_name.append(dict)
    return tra_id_name

return_artist("zutomayo")
#アーティスト名でsp.search
#辞書型で渡されるので、その中のidを参照(同名アーティストがいたらまずい)

#アーティストidでアルバムを検索

#alb_idsにアルバムのIDが最大50個格納されてる


# art_search = sp.search(art_name,type='artist') 
# #アーティスト名でsp.search
# #art_id = art_search['artists']['items'][0]['id'] 
# #辞書型で渡されるので、その中のidを参照(同名アーティストがいたらまずい)

# pprint.pprint(art_search)

# art_alb = sp.artist_albums(art_id, limit=50,album_type='album') 
# #アーティストidでアルバムを検索

# alb_ids = [alb['id'] for alb in art_alb['items']] 
# #alb_idsにアルバムのIDが最大50個格納されてる

# tra_id_name = [{}]
# for alb_id in alb_ids:
#     tracks = sp.album_tracks(alb_id, limit=50)["items"]
#     for track_num,track in enumerate(tracks):
#         dict = {'name':track["name"],'id':track["id"]}
#         # if track["name"] == tra_name and flag:
#         #     result = sp.audio_features(track['id'])
#         #     pprint.pprint('name     : ' +track['name'])
#         #     pprint.pprint(result)
#         #     flag = False
#         tra_id_name.append(dict)
# pprint.pprint(tra_id_name)
