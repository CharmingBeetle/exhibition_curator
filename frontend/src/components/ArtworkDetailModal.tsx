import type { Artwork } from '../types/artwork';

type ArtworkDetailModalProps = {
    artwork: Artwork
    onClose: () => void
}

function ArtworkDetailModal({ artwork, onClose }: ArtworkDetailModalProps) {

    return (
        <div className="artwork-detail-modal" role="presentation" onClick={onClose}>
            <div className='artwork-modal' role="dialog" onClick={(e) => e.stopPropagation()}>
                <h1>{artwork.title}</h1>
                <img
                    src={artwork.image}
                    alt={artwork.title}
                    width={500}
                    height={500}
                    onError={(event) => {
                        event.currentTarget.src = 'https://picsum.photos/id/321/200/200/?blur=5'
                    }} />
                <p>{artwork.artist}</p>
                <p>{artwork.museum.charAt(0).toUpperCase() + artwork.museum.slice(1)}</p>
                <p>{artwork.date}</p>
                <p>{artwork.medium}</p>
                <p>{artwork.dimensions}</p>
                <p>{artwork.classification}</p>
                <p>{artwork.country}</p>
                <p>{artwork.culture}</p>
                <p>{artwork.objectName}</p>
                <p>{artwork.description}</p>
                <hr />
                {artwork.tags && artwork.tags.length > 0 && (
                    <div className="artwork-modal__tags">
                        <h2>Tags</h2>
                        <div className="artwork-modal__tag-list">
                            {artwork.tags.map((tag) => (
                                <span key={tag.term} className="artwork-modal__tag">
                                    #{tag.term?.trim().replace(/\s+/g, '')}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                <a
                    href={artwork.museumUrl}
                    target="_blank"
                    rel="noopener noreferrer">View in {artwork.museum.charAt(0).toUpperCase() + artwork.museum.slice(1)}
                </a>
                <hr />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default ArtworkDetailModal