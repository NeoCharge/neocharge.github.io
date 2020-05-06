
import React from 'react'
import { BarChart, XAxis, Grid, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'
import * as scale from 'd3-scale'
import { Svg, Rect, Line, G, Text } from 'react-native-svg';
import Colors from '../assets/colors';

export default class WeekGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log("logging props");
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

    getDayName(dayVal) {
        switch (dayVal) {
            case 0:
                return "Sun";
            case 1:
                return "Mon";
            case 2:
                return "Tues";
            case 3:
                return "Wed";
            case 4:
                return "Thurs";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
        }
    }

    getXAxisLabels() {
        let day = new Date().getDay();
        let labels = [];
        var j = 0;
        var i;
        console.log(day);
        for (i = day + 1; i < 7; i++) {
            labels[j] = this.getDayName(i);
            console.log(this.getDayName(i));
            j++;
        }
        for (i = 0; i <= day; i++) {
            labels[j] = this.getDayName(i);
            console.log(this.getDayName(i));
            j++;
        }
        return labels;
    }

    getYAxisLabels() {
        const labels = [];

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

        // const svgVal = <Svg height="100" width="1" fill={Colors.secondary}>
        //     <Line fill={Colors.secondary} />
        // </Svg>

        const labels = this.getXAxisLabels();
        const labeledPriData = this.getLabeledData(this.state.primary, labels);
        const labeledSecData = this.getLabeledData(this.state.secondary, labels);

        const barData = [
            {
                data: labeledPriData,
                svg: {
                    fill: Colors.secondary
                },
            },
            {
                data: labeledSecData,
                svg: {
                    fill: Colors.accent1
                }
            },
        ]



        console.log(barData);

        const CustomGrid = ({ x, y, data, ticks }) => (
            <G>
                {// Horizontal grid
                    ticks.map(function(tick, index) { 
                        if (index%2==0) {
                            return (<Line key={tick} x1={"0%"} x2={"100%"} y1={y(tick)} y2={y(tick)} stroke={"grey"} />); 
                        }
                    })
                }
            </G>
        );

        

        

        const yAxis = [0, 2, 4, 6, 8, 10].map((value) => ({ value }));
        const contentInset = { top: 30, bottom: 30 };
        const xAxisHeight = 30;

        return (
            <View>
                <View style={{ height: 300, width:"100%", flexDirection: "row", paddingHorizontal: 40, alignItems: "center", padding: 10}}>

                    <BarChart
                        style={{ height: 300, width: "100%", padding:10 }}
                        data={barData}
                        yAccessor={({ item }) => item.value}
                        contentInset={contentInset}
                        {...this.props}
                        spacingInner={0.8}
                        grid
                        yMax={10}
                    >
                        <CustomGrid belowChart={true} />
                    </BarChart>
                    <YAxis
                        data={yAxis}
                        yAccessor={({ item }) => item.value}
                        //style={{ marginBottom: xAxisHeight }}
                        contentInset={contentInset}
                        svg={{ fontSize: 10, fill: Colors.secondary, paddingHorizontal:20, padding:10 }}
                        formatLabel={(value) => value}
                        numberOfTicks={5}
                    />
                </View>
                <View style={{ paddingHorizontal: 35 }}>
                    <XAxis
                        data={labeledPriData}
                        scale={scale.scaleBand}
                        formatLabel={(value, index) => index}
                        labelStyle={{ color: 'black' }}
                        spacingInner={0}
                        svg={{ fill: Colors.secondary }}
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        formatLabel={(_, index) => labeledPriData[index].label}
                    />
                </View>

            </View>
        )

    }

}