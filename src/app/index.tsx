import {Redirect} from 'expo-router'

const Index = (): JSX.Element  => {
    // return <Redirect href='memo/list' />
    // return <Redirect href='memo/edit' />
    // return <Redirect href='memo/detail' />
    // return <Redirect href='memo/create' />
    return <Redirect href='auth/log_in' />
    // return <Redirect href='auth/sign_up' />
}

export default Index


// import {View,  StyleSheet} from 'react-native'

// import Header from '../components/Header'
// import MemoListItem from '../components/MemoListItem'
// import CircleButton from '../components/CircleButton'

// const Index = (): JSX.Element => { //Indexページの定義
//     return (
//         <View style={styles.container}>
//             <Header />
//             <View>
//                 <MemoListItem />
//                 <MemoListItem />
//                 <MemoListItem />
//             </View>
//             <CircleButton>＋</CircleButton>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff'
//         // justifyContent: 'center',
//         // alignItems: 'center'
//     }
// })

// export default Index