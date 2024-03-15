import request.request as req

def add_comment(data):
    if "attraction_id" not in data or "note" not in data or "commentaire" not in data:
        return False
    
    requete = "INSERT INTO comment (attraction_id, note, commentaire) VALUES (?, ?, ?);"
    comment_id = req.insert_in_db(requete, (data["attraction_id"], data["note"], data["commentaire"]))
    return comment_id

def get_all_comments():
    json = req.select_from_db("SELECT * FROM comment")
    return json

def get_comments_for_attraction(attraction_id):
    if not attraction_id:
        return []

    comments = req.select_from_db("SELECT * FROM comment WHERE attraction_id = ?", (attraction_id,))
    # if not comments:
    #     return False

    attraction = req.select_from_db("SELECT nom FROM attraction WHERE attraction_id = ?", (attraction_id,))
    if not attraction:
        return []

    # Récupérer le nom de l'attraction à partir du résultat de la requête
    attraction_name = attraction[0]['nom']

    # Ajouter le nom de l'attraction à chaque commentaire
    for comment in comments:
        comment['attraction_name'] = attraction_name

    return comments

def delete_comment(comment_id):
    if not comment_id:
        return False

    req.delete_from_db("DELETE FROM comment WHERE comment_id = ?", (comment_id,))
    return True
