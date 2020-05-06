
import React from 'react'
import { BarChart, XAxis, Grid } from 'react-native-svg-charts'
import { View } from 'react-native'
import * as scale from 'd3-scale'
import { Svg, Rect, Line, G } from 'react-native-svg';
import Colors from '../assets/colors';

export default class MonthGraph extends React.PureComponent {

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
            this.setState({ primary: this.props.primary.map((value) => ({ value })),  secondary: this.props.secondary.map((value) => ({ value }))});
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
        for (i = day+1; i < 7; i++) {
            labels[j]=this.getDayName(i);
            console.log(this.getDayName(i));
            j++;
        }
        for (i = 0; i <= day; i++){
            labels[j]=this.getDayName(i);
            console.log(this.getDayName(i));
            j++;
        }
        return labels;
    }

    getLabeledData(data, labels) {
        const labeledData = []
        var i;
        for (i = 0; i < data.length; i++) {
            labeledData[i] = {value: data[i]["value"], label: labels[i]}
        }
        return labeledData;
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
                    ticks.map(tick => (
                        <Line key={tick} x1={"0%"} x2={"100%"} y1={y(tick)} y2={y(tick)} stroke={"grey"} />
                    ))}
            </G>
        );

        return (
            <View>
                <View style={{ height: 200, padding: 20, alignItems: "center" }}>
                    <BarChart
                        style={{ height: 200, width: "80%" }}
                        data={barData}
                        yAccessor={({ item }) => item.value}
                        contentInset={{ top: 30, bottom: 30 }}
                        {...this.props}
                        spacingInner={0.8}
                        grid
                    >
                        <CustomGrid belowChart={true} />
                    </BarChart>
                </View>
                <View style={{paddingHorizontal: 35 }}>
                    <XAxis
                        data={labeledPriData}
                        scale={scale.scaleBand}
                        formatLabel={(value, index) => index}
                        labelStyle={{ color: 'black' }}
                        spacingInner={0}
                        svg={{ fill: Colors.secondary }}
                        formatLabel={(_, index) => labeledPriData[ index ].label}
                    />
                </View>
            </View>
        )

    }

}