function capitalize(string) {
  // Vérifie si le paramètre 'string' est une chaîne de caractères et n'est pas vide.
  if (typeof string === "string" && string.length > 0) {
    // Retourne la chaîne de caractères avec le premier caractère en majuscule et ajoute le reste de la chaîne inchangé.
    // 'string[0].toUpperCase()' convertit le premier caractère en majuscule.
    // 'string.slice(1)' récupère le reste de la chaîne à partir du deuxième caractère.
    return string[0].toUpperCase() + string.slice(1);
  }
  // Si 'string' n'est pas une chaîne ou est vide, retourne 'string' sans modification.
  return string;
}

export { capitalize };