import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import YoutubePlayer from "react-native-youtube-iframe";

function AudioControls({currentSong}) {
    const [playing, setPlaying] = useState(true);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    return (
        <View style={styles.audioControls}>
            <View style={styles.controls}>
                <View style={styles.currentSongInfo}>
                    <Image source={{uri: currentSong.thumbnails.url, width: 50, height: 50}}/>
                    <View style={{paddingLeft: 10}}>
                        <Text 
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: 'black'
                            }}
                        >{
                            currentSong.name.length > 20 ? (currentSong.name.slice(0, 20).concat('...')) : (currentSong.name)
                        }</Text>
                        <Text style={styles.songArtist}>{currentSong.artist}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePlaying}
                >
                    {
                        playing ? (
                            <Ionicons name='pause' size={32}/>
                        ) : (
                            <Ionicons name='play' size={32}/>
                        )
                    }
                </TouchableOpacity>
            </View>
            
            <YoutubePlayer
                height={0}
                play={playing}
                videoId={currentSong.videoId}
                onChangeState={onStateChange}
            />

        </View>
    )
}

export default AudioControls;

const styles = StyleSheet.create({
    audioControls: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 10,
        paddingHorizontal: 5
    },
    controls: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'pink',
        borderRadius: 10,
        paddingHorizontal: 10
    },
    currentSongInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})