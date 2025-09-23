import type { Artwork, SearchFilters } from "../types/artwork"
import axios from "axios"

const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const HARVARD_API_URL = "https://api.harvardartmuseums.org/object";
const HARVARD_API_KEY = import.meta.env.VITE_HARVARD_API_KEY;

export const searchArtworks = async (filters: SearchFilters): Promise<Artwork[]> => {
    try {
        
        let results: Artwork[] = []; //store all search results

        if (filters.museum === "met" || filters.museum === "all") {
          
            const metResults = await searchMetMuseum(filters);
           
            results.push(...metResults);
        }
        
        if (filters.museum === "harvard" || filters.museum === "all") {
     
            const harvardResults = await searchHarvardMuseum(filters);
         
            results.push(...harvardResults);
        }
        
        return results;
    } catch (error) {
     
        console.error("Error searching for artworks:", error);
        return [];
    }
}
// search artworks from met
const searchMetMuseum = async (filters: SearchFilters): Promise<Artwork[]> => {
    try {
        
        const params = new URLSearchParams(); // build query params for met api
        
      //user search query
        if (filters.query) {
            params.append('q', filters.query); 
        }

        // filter for artworks with images
        if (filters.hasImage) {
            params.append('hasImages', 'true'); 
        }

        // met api call
        const searchResponse = await axios.get(
            `${MET_API_URL}/search?${params.toString()}`
        );
        
        if (!searchResponse.data.objectIDs || searchResponse.data.objectIDs.length === 0) {
            return []; 
        }

        // get first 10 art objects
        const objectIds = searchResponse.data.objectIDs.slice(0, 10);
        
        // array of promises
        const artworkPromises = objectIds.map((id: number) => getMetObjectDetails(id));

        const artworkDetails = await Promise.all(artworkPromises);
        
        return artworkDetails.filter(artwork => artwork !== null) as Artwork[];

    } catch (error) {
        console.error("Error searching Met Museum:", error);
        return [];
    }
}
    // get artwork details from met by id
const getMetObjectDetails = async (id: number): Promise<Artwork | null> => {
    try {
        const response = await axios.get(`${MET_API_URL}/objects/${id}`);
        const data = response.data;
        
        return {
            id: data.objectID.toString(),
            title: data.title || 'Untitled',
            artist: data.artistDisplayName || "Unknown", 
            image: data.primaryImage,
            thumbnailURL: data.primaryImageSmall,
            department: data.department,
            date: data.objectDate,
            period: data.period,
            culture: data.culture,
            objectName: data.objectName,
            medium: data.medium,
            dimensions: data.dimensions,
            museum: 'met' as const,
            museumUrl: data.objectURL,
            isHighlight: data.isHighlight,
        };
    } catch (error) {
        console.error("Error getting Met object details:", error);
        return null;
    }
}
    // search artworks from harvard
const searchHarvardMuseum = async (filters: SearchFilters): Promise<Artwork[]> => {
    try {
        const params = new URLSearchParams();
        params.append('apikey', HARVARD_API_KEY);
        params.append("size", "10");

        if (filters.query) {
            params.append('title', filters.query);
        }


        const response = await axios.get(`${HARVARD_API_URL}?${params.toString()}`);

        const allResults = response.data.records.map((record: any) => ({
            id: record.id.toString(),
            title: record.title || 'Untitled',
            artist: record.people?.[0]?.name || "Unknown", 
            image: record.primaryimageurl || record.images?.[0]?.baseimageurl,
            department: record.department,
            date: record.dated,
            period: record.period,
            culture: record.culture,
            objectName: record.objectname,
            medium: record.medium,
            dimensions: record.dimensions,
            museum: 'harvard' as const,
            museumUrl: record.url
        }))

        if (filters.hasImage) {
            return allResults.filter(artwork => artwork.image)
        } else {
            return allResults;
        }


    } catch (error) {
        console.error("Error searching Harvard Museum:", error);
        return [];
    }
}