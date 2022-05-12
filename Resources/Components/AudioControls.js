import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import YoutubePlayer from "react-native-youtube-iframe";

import { setCurrentSong } from '../../Redux/Slices/currentSongSlice';
import { addToQueue, removeFirstFromQueue } from '../../Redux/Slices/queueSlice';

function AudioControls() {

    const dispatch = useDispatch();
    const currentSong = useSelector((state) => state.currentSong.value);
    const queue = useSelector((state) => state.queue);
    console.log('queuew: ', queue);

    const [playing, setPlaying] = useState(true);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            
            dispatch(setCurrentSong(queue.value[0]));
            dispatch(removeFirstFromQueue());

        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    return (
        currentSong != undefined ? (
            <View style={styles.audioControls}>
                <View style={styles.controls}>
                    <View style={styles.currentSongInfo}>
                        <Image source={{uri: currentSong.payload.thumbnails.url, width: 50, height: 50}}/>
                        <View style={{paddingLeft: 10}}>
                            <Text 
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: 'black'
                                }}
                            >{
                                currentSong.payload.name.length > 20 ? (currentSong.payload.name.slice(0, 20).concat('...')) : (currentSong.payload.name)
                            }</Text>
                            <Text style={styles.songArtist}>{currentSong.payload.artist}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.mediaButtons}>
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

                        <TouchableOpacity
                            onPress={() => {
                                if (queue.length >= 0) {
                                    dispatch(removeFirstFromQueue());
                                    dispatch(setCurrentSong(queue.value[0]));
                                }
                            }}
                        >
                            <Ionicons name='caret-forward-circle-outline' size={28}/>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
                <YoutubePlayer
                    height={0}
                    play={playing}
                    videoId={currentSong.payload.videoId}
                    onChangeState={onStateChange}
                />

            </View>
        ) : (null)
    )
}

export default AudioControls;

const styles = StyleSheet.create({
    audioControls: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 52,
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
    mediaButtons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    playButton: {
        paddingRight: 5
    },
    currentSongInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})