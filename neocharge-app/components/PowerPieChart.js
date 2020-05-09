import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text, Defs, LinearGradient, Stop } from 'react-native-svg'
import Colors from '../assets/colors';
import { View, Dimensions } from 'react-native'

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
        const displayTotal = type == "Year" ? (total/1000).toFixed(1) + "K" : total.toString();

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
            <View style={{ alignSelf: "stretch" }}>
                <PieChart
                    style={{ height: 250, justifyContent: 'center', paddingBottom: 75 }}
                    valueAccessor={({ item }) => item.amount}
                    data={data}
                    spacing={0}
                    outerRadius={"90%"}
                    innerRadius={"80%"}
                >
                    <Text
                        style={{
                            position: 'absolute',
                            textAlign: 'center',
                            fill: Colors.secondary,
                            fontSize: 30,
                            textAnchor: 'middle',
                            fontWeight: 'bold'
                        }}>
                        {displayTotal}
                    </Text>
                    <Text
                        dy={23}
                        style={{
                            position: 'absolute',
                            textAlign: 'center',
                            fill: Colors.secondary,
                            fontSize: 15,
                            textAnchor: 'middle',
                        }}>

                        {`${label1}`}
                    </Text>
                    <Text
                        dy={46}
                        style={{
                            position: 'absolute',
                            textAlign: 'center',
                            fill: Colors.secondary,
                            fontSize: 15,
                            textAnchor: 'middle',
                        }}>

                        {`${label2}`}
                    </Text>
                    <Gradient />
                </PieChart>
            </View>
        )
    }

}