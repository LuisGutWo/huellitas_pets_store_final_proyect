export const userFeedback = {
    authRequiredForCart: "Por favor, inicia sesión para añadir productos al carrito.",
    authRequiredForFavorites:
        "Por favor, inicia sesión para gestionar tus favoritos.",
    cartAdded: (productName: string) => `${productName} se agregó al carrito.`,
    favoriteAdded: (productName: string) =>
        `${productName} se agregó a favoritos.`,
    favoriteRemoved: (productName: string) =>
        `${productName} se quitó de favoritos.`,
};