/**
 * Type Effectiveness Utilities
 * Functions for calculating Pokemon type effectiveness
 */

import { TYPE_EFFECTIVENESS } from "../constants/typeEffectiveness";

/**
 * Calculates type effectiveness for a Pokemon with multiple types
 * @param {Array<string>} types - Array of type names
 * @returns {Object} Object containing weaknesses, resistances, and immunities
 */
export const calculateTypeEffectiveness = (types) => {
  if (!types || types.length === 0) {
    return { weaknesses: [], resistances: [], immunities: [] };
  }

  const allWeaknesses = [];
  const allResistances = [];
  const allImmunities = [];

  types.forEach((typeName) => {
    const typeData = TYPE_EFFECTIVENESS[typeName];
    if (typeData) {
      allWeaknesses.push(...typeData.weaknesses);
      allResistances.push(...typeData.resistances);
      allImmunities.push(...typeData.immunities);
    }
  });

  // Remove duplicates and handle overlaps
  const weaknesses = [...new Set(allWeaknesses)].filter(
    (w) => !allImmunities.includes(w),
  );
  const resistances = [...new Set(allResistances)].filter(
    (r) => !allImmunities.includes(r),
  );

  // Remove resistances that are also weaknesses (they cancel out)
  const finalWeaknesses = weaknesses.filter((w) => !resistances.includes(w));
  const finalResistances = resistances.filter((r) => !weaknesses.includes(r));
  const immunities = [...new Set(allImmunities)];

  return {
    weaknesses: finalWeaknesses,
    resistances: finalResistances,
    immunities,
  };
};

/**
 * Gets type effectiveness for display
 * @param {Array<Object>} pokemonTypes - Array of type objects from Pokemon API
 * @returns {Object} Type effectiveness data
 */
export const getTypeEffectivenessFromPokemon = (pokemonTypes) => {
  const typeNames = pokemonTypes.map((t) => t.type.name);
  return calculateTypeEffectiveness(typeNames);
};
