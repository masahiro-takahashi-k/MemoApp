import {View,  Text, StyleSheet, FlatList} from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

import Header from '../../components/Header'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import { Feather, AntDesign } from '@expo/vector-icons'
import Icon from '../../components/Icon'
import LogOutButton from '../../components/LogOutButton'
import {db,auth} from '../../config'
import { type Memo } from '../../../types/memo'

const List = (): JSX.Element => { //Indexページの定義
    const handlePress = (): void => {
        router.push('/memo/create')
    }

    const [memos, setMemos] = useState<Memo[]>([]) //TypeScriptの型定義<>

    const navigation = useNavigation()

    //画面が表示されたタイミングで一度だけ処理実行
    useEffect(()=>{
        navigation.setOptions({
            // headerRight: () => {return <Text>Test</Text>}
            headerRight: () => {return <LogOutButton />}
        })
    },[])

    //メモのデータを監視しそれを画面に反映（リアルタイムにデータ更新）
    useEffect(()=>{
        if (auth.currentUser === null) {return}
        const ref=collection(db, `users/${auth.currentUser.uid}/memos`)
        const q = query(ref, orderBy('updatedAt', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot)=>{ //メモのデータを監視：onSnapshot
            const remoteMemos: Memo[] = [] //useStateに入れる前の一時保管
            snapshot.forEach((doc)=>{
                // console.log('memo', doc.data())
                const {bodyText, updatedAt} = doc.data() //doc.dataから分割代入
                remoteMemos.push({ //pushで配列にデータを入れる
                    id: doc.id,
                    bodyText,
                    updatedAt
                })
            })
            setMemos(remoteMemos) //useStateのmemosにremoteMemosの内容を入れる
        })
        return unsubscribe //画面が消える時にonSnapshotの監視をキャンセルする
    },[])

    return (
        <View style={styles.container}>
            <FlatList
                data={memos}
                renderItem={({item})=> <MemoListItem memo={item}/>}
            />
            {/* <View>
                {memos.map((memo) => <MemoListItem key={memo.id} memo={memo} />)}
            </View> */}
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