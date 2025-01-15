import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    //Check if the user is present
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    //Get all the listings that are marked as favorite by the user
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    //Convert to safe favorites and then return them
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
