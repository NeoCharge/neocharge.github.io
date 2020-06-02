
import React from 'react'
import { BarChart, XAxis, Grid, YAxis } from 'react-native-svg-charts'
import { View, Dimensions } from 'react-native'
import * as scale from 'd3-scale'
import { Svg, Rect, Line, G, Text, Defs, LinearGradient, Stop } from 'react-native-svg';
import Colors from '../assets/colors';

export default class MonthGraph extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log("logging props");
        console.log(this.props);
        this.state = {
            primary: this.props.primary.map((value) => ({ value })),
            secondary: this.props.secondary.map((value) => ({ value })),
            max: 0,
            scale: []
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

        const barData = [
            {
                data: this.state.primary,
                svg: {
                    fill: 'url(#gradient2)',
                    x: -1, //gives seperation within bar group
                },
            },
            {
                data: this.state.secondary,
                svg: {
                    fill: 'url(#gradient)',
                    x: +2, //gives seperation within bar group
                }
            },
        ]



        console.log(barData);

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

        const todayObj = new Date();
        const thisMonth = todayObj.getMonth();

        const monthAbrevs = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const monthStr = monthAbrevs[thisMonth];
        const yAxis = this.state.scale.map((value) => ({ value }));
        const xAxis = ["01 ".concat(monthStr), "07 ".concat(monthStr), "14 ".concat(monthStr), "21 ".concat(monthStr), "28 ".concat(monthStr)].map((value) => ({ value }));
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
                        spacingInner={.7}
                        spacingOuter={0.3}
                        gridMin={0}
                        numberOfTicks={6}
                        //grid
                        // svg={{rx:"20"}} tried to make edges round but doesn't work
                        yMax={this.state.max}
                    >
                        {/* <CustomBars bandwidth={10} /> */}
                        <CustomGrid belowChart={true} />
                        <Gradient />
                        <Gradient2 />
                    </BarChart>
                    <YAxis
                        scale={scale.scaleBand}
                        data={yAxis.reverse()}
                        yAccessor={({ item }) => item.value}
                        spacingInner={1}
                        //style={{ marginBottom: xAxisHeight }}
                        contentInset={contentInset}
                        svg={{ fontSize: 10, fill: Colors.secondary, paddingHorizontal: 20 }}
                        //formatLabel={(value) => value}
                        numberOfTicks={6}
                        yMax = {this.state.max}
                    />
                </View>
                <View style={{ width: '100%', alignSelf: 'stretch', paddingRight: 18 }}>
                    <XAxis
                        data={xAxis}
                        scale={scale.scaleBand}
                        //formatLabel={(value, index) => value}
                        labelStyle={{ color: 'black' }}
                        spacingInner={0.5}
                        spacingOuter={0.1}
                        svg={{ fill: Colors.secondary }}
                        style={{ height: xAxisHeight, width: '100%', alignSelf: 'stretch' }}
                        formatLabel={(_, index) => xAxis[index].value}
                    />
                </View>

            </View>
        )

    }

}