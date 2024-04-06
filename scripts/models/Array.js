// Classe Array pour représenter un tableau
export class Array {
  // Constructeur de la classe Array
  constructor() {
    // Initialisation des propriétés de l'objet
    this._data = [];
  }

  // Méthode pour ajouter un élément au tableau
  add(item) {
    this._data.push(item);
  }

  // Méthode pour supprimer tous les éléments du tableau égaux à une valeur spécifique
  remove(value) {
    this._data = this._data.filter((item) => item !== value);
  }
}
