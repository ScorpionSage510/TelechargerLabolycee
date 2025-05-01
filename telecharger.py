import os
import PyPDF2
import io
import requests
import urllib.parse
from lxml import html

def telecharger(url):
    print(url)
    name = url.split("/")[-1]

    response = requests.get(url)

    # Vérifier si la requête a réussi (status code 200)
    if response.status_code == 200:
        # Charger le contenu de la page dans lxml
        tree = html.fromstring(response.content)
        
        iframe_srcs = tree.xpath('//iframe[contains(@class, "pdf")]/@src')  # XPath pour tous les attributs src des iframes

        # Afficher les src des deux premiers iframes
        if len(iframe_srcs) >= 2:
            print(f"Le src du premier iframe est : {iframe_srcs[0]}")
            print(f"Le src du deuxième iframe est : {iframe_srcs[1]}")
        else:
            return "Pas de correction disponible"
        
        url_suj = iframe_srcs[0] #tree.xpath('/html/body/div[1]/div/div/div[2]/div/div/main/section/section/div[2]/div/div[5]/div[1]/div/div[2]/div/div[2]/iframe/@src') #/@src')
        url_suj = url_suj.replace("/libraries/pdf.js/web/viewer.html?file=","")
        print(url_suj)
        url_suj = urllib.parse.unquote(url_suj)
        print(url_suj)
        
        # Extraire le src de l'iframe avec le XPath donné
        url_corr =iframe_srcs[1] # tree.xpath('/html/body/div[1]/div/div/div[2]/div/div/main/section/section/div[2]/div/div[5]/div[2]/div/div[2]/div/div[2]/iframe/@src') #/@src')
        url_corr = url_corr.replace("/libraries/pdf.js/web/viewer.html?file=","")
        url_corr = urllib.parse.unquote(url_corr)
        
        # """
        if url_suj:
            print(f"Le src de l'iframe est : {url_suj}")
            response = requests.get(url_suj)

            # Vérifier que la requête a réussi
            if response.status_code == 200:
                contenu_sujet = response.content
                # with open(f"Sujet{name}.pdf", "wb") as file:
                #     file.write(contenu_sujet)
                # print("Le fichier a été téléchargé avec succès sous le nom 'fichier.pdf'.")
        else:
            return ("L'élément iframe n'a pas été trouvé avec le XPath donné.")
        # """
        # Afficher le src de l'iframe
        if url_corr:
            print(f"Le src de l'iframe est : {url_corr}")
            response = requests.get(url_corr)

            # Vérifier que la requête a réussi
            if response.status_code == 200:
                contenu_corr = response.content
                # with open(f"{name}.pdf", "wb") as file:
                #     file.write(contenu_corr)
                # print("Le fichier a été téléchargé avec succès sous le nom 'fichier.pdf'.")
        else:
            return ("L'élément iframe n'a pas été trouvé avec le XPath donné.")
        # """
        sujet = PyPDF2.PdfReader(io.BytesIO(contenu_sujet))
        corr = PyPDF2.PdfReader(io.BytesIO(contenu_corr))
        
        # Créer un objet PDF writer pour le fichier de sortie
        pdf_writer = PyPDF2.PdfWriter()
        
        # Ajouter toutes les pages du premier PDF
        for page in range(len(sujet.pages)):
            pdf_writer.add_page(sujet.pages[page])
            
        # Ajouter toutes les pages du deuxième PDF
        for page in range(len(corr.pages)):
            pdf_writer.add_page(corr.pages[page])
        
        # Écrire le contenu fusionné dans un nouveau fichier PDF
        with open(f"téléchargements/{name}.pdf", 'wb') as output_file:
            pdf_writer.write(output_file)

        return (f"Les fichiers PDF ont été fusionnés en : {name}.pdf")
    else:
        return (f"Échec du téléchargement de la page. Code de statut : {response.status_code}")
