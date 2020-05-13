import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg'
import Colors from '../assets/colors';
import { View, Dimensions, StyleSheet, Image, Text } from 'react-native'

export default class PowerPieChart extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log("logging props"); //BUG - if i don't include this print statement, then the priTotal and secTotal values become undefined...
        console.log(this.props);
        this.state = {
            priTotal: this.props.priTotal,
            secTotal: this.props.secTotal,
            type: this.props.type

        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.priTotal !== this.props.priTotal || prevProps.secTotal !== this.props.secTotal || prevProps.type !== this.props.type) {
            this.setState({ priTotal: this.props.priTotal, secTotal: this.props.secTotal, type: this.props.type });
        }
    }

    render() {

        const { labelWidth, priTotal, secTotal, type } = this.state;

        console.log(priTotal);
        console.log(secTotal);
        const total = priTotal + secTotal;
        const displayTotal = type == "Year" ? (total / 1000).toFixed(1) + "K" : total.toString();

        console.log(total);

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
                amount: secTotal,
                svg: { fill: 'url(#gradient)' },
            },
            {
                key: 2,
                amount: priTotal,
                svg: { fill: Colors.secondary }
            }
        ];

        const label1 = "Total kWh";
        const label2 = "This " + type;


        return (
            <View style={{ height: 250, flexDirection: 'row', flex: 1 }}>
                <View style={styles.leftImageContainer}>
                    <View style={{ paddingBottom: 40 }}>
                        <Image
                            style={styles.leftImageStyle}
                            source={require('../assets/Appliance-Out-Of-Use.png')}
                            resizeMode='contain' />
                        <Text style={styles.imageTotalTextLeft}>
                            {this.state.priTotal}kWh
                        </Text>
                        <Text style={styles.imageLabelText}>
                            Primary
                        </Text>
                    </View>
                </View>
                <PieChart
                    style={{ borderRadius:200, justifyContent: 'center', flex:2.5, paddingBottom: 40 }}
                    valueAccessor={({ item }) => item.amount}
                    data={data}
                    spacing={0}
                    outerRadius={"90%"}
                    innerRadius={"83%"}
                >
                    <SvgText
                        style={{
                            position: 'absolute',
                            textAlign: 'center',
                            fill: Colors.secondary,
                            fontSize: 30,
                            textAnchor: 'middle',
                            fontWeight: 'bold'
                        }}>
                        {displayTotal}
                    </SvgText>
                    <SvgText
                        dy={23}
                        style={{
                            position: 'absolute',
                            textAlign: 'center',
                            fill: Colors.secondary,
                            fontSize: 15,
                            textAnchor: 'middle',
                        }}>

                        {`${label1}`}
                    </SvgText>
                    <SvgText
                        dy={46}
                        style={{
                            position: 'absolute',
                            textAlign: 'center',
                            fill: Colors.secondary,
                            fontSize: 15,
                            textAnchor: 'middle',
                        }}>

                        {`${label2}`}
                    </SvgText>
                    <Gradient />
                </PieChart>
                <View style={styles.rightImageContainer}>
                    <View style={{ paddingBottom: 40, alignItems: 'center' }}>
                        <Image
                            style={styles.rightImageStyle}
                            source={require('../assets/Car-Green-Gradient.png')}
                            resizeMode='contain' />
                        <Text style={styles.imageTotalTextRight}>
                            {this.state.secTotal}kWh
                        </Text>
                        <Text style={styles.imageLabelText}>
                            Secondary
                        </Text>
                    </View>
                </View>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    leftImageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: "3%",
        flexDirection: 'column',
        alignItems: 'center',
    },
    rightImageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingRight: "3%",
        flexDirection: 'column',
        alignItems: 'center',
    },
    leftImageStyle: {
        width: 40,
        height: 40,
    },
    rightImageStyle: {
        width: 70,
        height: 40,
    },
    imageLabelText: {
        fontSize: 15,
        color: "white",
        paddingTop: 3,
    },
    imageTotalTextRight: {
        fontSize: 20,
        color: Colors.accent1,
        paddingTop: 3,
        fontWeight:'bold'
    },
    imageTotalTextLeft: {
        fontSize: 20,
        color: "white",
        paddingTop: 3,
        fontWeight:'bold'
    }


});