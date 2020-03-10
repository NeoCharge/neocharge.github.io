import React from 'react';
import { StyleSheet, View, Dimensions, Text, Circle } from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory-native';
import Colors from '../assets/colors.js';

class CustomFlyout extends React.Component {
  render() {
    // const { x, y, orientation } = this.props;
    // const newY = orientation === "bottom" ? y - 35 : y + 35;
    return (
      <>
        {/* <View style={styles.line}></View> */}
      </>
    );
  }
}

export default class GraphComponent extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //       dataLabe: '',
  //   }
  // }

  transformDates() {
    const rawList = this.props.data
    const formattedJson = []

    rawList.forEach(obj => formattedJson.push({
      'ChargeDate': obj.startTime.slice(0, 10),
      'Length': obj.duration
    }))

    return formattedJson
  }

  transformTimes() {
    const rawList = this.props.data
    const formattedJson = []

    rawList.forEach(obj => {
      const d = new Date("December 3, 2019 11:13:00").toISOString().split('T')[0]
      const today = Date.parse(d)
      const date = Date.parse(obj.startTime.substring(0, 10))
      if (date == today)
        formattedJson.push({
          'ChargeDate': obj.startTime.slice(11, 16),
          'Length': obj.duration
        })
    }
    )

    return formattedJson
  }

  render() {
    const screenWidth = Dimensions.get('window').width;

    return (
      <View style={styles.container}>
        <VictoryChart
          // width={screenWidth - 50}
          height={300}
          // domainPadding={{ x: 40 }}
          theme={theme}
          containerComponent={
            <VictoryVoronoiContainer
              mouseFollowTooltips
              voronoiDimension="x"
              labels={({ datum }) => `${datum.Length}`}
              labelComponent={
                <VictoryTooltip
                  flyoutComponent={<CustomFlyout />}
                />
              }
            />
          }
        >
          {/* <VictoryLabel x={175} y={10} textAnchor='middle'/> */}
          <VictoryLine
            data={this.props.kind == 'times' ? this.transformTimes() : this.transformDates()}
            x='ChargeDate'
            y='Length'
            sortKey='ChargeDate'
          />
          <VictoryAxis axisLabelComponent={<VictoryLabel x={175} y={10} textAnchor='middle' angle={45} />} />
        </VictoryChart>
      </View >

    );
  }
}

// The code below is adapted from the VictoryTheme material:
// https://formidable.com/open-source/victory/guides/themes
// Colors
const yellow200 = "#FFF59D";
const deepOrange600 = "#F4511E";
const lime300 = "#DCE775";
const lightGreen500 = "#8BC34A";
const teal700 = "#00796B";
const cyan900 = "#006064";
const colors = [
  deepOrange600,
  yellow200,
  lime300,
  lightGreen500,
  teal700,
  cyan900
];
const blueGrey50 = "#ECEFF1";
const blueGrey300 = "#90A4AE";
const blueGrey700 = Colors.secondary; //"#455A64";
const grey900 = "#212121";

// Typography
const sansSerif = "'Helvetica Neue', Helvetica, sans-serif";
const letterSpacing = "normal";
const fontSize = 12;

// Layout
const padding = 8;
const baseProps = {
  width: 350,
  height: 350,
  padding: 50
};

// * Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: blueGrey700,
  stroke: Colors.secondary,
  strokeWidth: 0
};

const centeredLabelStyles = { ...baseLabelStyles, textAnchor: "middle" };

// Strokes
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Put it all together...
const theme = {
  area: {
    ...baseProps,
    style: {
      data: {
        fill: grey900
      },
      labels: centeredLabelStyles
    }
  },
  axis: {
    ...baseProps,
    style: {
      axis: {
        fill: "transparent",
        stroke: blueGrey300,
        strokeWidth: 2,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: {
        ...centeredLabelStyles,
        padding: 35,
        stroke: Colors.secondary
      },
      grid: {
        fill: "none",
        stroke: "none",
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin,
        pointerEvents: "painted"
      },
      ticks: {
        fill: "transparent",
        // size: 5,
        // stroke: blueGrey300,
        // strokeWidth: 1,
        // strokeLinecap,
        // strokeLinejoin
      },
      tickLabels: {
        ...baseLabelStyles,
        fill: blueGrey700
      }
    }
  },
  bar: {
    ...baseProps,
    style: {
      data: {
        fill: blueGrey700,
        padding,
        strokeWidth: 0
      },
      labels: baseLabelStyles
    }
  },
  chart: baseProps,
  errorbar: {
    ...baseProps,
    borderWidth: 8,
    style: {
      data: {
        fill: "transparent",
        opacity: 1,
        stroke: blueGrey700,
        strokeWidth: 2
      },
      labels: centeredLabelStyles
    }
  },
  group:
  {
    ...baseProps,
    colorScale: colors
  },
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: "vertical",
    titleOrientation: "top",
    style: {
      data: {
        type: "circle"
      },
      labels: baseLabelStyles,
      title: { ...baseLabelStyles, padding: 5 }
    }
  },
  line: {
    ...baseProps,
    style: {
      data: {
        fill: "transparent",
        opacity: 1,
        stroke: Colors.accent1,
        strokeWidth: 2
      },
      // labels: centeredLabelStyles
    }
  },
  stack: {
    ...baseProps,
    colorScale: colors
  },
  tooltip: {
    style: {
      ...centeredLabelStyles,
      padding: 5,
      pointerEvents: "none"
    },
    flyoutStyle: {
      stroke: grey900,
      strokeWidth: 1,
      fill: "#f0f0f0",
      pointerEvents: "none"
    },
    cornerRadius: 5,
    pointerLength: 10
  },
  voronoi: {
    ...baseProps,
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: {
        ...centeredLabelStyles,
        padding: 5,
        pointerEvents: "none"
      },
      flyout: {
        stroke: grey900,
        strokeWidth: 1,
        fill: "#f0f0f0",
        pointerEvents: "none"
      }
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    color: Colors.secondary
  },
  line: {
    // borderLeftColor: 'white',
    // borderLeftWidth: 1,
    backgroundColor: '#A2A2A2',
    width: 2,
    height: 165
  }
});