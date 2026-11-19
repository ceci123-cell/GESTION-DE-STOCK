let produits = [];
let indexModification = null;

const formulaire = document.getElementById("formProduit");
const button = document.getElementById("btnAjouter");

function ajouterProduit() {
    const nom = document.getElementById("nom").value.trim();
    const categorie = document.getElementById("categorie").value.trim();
    const prix = document.getElementById("prix").value;
    const quantite = document.getElementById("quantite").value;

    if (nom === " "|| categorie === " "|| prix === "" || quantite === "") {
        alert("Veuillez remplir tous les chmaps!");
        return;
    }
    
    if(Number(prix) <0 || Number(quantite) <0){
        alert("Les valeurs ne doivent pas etre négatives!");
        return;
    }
    const produit = {
        nom:nom,
        categorie:categorie,
        prix:Number(prix),
        quantite:Number(quantite)
    };

    if(indexModification === null){
        produits.push(produit);
        alert("Produit ajouté avec succès")
    }else{
        produits[indexModification] = produit;
        indexModification = null;

        button.textContent = "Ajouter le produit";
        alert("Modification réussie!")
    }
    afficherProduits();
    formulaire.reset();
}

    function afficherProduits() {
        const tableau = document.getElementById("tableauProduits");
        tableau.innerHTML = "";
        produits.forEach(function(produit,index) {
            tableau.innerHTML += `
            <tr>
            <td>${index +1}</td>
            <td>${produit.nom}</td>
            <td>${produit.categorie}</td>
            <td>${produit.prix}</td>
            <td>${produit.quantite}</td>

            <td>
            <button  class="modifier" onclick="modifierProduit(${index})">Modifier</button>
            <button  class="supprimer" onclick="supprimerProduit(${index})">Supprimer</button>
            </td>
            </tr>
            `;
    
        }); 
        }
        function modifierProduit(index) {
            const produit = produits[index];
            document.getElementById("nom").value = produit.nom;
            document.getElementById("categorie").value = produit.categorie;
            document.getElementById("prix").value = produit.prix;
            document.getElementById("quantite").value = produit.quantite;

            indexModification = index;

            button.textContent = "Enregistrer les modifications";
        }
        function supprimerProduit(index) {
            if (confirm("Vous voulez vraiment supprimer ce produit?")) {
                produits.splice(index,1);
                afficherProduits();
                alert("Produit supprimé!");
            }
        }
        formulaire.addEventListener("submit" ,function(event){
            event.preventDefault();
            ajouterProduit();
        });
