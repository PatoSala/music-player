import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import YoutubeMusicApi from 'youtube-music-api';
import { Audio } from 'expo-av';


import SongItem from '../Components/SongItem';
import AudioControls from '../Components/AudioControls';
import SearchSong from '../Components/SearchSong';

const api = new YoutubeMusicApi();

function HomeScreen() {

    const currentSong = useSelector((state) => state.currentSong.value);

    return (
        <>
            <SearchSong/>
        </>
    )
}

export default HomeScreen;