import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { Link } from 'expo-router'
import Icon from './Icon'

const MemoListItem = (): JSX.Element => {
    return(
        <Link href = '/memo/detail' asChild>
            <TouchableOpacity style={styles.memoListItem}>
                <View>
                    <Text style={styles.memoListItemTitle}>買い物リスト</Text>
                    <Text style={styles.memoListItemDate}>2025年12月1日 10:00</Text>
                </View>
                <TouchableOpacity>
                    {/* <Text>X</Text> */}
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