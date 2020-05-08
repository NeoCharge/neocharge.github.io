import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text, Defs, LinearGradient, Stop } from 'react-native-svg'
import Colors from '../assets/colors';
import { View} from 'react-native'

export default class PowerPieChart extends React.PureComponent {

    render() {

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient spreadMethod={"pad"} id={"gradient"} x1={"0%"} y1={"70%"} x2={"70%"} y2={"0%"}>
                    <Stop offset={"0%"} stopColor={"#11645c"} stopOpacity={"1"} />
                    <Stop offset={"100%"} stopColor={Colors.accent1} stopOpacity={"1"} />
                </LinearGradient>
            </Defs>
        )

        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: 'url(#gradient)' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: Colors.secondary }
            }
        ]

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </Text>
                )
            })
        }

        return (
            <View style={{alignSelf:"stretch"}}>
                <PieChart
                    style={{ height: 250, justifyContent:'center', paddingBottom: 75 }}
                    valueAccessor={({ item }) => item.amount}
                    data={data}
                    spacing={0}
                    outerRadius={"90%"}
                    innerRadius={"80%"}
                >
                    <Gradient />
                </PieChart>
            </View>
        )
    }

}