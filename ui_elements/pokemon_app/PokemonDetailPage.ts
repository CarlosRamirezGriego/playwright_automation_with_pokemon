export function PokemonDetailPage_PokedexData(){
    return {
        POKEDEX_DATA_TABLE: 'div[id*="tab-basic"]>div:nth-child(1)>div:nth-child(2) table',
        POKEDEX_DATA_NUMBER_CELL: 'tr:nth-child(1)> td',
        POKEDEX_DATA_SPECIES_CELL: 'tr:nth-child(3)> td'
    }
}