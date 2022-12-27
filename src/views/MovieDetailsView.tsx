import * as React from 'react';
import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { fetchMovie, fetchTrailerFromTMDb } from '../queries/fetchOMDbAPI';
import { Show } from '../components/MovieDetailsView/ShowTiles';
import { AdminProps } from '../App';
import AdminMovieDetailsView from '../components/MovieDetailsView/MovieDetailsViewAdmin';
import UserMovieDetailsView from '../components/MovieDetailsView/MovieDetailsViewUser';

export interface MovieDetailsViewUserAdminProps {
    selectedMovie: Movie,
    setSelectedMovie: React.Dispatch<Movie>,
    showData: Array<ShowCollection>,
}

interface MovieDetailsViewProps {
    selectedMovie: Movie | undefined,
    setSelectedMovie: React.Dispatch<Movie>,
    showData: Array<ShowCollection>,
    adminProps: AdminProps
}

interface TrailerType {
    id: string
    iso_639_1: string
    iso_3166_1: string
    key: string
    name: string
    official: boolean
    published_at: string
    site: string
    size: number
    type: string
}

export interface Movie {
    Title?: String | undefined,
    Poster?: string | undefined,
    Runtime?: String | undefined,
    Writer?: String | undefined,
    Actors?: String | undefined,
    Genre?: String | undefined,
    Rated?: String | undefined,
    Plot?: String | undefined,
    trailer: TrailerType | undefined,
}

export interface ShowCollection {
    date: Date,
    shows: Array<Show>
}

export const getIMDbIDFromURL = () => {
    let url = window.location.href;

    let aUrlParts = url.split("/")
    return aUrlParts[4]
}

function MovieDetailsView(props: MovieDetailsViewProps) {


    const setSelectedMovie = props.setSelectedMovie;

    useEffect(() => {
        let fetchedMovie: Movie | undefined;

        function appendTrailer(trailers: Array<TrailerType>) {
            trailers.map((item: TrailerType) => {
                if (item.type === "Trailer") {
                    setSelectedMovie({ ...fetchedMovie, trailer: item });
                    return true;
                } else {
                    setSelectedMovie({ ...fetchedMovie, trailer: undefined });
                    return false;
                }
            })
        }
        fetchMovie(getIMDbIDFromURL()).then((result) => {
            fetchedMovie = result;
            fetchTrailerFromTMDb(getIMDbIDFromURL()).then((trailers) => appendTrailer(trailers.results));
        })
    }, [setSelectedMovie]);

    return (
        <>
            {!props.adminProps.isAdmin && props.selectedMovie && <UserMovieDetailsView selectedMovie={props.selectedMovie} setSelectedMovie={props.setSelectedMovie} showData={props.showData}/>}

            {props.adminProps.isAdmin && props.selectedMovie && <AdminMovieDetailsView selectedMovie={props.selectedMovie} setSelectedMovie={props.setSelectedMovie} showData={props.showData}/>}

            {!props.selectedMovie && <Alert sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }} severity="error">Currently there is no data available</Alert>}
        </>
    );
}

export default MovieDetailsView;