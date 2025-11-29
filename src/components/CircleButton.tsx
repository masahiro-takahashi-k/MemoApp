import {
    View, Text, StyleSheet, TouchableOpacity,
    type ViewStyle
} from 'react-native'

interface Props {
    children: JSX.Element
    style?: ViewStyle
    onPress?: () => void
}

const CircleButton = (props: Props): JSX.Element => {
    const {children, style, onPress} = props  //"＋"の表示、styleをpropsで受け取り
    return( //styleを受け取ったら上書きする
        <TouchableOpacity onPress={onPress} style={[styles.circleButton, style]}>
        {/* <View style={styles.circleButton}> */}
            <Text style={styles.circleButtonLabel}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    circleButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#467FD3',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',  //位置を指定
        right: 40,
        bottom: 40,
        shadowColor: '#000000',  //影をつける(IOS特有)
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: {width:0, height:8},
        elevation: 8  //影をつける(Android特有)
    },
    circleButtonLabel: {
        color: '#ffffff',
        fontSize: 40,
        lineHeight: 48
    }
})

export default CircleButton