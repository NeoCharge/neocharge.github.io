
import React from 'react'
import { BarChart, XAxis, Grid, YAxis } from 'react-native-svg-charts'
import { View, Dimensions } from 'react-native'
import * as scale from 'd3-scale'
import { Svg, Rect, Line, G, Text, Defs, LinearGradient, Stop } from 'react-native-svg';
import Colors from '../assets/colors';

export default class YearGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log("logging props"); //BUG - if i don't include this print statement, then the primary and secondary values become undefined...
        console.log(this.props);
        this.state = {
            primary: this.props.primary.map((value) => ({ value })),
            secondary: this.props.secondary.map((value) => ({ value })),
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.primary !== this.props.primary || prevProps.secondary !== this.props.secondary) {
            this.setState({ primary: this.props.primary.map((value) => ({ value })), secondary: this.props.secondary.map((value) => ({ value })) });
        }
    }

    getLabeledData(data, labels) {
        const labeledData = []
        var i;
        for (i = 0; i < data.length; i++) {
            labeledData[i] = { value: data[i]["value"], label: labels[i] }
        }
        return labeledData;
    }

    yAccessor(item) {
        console.log(item);
        return item.value;
    }

    render() {

        const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const labeledPriData = this.getLabeledData(this.state.primary, labels);
        const labeledSecData = this.getLabeledData(this.state.secondary, labels);

        const barData = [
            {
                data: labeledPriData,
                svg: {
                    fill: Colors.secondary,
                    x: +3, //gives seperation within bar group
                },
            },
            {
                data: labeledSecData,
                svg: {
                    fill: 'url(#gradient)',
                    x: +8, //gives seperation within bar group
                }
            },
        ]



        console.log(barData);

        const CustomGrid = ({ x, y, values, ticks}) => (
            <G>
                {// Horizontal grid
                    values.map(function (value, index) {
                        console.log(value);
                        return (<Line key={value} x1={"0%"} x2={"100%"} y1={y(value)} y2={y(value)} stroke={"grey"} />);
                    })
                }
            </G>
        );

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient spreadMethod={"pad"} id={"gradient"} x1={"0%"} y1={"70%"} x2={"70%"} y2={"0%"}>
                    <Stop offset={"0%"} stopColor={"#11645c"} stopOpacity={"1"} />
                    <Stop offset={"100%"} stopColor={Colors.accent1} stopOpacity={"1"} />
                </LinearGradient>
            </Defs>
        )




        const yValues = [0, 50, 100, 150, 200, 250, 300];
        const yAxis = yValues.map((value) => ({ value }));
        const contentInset = { top: 30, bottom: 15 };
        const xAxisHeight = 30;
        const width = Dimensions.get('window').width

        return (
            <View style={{ width: "100%", alignSelf: 'stretch' }}>
                <View style={{ height: 250, width: "100%", flexDirection: "row", paddingRight: '5%', alignItems: "center", alignSelf: 'stretch' }}>

                    <BarChart
                        style={{ height: 250, width: "100%", paddingRight: 10, alignSelf: 'stretch' }}
                        data={barData}
                        yAccessor={({ item }) => item.value}
                        contentInset={contentInset}
                        {...this.props}
                        // svg={{color: "white"}}
                        spacingInner={0.45}
                        spacingOuter={0.30}
                        gridMin={0}
                        //grid
                        // svg={{rx:"20"}} tried to make edges round but doesn't work
                        yMax={300}
                    >
                        {/* <CustomBars bandwidth={10} /> */}
                        <CustomGrid belowChart={true} values={yValues} />
                        <Gradient />
                    </BarChart>
                    <YAxis
                        data={yAxis}
                        yAccessor={({ item }) => item.value}
                        //style={{ marginBottom: xAxisHeight }}
                        contentInset={contentInset}
                        svg={{ fontSize: 10, fill: Colors.secondary, paddingHorizontal: 20, height: 250 }}
                        formatLabel={(value) => value}
                        numberOfTicks={5}
                    />
                </View>
                <View style={{ width: '100%', alignSelf: 'stretch', paddingRight: 18 }}>
                    <XAxis
                        data={labeledPriData}
                        scale={scale.scaleBand}
                        //formatLabel={(value, index) => index}
                        labelStyle={{ color: 'black' }}
                        spacingInner={0.45}
                        spacingOuter={0.30}
                        svg={{ fill: Colors.secondary }}
                        style={{ height: xAxisHeight, width: '100%', alignSelf: 'stretch' }}
                        formatLabel={(_, index) => labeledPriData[index].label}
                    />
                </View>

            </View>
        )

    }

}