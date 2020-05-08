
import React from 'react'
import { BarChart, XAxis, Grid, YAxis } from 'react-native-svg-charts'
import { View, Dimensions } from 'react-native'
import * as scale from 'd3-scale'
import { Svg, Rect, Line, G, Text, Defs, LinearGradient, Stop} from 'react-native-svg';
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
            this.setState({ primary: this.props.primary.map((value) => ({ value })), secondary: this.props.secondary.map((value) => ({ value })) });
        }
    }

    // getDayName(dayVal) {
    //     switch (dayVal) {
    //         case 0:
    //             return "Sun";
    //         case 1:
    //             return "Mon";
    //         case 2:
    //             return "Tues";
    //         case 3:
    //             return "Wed";
    //         case 4:
    //             return "Thurs";
    //         case 5:
    //             return "Fri";
    //         case 6:
    //             return "Sat";
    //     }
    // }

    // getXAxisLabels() {
    //     let day = new Date().getDay();
    //     let labels = [];
    //     var j = 0;
    //     var i;
    //     console.log(day);
    //     for (i = day + 1; i < 7; i++) {
    //         labels[j] = this.getDayName(i);
    //         console.log(this.getDayName(i));
    //         j++;
    //     }
    //     for (i = 0; i <= day; i++) {
    //         labels[j] = this.getDayName(i);
    //         console.log(this.getDayName(i));
    //         j++;
    //     }
    //     return labels;
    // }

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

        //const labels = this.getXAxisLabels();
        //const labeledPriData = this.getLabeledData(this.state.primary, labels);
        //const labeledSecData = this.getLabeledData(this.state.secondary, labels);

        const barData = [
            {
                data: this.state.primary,
                svg: {
                    fill: Colors.secondary,
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
                    ticks.map(function (tick, index) {
                        if (index % 2 == 0) {
                            return (<Line key={tick} x1={"0%"} x2={"100%"} y1={y(tick)} y2={y(tick)} stroke={"grey"} />);
                        }
                    })
                }
            </G>
        );

        const CustomBars = ({ x, y, bandwidth, data }) => (


            data.map((value, index) =>
                <G>
                    <Rect
                        x={x(index)}
                        y={y(value) - 5} // Subtract Height / 2 to make half of the Rect above the bar
                        rx={5} // Set to Height / 2
                        ry={5} // Set to Height / 2
                        width={bandwidth}
                        height={10} // Height of the Rect
                        fill={'#ff0000'}

                    />
                </G>
            )


        );

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient spreadMethod={"pad"} id={"gradient"} x1={"0%"} y1={"70%"} x2={"70%"} y2={"0%"}>
                    <Stop offset={"0%"} stopColor={"#11645c"} stopOpacity={"1"} />
                    <Stop offset={"100%"} stopColor={Colors.accent1} stopOpacity={"1"} />
                </LinearGradient>
            </Defs>
        )


        const todayObj = new Date();
        const thisMonth = todayObj.getMonth();

        const monthAbrevs = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const monthStr = monthAbrevs[thisMonth];
        const yAxis = [0, 2, 4, 6, 8, 10].map((value) => ({ value }));
        const xAxis = ["01 ".concat(monthStr), "07 ".concat(monthStr), "14 ".concat(monthStr), "21 ".concat(monthStr), "28 ".concat(monthStr)].map((value) => ({ value }));
        const contentInset = { top: 30, bottom: 15 };
        const xAxisHeight = 30;
        const width = Dimensions.get('window').width

        return (
            <View style={{ width: "100%", alignSelf: 'stretch' }}>
                <View style={{ height: 300, width: "100%", flexDirection: "row", paddingRight: '5%', alignItems: "center", alignSelf: 'stretch' }}>

                    <BarChart
                        style={{ height: 300, width: "100%", paddingRight: 10, alignSelf: 'stretch' }}
                        data={barData}
                        yAccessor={({ item }) => item.value}
                        contentInset={contentInset}
                        {...this.props}
                        // svg={{color: "white"}}
                        spacingInner={.7}
                        spacingOuter={0.3}
                        gridMin={0}
                        //grid
                        // svg={{rx:"20"}} tried to make edges round but doesn't work
                        yMax={10}
                    >
                        {/* <CustomBars bandwidth={10} /> */}
                        <CustomGrid belowChart={true} />
                        <Gradient/>
                    </BarChart>
                    <YAxis
                        data={yAxis}
                        yAccessor={({ item }) => item.value}
                        //style={{ marginBottom: xAxisHeight }}
                        contentInset={contentInset}
                        svg={{ fontSize: 10, fill: Colors.secondary, paddingHorizontal: 20 }}
                        formatLabel={(value) => value}
                        numberOfTicks={5}
                    />
                </View>
                <View style={{ width: '100%', alignSelf: 'stretch', paddingRight:18}}>
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