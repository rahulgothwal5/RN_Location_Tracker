import {Context as LocationContext} from '../context/LocationContext';
import {Context as TrackContext} from '../context/TrackContext';
import {useContext} from "react";
import {navigate} from "../navigationRef";

export default () => {

    const {saveTrack} = useContext(TrackContext);
    const {data: {name, location},reset} = useContext(LocationContext);

    const addTrackToList = async () => {
        await saveTrack(name, location)
        reset();
        navigate('TrackListScreen');
    };

    return [addTrackToList]
};