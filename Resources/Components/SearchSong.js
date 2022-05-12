import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import YoutubeMusicApi from 'youtube-music-api';

import SongItem from './SongItem';

const api = new YoutubeMusicApi();

function SearchSong() {

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setSearches] = useState([]);
    const [searchBarOpen, setSearchBarOpen] = useState(false);

    let searchHistory = (song) => {
        let history = recentSearches;
        history.unshift(song);
        setSearches(history);
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
        searchEngine(searchInput);
    }, [searchInput])


    return (
        <View style={{
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            height: searchBarOpen ? '100%' : 50
        }}>
            <View
                style={{
                    width: '100%',
                    flexWrap: 'wrap',
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                    justifyContent: 'space-between',
                    zIndex: 1,
                }}
            >
                <TextInput 
                    placeholder='Songs, Artists and more...'
                    value={searchInput}
                    onFocus={() => !searchBarOpen ? setSearchBarOpen(!searchBarOpen) : null}
                    onChangeText={newValue => setSearchInput(newValue)}
                    onSubmitEditing={() => {
                        searchEngine(searchInput);
                        searchHistory(searchInput);
                    }}
                    style={{
                        backgroundColor: '#e5e5ea',
                        width: searchBarOpen ? '80%' : '100%',
                        height: 40,
                        borderRadius: 12,
                        paddingHorizontal: 20,
                        paddingVertical: 6,
                    }}
                />

                {searchBarOpen ? (
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 10
                        }}
                        onPress={() => {setSearchBarOpen(!searchBarOpen)}}
                    >
                        <Text
                            style={{
                                color: '#0a84ff',
                                fontWeight: '600'
                            }}
                        >Cancel</Text>
                    </TouchableOpacity>
                ) : (null)}

                {searchInput.length > 0 ? (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 90
                        }}
                        onPress={() => {
                            setSearchInput('');
                            setSearchResults([])
                        }}
                    >
                        <Ionicons name='close' size={'20'}/>
                    </TouchableOpacity>
                ) : (null)}

            </View>

            <ScrollView
                style={{
                    width: '100%',
                    height: '100%',
                    paddingBottom: searchResults.length > 0 ? 70 : 0
                }}
            >
                {
                    searchResults.length > 0 && searchBarOpen ? (
                        searchResults.map(song => {
                            return (
                                <SongItem
                                    name={song.name}
                                    artist={song.artist.name}
                                    thumbnails={song.thumbnails[0]}
                                    videoId={song.videoId}
                                />
                            )
                            })
                    ) : (
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 15
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 30,
                                    alignSelf: 'flex-start',
                                    marginBottom: 10
                                }}
                            >
                                Recent Searches
                            </Text>

                            {
                                recentSearches.length > 0 ? (
                                    recentSearches.map(searchItem => {
                                        return (
                                            <TouchableOpacity 
                                                style={styles.recentSearchItem}
                                                onPress={() => {
                                                    setSearchInput(searchInput)
                                                    searchEngine(searchItem)
                                                }}
                                            >
                                                <Ionicons name="reload" size={16}/>
                                                <Text style={styles.recentSearchTitle}>{searchItem}</Text>
                                            </TouchableOpacity>

                                        )
                                    })
                                ) : (null)
                            }

                        </View>
                    )
                }
            </ScrollView>

            <StatusBar style="auto" />

        </View>
    )
}

export default SearchSong;

const styles = StyleSheet.create({
    searchBarContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'purple',
      height: 50
    },
    recentSearchItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 5
    },
    recentSearchTitle: {
        paddingLeft: 10,
        fontSize: 16
    }
  });