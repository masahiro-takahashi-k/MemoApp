import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { useFonts } from "expo-font"

import fontData from '../../assets/fonts/icomoon.ttf'
import fontSelection from '../../assets/fonts/selection.json'

const CustomIcon = createIconSetFromIcoMoon(
    fontSelection,
    'IcoMoon',
    'icomoon.ttf'
)

interface Props {
    name: string
    size: number
    color: string
}

const Icon = (props: Props): JSX.Element | null => {
    const {name, size, color} = props
    const [fontLoaded] = useFonts({
        IcoMoon: fontData
    })
    if (!fontLoaded) { //読み込まれていない場合の処理
        return null
    }

    return (
        // <CustomIcon name='plus' size={40} color='red' />
        <CustomIcon name={name} size={size} color={color} />
    )
}

export default Icon
