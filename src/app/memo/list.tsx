import {View,  Text, StyleSheet} from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'

import Header from '../../components/Header'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import { Feather, AntDesign } from '@expo/vector-icons'
import Icon from '../../components/Icon'
import LogOutButton from '../../components/LogOutButton'

const List = (): JSX.Element => { //Indexページの定義
    const handlePress = (): void => {
        router.push('/memo/create')
    }

    const navigation = useNavigation()
    //画面が表示されたタイミングで一度だけ処理実行
    useEffect(()=>{
        navigation.setOptions({
            // headerRight: () => {return <Text>Test</Text>}
            headerRight: () => {return <LogOutButton />}
        })
    },[])

    return (
        <View style={styles.container}>
            <View>
                <MemoListItem />
                <MemoListItem />
                <MemoListItem />
            </View>
            <CircleButton onPress={handlePress}>
                {/* <Feather name='plus' size={40} /> */}
                <Icon name='plus' size={40} color='#ffffff' />
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
        // justifyContent: 'center',
        // alignItems: 'center'
    }
})

export default List