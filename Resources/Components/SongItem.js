import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../../Redux/Slices/currentSongSlice';
import { addToQueue } from '../../Redux/Slices/queueSlice';

function SongItem({name, artist, thumbnails, videoId}) {

    const currentSong = useSelector((state) => state.currentSong.value);
    const dispatch = useDispatch();

    const songData = {
        name: name,
        thumbnails: thumbnails,
        videoId: videoId,
        artist: artist
    }

    return (
        <TouchableOpacity 
            style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: currentSong != undefined ? (currentSong.payload.videoId === videoId ? '#e5e5ea' : 'white') : null,
                paddingVertical: 5,
                paddingHorizontal: 15
            }} 
            onLongPress={() => {Alert.alert(
                "",
                name,
                [
                    {
                        text: "Add to Queue",
                        onPress: () => {dispatch(addToQueue(songData))}
                    },
                    {
                        text: "Add to Playlist"
                    },
                    {
                        text: "Done",
                        AlertButtonStyle: 'cencel'
                    }
                ]
            )}}
            delayLongPress={600}
            onPress={() => {dispatch(setCurrentSong(songData))}}
        >
            <Image
                style={styles.songThumbnails}
                source={{uri: thumbnails.url, width: 52, height: 52}}
            />
            <View>
                <Text 
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: currentSong != undefined ? (currentSong.payload.videoId === videoId ? 'pink' : 'black') : null
                    }}
                >{
                    name.length > 20 ? (name.slice(0, 30).concat('...')) : (name)
                }</Text>
                <Text style={styles.songArtist}>{artist}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SongItem;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 5,
    },
    songThumbnails: {
        marginRight: 10
    },
    songName: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})