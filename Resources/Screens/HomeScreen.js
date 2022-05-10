import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import YoutubeMusicApi from 'youtube-music-api';

const api = new YoutubeMusicApi();

function HomeScreen() {

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    let searchEngine = (song) => {
        if (searchInput.length > 0) {
            try {
                api.search(song, "song").then(result => {
                    result.content.map(song => {
                        console.log(song.name);
                    })
                    setSearchResults(result.content)
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        api.initalize();
    }, []);

    return (
        <View style={styles.container}>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <TextInput 
                    placeholder='Search songs'
                    value={searchInput}
                    onTextChange={newValue => setSearchInput(newValue)}
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
            </View>
            {
                searchResults.length > 0 ? (
                    <Text>See results on console!</Text>
                ) : (
                    <Text>Home Screen</Text>
                )
            }
            <StatusBar style="auto" />
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