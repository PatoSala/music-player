import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

function SongItem({name, artist, thumbnails, videoId, currentSong, setCurrentSong, addToQueue}) {

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
                backgroundColor: currentSong != undefined ? (currentSong.videoId === videoId ? '#e5e5ea' : 'white') : null,
                paddingVertical: 5,
                paddingHorizontal: 5
            }} 
            onPress={() => {setCurrentSong(songData)}}>
            <Image
                style={styles.songThumbnails}
                source={{uri: thumbnails.url, width: 52, height: 52}}
            />
            <View>
                <Text 
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: currentSong != undefined ? (currentSong.videoId === videoId ? 'pink' : 'black') : null
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