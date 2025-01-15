import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    //We will get all the listings that have rooms greater than or equal to required rooms
    //+roomCount will convert string to number
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if(locationValue){
      query.locationValue = locationValue
    }


    //We find all the overlapping dates and skip those and take remaining
    if(startDate && endDate){
      query.NOT = {
        reservations:{
          some: {
            OR:[{
              endDate: {gte: startDate},
              startDate: {lte: startDate}
            },
            {
              startDate: {lte: endDate},
              endDate:{ gte: endDate}
            }]
          }
        }
      }
    }
    //Fetching all the listings from db
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    //Return the listings
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
