import React, { useEffect, useState } from 'react';
import { Image, FlatList, Pressable } from 'react-native';
import { Text } from '../../components/Themed';
import MovieItem from '../../components/MovieItem';
import { Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Category, Movie } from '../../src/models';
import { DataStore } from '@aws-amplify/datastore';

interface HomeCategoryProps {
    category: Category,
}

const HomeCategory = (props: HomeCategoryProps) => {
    const { category } = props;

    const [movies, setMovies] = useState<Movie[]>([]);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchMovies = async () => {
            const result = (await DataStore.query(Movie))
                                .filter((movie) => movie.categoryID === category.id)
            setMovies(result);
        };

        fetchMovies();
    }, [])

    const onMoviePress = (movie: Movie) => {
       navigation.navigate('MovieDetailScreen', { id: movie.id }) 
    }
      
    Storage.list('photos/').then(result => console.log(result));

    return (
        <>
            <Text style={styles.title}>{category.title}</Text>
            <FlatList
                data={movies}
                renderItem={({item}) => <MovieItem movie={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
}

export default HomeCategory;
