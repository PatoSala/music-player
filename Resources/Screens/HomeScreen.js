import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import YoutubeMusicApi from 'youtube-music-api';
import { Audio } from 'expo-av';

import SongItem from '../Components/SongItem';
import AudioControls from '../Components/AudioControls';

const api = new YoutubeMusicApi();

function HomeScreen() {

    const [currentSong, setCurrentSong] = useState(undefined);
    const [queue, setQueue] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    let addToQueue = (videoId) => {
        let modifiedQueue = queue;
        modifiedQueue.push(videoId);
        setQueue(modifiedQueue);
    }

    let searchEngine = (song) => {
        if (searchInput.length > 0) {
            try {
                api.search(song, "song").then(result => {
                    setSearchResults(result.content);
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        api.initalize();
    }, []);

    useEffect(() => {
        console.log("queue: ", queue);
    }, [queue])

    return (
        <View style={styles.container}>
            {console.log(searchResults)}
            <View
                style={{
                    width: '100%',
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    backgroundColor: 'white',
                }}
            >
                <TextInput 
                    placeholder='Search songs'
                    value={searchInput}
                    onChangeText={newValue => setSearchInput(newValue)}
                    onSubmitEditing={() => {searchEngine(searchInput)}}
                    style={{
                        backgroundColor: '#e5e5ea',
                        width: '100%',
                        height: 40,
                        borderRadius: 500,
                        paddingHorizontal: 20,
                        paddingVertical: 6
                    }}
                />

                {searchInput.length > 0 ? (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 15
                        }}
                        onPress={() => {setSearchInput('')}}
                    >
                        <Ionicons name='close' size={'20'}/>
                    </TouchableOpacity>
                ) : (null)}

            </View>

            <ScrollView
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                {
                    searchResults.length > 0 ? (
                        searchResults.map(song => {
                            return (
                                <SongItem
                                    name={song.name}
                                    artist={song.artist.name}
                                    thumbnails={song.thumbnails[0]}
                                    videoId={song.videoId}
                                    currentSong={currentSong}
                                    setCurrentSong={setCurrentSong}
                                />
                            )
                            })
                    ) : (
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text>Home Screen</Text>
                        </View>
                    )
                }
            </ScrollView>

            <StatusBar style="auto" />
            
            {
                currentSong === undefined ? (
                    null
                ) : (
                    <AudioControls
                        currentSong={currentSong}
                    />
                )
            }

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });