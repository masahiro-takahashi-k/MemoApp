import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import { Link } from 'expo-router'
import Icon from './Icon'
import { type Memo } from '../../types/memo'
import { deleteDoc, doc } from 'firebase/firestore'

interface Props {
    memo: Memo
}
import {auth,db} from '../config'

const handlePress = (id: string): void =>{ //削除機能
    if (auth.currentUser === null) {return}
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    Alert.alert('メモを削除します', 'よろしいですか？',[
        {
            text: 'キャンセル'
        },
        {
            text: '削除する',
            style: 'destructive', //IOSで赤字で表示
            onPress: ()=>{
                deleteDoc(ref) //ここで削除
                    .catch(() => {Alert.alert('削除に失敗しました')})
            }
        }
    ])
}

const MemoListItem = (props: Props): JSX.Element | null => {
    const {memo} = props
    const {bodyText, updatedAt} = memo
    if (bodyText === null || updatedAt === null) {return null}
    const dateString = updatedAt.toDate().toLocaleString('ja-JP')
    return(
        <Link
            // href = '/memo/detail'
            href = {{pathname: '/memo/detail', params:{id: memo.id} }}
            asChild
        >
            <TouchableOpacity style={styles.memoListItem}>
                <View>
                    <Text numberOfLines={1} style={styles.memoListItemTitle}>{bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{dateString}</Text>
                    {/* <Text style={styles.memoListItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemDate}>2025年12月1日 10:00</Text> */}
                </View>
                <TouchableOpacity onPress={()=>{handlePress(memo.id)}}>
                    <Icon name='delete' size={32} color='#B0B0B0' />
                </TouchableOpacity>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    memoListItem: {
        backgroundColor: '#ffffff',
        flexDirection: 'row', //要素を横に配置
        justifyContent: 'space-between', //要素の間にスペース
        paddingVertical: 16, //余白を設ける(縦)
        paddingHorizontal: 19, //余白を設ける(横)
        alignItems: 'center', //削除ボタンを真ん中に,
        borderBottomWidth: 1, //ボーダー
        borderColor: 'rgba(0,0,0,0.15)' //ボーダー色
    },
    memoListItemTitle: {
        fontSize: 16,
        lineHeight: 32
    },
    memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: '#848484'
    }
})

export default MemoListItem