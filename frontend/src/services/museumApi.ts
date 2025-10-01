import type { Artwork, SearchFilters } from "../types/artwork"
import axios from "axios"

const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const HARVARD_API_URL = "https://api.harvardartmuseums.org/object";
const HARVARD_API_KEY = import.meta.env?.VITE_HARVARD_API_KEY;

export const searchArtworks = async (filters: SearchFilters, offset: number = 0): Promise<Artwork[]> => {
  const results: Artwork[] = []

  if (filters.museum === 'met' || filters.museum === 'all') {
    const metResults = await searchMetMuseum(filters, offset)
    results.push(...metResults)
  }

  if (filters.museum === 'harvard' || filters.museum === 'all') {
    const harvardResults = await searchHarvardMuseum(filters, offset)
    results.push(...harvardResults)
  }

  return results
}


const searchMetMuseum = async (filters: SearchFilters, offset: number = 0): Promise<Artwork[]> => {
  try {

        const params = new URLSearchParams(); 

   
        if (filters.query) {
            params.append('q', filters.query);
        }

        if (filters.hasImage) {
            params.append('hasImages', 'true');
        }

        const searchResponse = await axios.get(
            `${MET_API_URL}/search?${params.toString()}&offset=${offset}`
        );

        if (!searchResponse.data.objectIDs || searchResponse.data.objectIDs.length === 0) {
            return [];
        }

    
        const objectIds = searchResponse.data.objectIDs.slice(0, 10);

        
        const artworkPromises = objectIds.map((id: number) => getMetObjectDetails(id));

        const artworkDetails = await Promise.all(artworkPromises);

        console.log('[Met] query:', filters.query, 'artworkDetails:', artworkDetails.length)
        return artworkDetails.filter(artwork => artwork !== null) as Artwork[];

    } catch (error) {
        console.error('Error searching Met Museum:', error)
        throw error
    }
}

const getMetObjectDetails = async (id: number): Promise<Artwork | null> => {
  try {
        const response = await axios.get(`${MET_API_URL}/objects/${id}`);
        const data = response.data;
        console.log('[Met] object details:', data);
        return {
            id: data.objectID.toString(),
            title: data.title || 'Untitled',
            artist: data.artistDisplayName || "Unknown",
            image: data.primaryImage,
            thumbnailURL: data.primaryImageSmall,
            department: data.department,
            classification: data.classification,
            date: data.objectDate,
            period: data.period,
            culture: data.culture,
            objectName: data.objectName,
            medium: data.medium,
            dimensions: data.dimensions,
            museum: 'met' as const,
            museumUrl: data.objectURL,
            isHighlight: data.isHighlight,
            tags: Array.isArray(data.tags) 
            ? data.tags.map((tag:any) => ({
                term: tag.term
            }))
            : undefined,
            }
    } catch (error) {
        console.error('Error getting Met object details:', error)
        throw error
    }
}

const searchHarvardMuseum = async (filters: SearchFilters, offset: number = 0): Promise<Artwork[]> => {
  try {
        if (!filters.query || filters.query.trim() === '') {
            return [];
        }

        const params = new URLSearchParams();
        params.append('apikey', HARVARD_API_KEY);
        params.append("size", "10");
        params.append("hasimage", "1");
        const page = Math.floor(offset / 10) + 1;
        params.append("page", page.toString());

      if (filters.artist.trim()) {
        params.append('person', filters.artist.trim())
      }

      if (filters.department.trim()) {
        params.append('department', filters.department.trim())
      }

      if (filters.medium.trim()) {
        params.append('medium', filters.medium.trim())
      }

      if (filters.classification.trim()) {
        params.append('classification', filters.classification.trim())
      }

      if (filters.country.trim()) {
        params.append('culture', filters.country.trim())
      }

      if (filters.dateFrom !== null) {
        params.append('datebegin', String(filters.dateFrom))
      }

      if (filters.dateTo !== null) {
        params.append('dateend', String(filters.dateTo))
      }

      if (filters.query) {
        params.append('q', filters.query)
      }

        const response = await axios.get(`${HARVARD_API_URL}?${params.toString()}`);
       
        console.log('[Harvard] response:', response.data.records.length)
        const records: Artwork[] = response.data.records.map((record: any) => {
            const imagePermissionLevel = record.imagepermissionlevel ?? 0
            const imageData = record.images?.[0]
            console.log('[Harvard] record:', record)
            let imageUrl: string | undefined

            if (imageData?.iiifbaseuri) {
                imageUrl = imagePermissionLevel === 1
                    ? `${imageData.iiifbaseuri}/full/256,/0/default.jpg`
                    : `${imageData.iiifbaseuri}/full/full/0/default.jpg`
            }

            if (!imageUrl && typeof record.primaryimageurl === 'string') {
                imageUrl = record.primaryimageurl
            }

            if (!imageUrl && typeof record.baseimageurl === 'string') {
                imageUrl = `${record.baseimageurl}?height=512&width=512`
            }

            return {
                id: record.id.toString(),
                title: record.title || 'Untitled',
                artist: record.people?.[0]?.name || 'Unknown',
                image: imageUrl,
                department: record.department,
                classification: record.classification,
                date: record.dated,
                period: record.period,
                culture: record.culture,
                objectName: record.objectname,
                medium: record.medium,
                dimensions: record.dimensions,
                museum: 'harvard' as const,
                museumUrl: record.url
            }
        })
        console.log('[Harvard] query:', filters.query, 'records:', records.length)
        return records
    } catch (error) {
        console.error('Error searching Harvard Museum:', error)
        throw error
    }
}

