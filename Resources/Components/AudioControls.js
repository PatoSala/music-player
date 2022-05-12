import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import YoutubePlayer from "react-native-youtube-iframe";
import Modal from "react-native-modal";

import { setCurrentSong } from '../../Redux/Slices/currentSongSlice';
import { addToQueue, removeFirstFromQueue } from '../../Redux/Slices/queueSlice';

function AudioControls() {

    const dispatch = useDispatch();
    const currentSong = useSelector((state) => state.currentSong.value);
    const queue = useSelector((state) => state.queue);
    console.log('queuew: ', queue);

    /* calculate elapsed time */

    const [elapsed, setElapsed] = useState(0);
    const playerRef = useRef();

    useEffect(() => {
        const interval = setInterval(async () => {
            const elapsed_sec = await playerRef.current.getCurrentTime();

            const elapsed_ms = Math.floor(elapsed_sec * 1000);
            const min = Math.floor(elapsed_ms / 60000);
            const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);

            setElapsed(
                min.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
            );

        }, 100);
    }, [])

    /* calculate elapsed time ends */

    const [playing, setPlaying] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            
            if (queue.value.length == 0) {
                setPlaying(false);
            } else {
                dispatch(setCurrentSong(queue.value[0]));
                dispatch(removeFirstFromQueue());
            }

        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    return (
        currentSong != undefined ? (
            <View style={styles.audioControls}>
                <Pressable style={styles.controls} onPress={toggleModal}>
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
                                currentSong.payload.name.length > 15 ? (currentSong.payload.name.slice(0, 15).concat('...')) : (currentSong.payload.name)
                            }</Text>
                            <Text style={styles.songArtist}>{currentSong.payload.artist}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.mediaButtons}>
                        <View>
                            <Text>{elapsed}</Text>
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

                        <TouchableOpacity
                            onPress={() => {
                                if (queue.value.length > 0) {
                                    dispatch(removeFirstFromQueue());
                                    dispatch(setCurrentSong(queue.value[0]));
                                }
                            }}
                        >
                            <Ionicons name='caret-forward-circle-outline' size={28}/>
                        </TouchableOpacity>
                    </View>

                    {/* <View
                        style={{
                            width: '100%',
                            height: 2,
                            backgroundColor: 'green'
                        }}
                    ></View> */}
                    
                </Pressable>
                
                <YoutubePlayer
                    height={0}
                    ref={playerRef}
                    play={playing}
                    videoId={currentSong.payload.videoId}
                    onChangeState={onStateChange}
                />

                <Modal
                    style={{
                        padding: 0,
                        margin: 0
                    }}
                    isVisible={isModalVisible}
                    onBackdropPress={toggleModal}
                    swipeDirection={"down"}
                    onSwipeComplete={toggleModal}
                >   
                    <View style={styles.modal}>
                        {/* <View style={styles.modalCurrentSong}>
                            <View
                                style={{
                                    width: '200',
                                    height: '200',
                                    backgroundColor: 'pink'
                                }}
                            ></View>
                        </View> */}
                        <View style={styles.modalMediaButtons}>
                            <TouchableOpacity>
                                <Ionicons name='caret-back-circle-outline' size={48}/>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Ionicons name='play' size={64}/>
                            </TouchableOpacity>
                            <TouchableOpacity>

                                <Ionicons name='caret-forward-circle-outline' size={48}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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
        borderRadius: 12,
        paddingHorizontal: 11
    },
    mediaButtons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    playButton: {
        paddingHorizontal: 10
    },
    currentSongInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modal: {
        width: '100%',
        height: '97%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    modalMediaButtons: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 60
    }
})