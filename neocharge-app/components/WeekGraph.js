
import React from 'react'
import { BarChart, XAxis, Grid, YAxis } from 'react-native-svg-charts'
import { View, Dimensions } from 'react-native'
import * as scale from 'd3-scale'
import { Svg, Rect, Line, G, Text, Defs, LinearGradient, Stop} from 'react-native-svg';
import Colors from '../assets/colors';

export default class WeekGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log("logging props"); //BUG - if i don't include this print statement, then the primary and secondary values become undefined...
        console.log(this.props);
        this.state = {
            primary: this.props.primary.map((value) => ({ value })),
            secondary: this.props.secondary.map((value) => ({ value })),
            max: 0,
            scale: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.primary !== this.props.primary || prevProps.secondary !== this.props.secondary) {
            this.setState({ primary: this.props.primary.map((value) => ({ value })), secondary: this.props.secondary.map((value) => ({ value })) });
        }
    }

    getScale(primary, secondary) {
        var tempMax = 0;
        primary.forEach(x => { if (x.value > tempMax) { tempMax = x.value } });
        secondary.forEach(x => { if (x.value > tempMax) { tempMax = x.value } });

        //get next highest multiple of 5
        this.state.max = Math.ceil(tempMax / 5) * 5;
        if (tempMax <= 10) {
            return [0, 2, 4, 6, 8, 10];
        } else {
            var i;
            var j = 0;
            const increment = this.state.max / 5;
            var l = [];
            for (i = 0; i <= this.state.max; i += increment) {
                l[j++] = i
            }
            return l;
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
        for (i = day + 1; i < 7; i++) {
            labels[j] = this.getDayName(i);
            j++;
        }
        for (i = 0; i <= day; i++) {
            labels[j] = this.getDayName(i);
            j++;
        }
        return labels;
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
                    fill: 'url(#gradient2)',
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

        const CustomGrid = ({ x, y, data, ticks }) => (
            <G>
                {// Horizontal grid
                    // ticks.map(function (tick, index) {
                    //     if (index % 2 == 0) {
                    //         return (<Line key={tick} x1={"0%"} x2={"100%"} y1={y(tick)} y2={y(tick)} stroke={"grey"} />);
                    //     }
                    // })

                    this.state.scale.map(
                        function(value) {
                            console.log("here are ticks");
                            console.log(ticks);
                            return (<Line key={value} x1={"0%"} x2={"100%"} y1={y(value)} y2={y(value)} stroke={"grey"} />);
                        }
                    )
                    
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

        const Gradient2 = () => (
            <Defs key={'gradient2'}>
                <LinearGradient spreadMethod={"pad"} id={"gradient2"} x1={"0%"} y1={"70%"} x2={"70%"} y2={"0%"}>
                    <Stop offset={"0%"} stopColor={"#aeaeae"} stopOpacity={"1"} />
                    <Stop offset={"100%"} stopColor={Colors.secondary} stopOpacity={"1"} />
                </LinearGradient>
            </Defs>

        )

        this.state.scale = this.getScale(this.state.primary, this.state.secondary);
        console.log("scale is... ");
        console.log(this.state.scale);




        const yAxis = this.state.scale.map((value) => ({ value }));
        const contentInset = { top: 30, bottom: 15 };
        const xAxisHeight = 30;
        const width = Dimensions.get('window').width

        return (
            <View style={{ width: "100%", alignSelf: 'stretch'}}>
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
                        numberOfTicks={6}
                        //grid
                        // svg={{rx:"20"}} tried to make edges round but doesn't work
                        yMax={this.state.max}
                    >
                        {/* <CustomBars bandwidth={10} /> */}
                        <CustomGrid belowChart={true} />
                        <Gradient/>
                        <Gradient2 />
                    </BarChart>
                    <YAxis
                        data={yAxis.reverse()}
                        scale={scale.scaleBand}
                        yAccessor={({ item }) => item.value}
                        spacingInner={1}
                        //style={{ marginBottom: xAxisHeight }}
                        contentInset={contentInset}
                        svg={{ fontSize: 10, fill: Colors.secondary, paddingHorizontal: 20 }}
                        formatLabel={(value) => value}
                        numberOfTicks={6}
                        yMax={this.state.max}
                    />
                </View>
                <View style={{ width: '100%', alignSelf: 'stretch', paddingRight:18}}>
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