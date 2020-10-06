import React from "react";
import {
  Chart,
  Tooltip,
  Facet,
} from "bizcharts";
import DataSet from "@antv/data-set";
import autoHeight from "../autoHeight";

const data=[{
    "state": "WY",
    "小于5岁": 38253,
    "5至13岁": 60890,
    "14至17岁": 29314,
    "18至24岁": 53980,
    "25至44岁": 137338,
    "45至64岁": 147279,
    "65岁及以上": 65614
  }, {
    "state": "DC",
    "小于5岁": 36352,
    "5至13岁": 50439,
    "14至17岁": 25225,
    "18至24岁": 75569,
    "25至44岁": 193557,
    "45至64岁": 140043,
    "65岁及以上": 70648
  }, {
    "state": "VT",
    "小于5岁": 32635,
    "5至13岁": 62538,
    "14至17岁": 33757,
    "18至24岁": 61679,
    "25至44岁": 155419,
    "45至64岁": 188593,
    "65岁及以上": 86649
  }, {
    "state": "ND",
    "小于5岁": 41896,
    "5至13岁": 67358,
    "14至17岁": 33794,
    "18至24岁": 82629,
    "25至44岁": 154913,
    "45至64岁": 166615,
    "65岁及以上": 94276
  }, {
    "state": "AK",
    "小于5岁": 52083,
    "5至13岁": 85640,
    "14至17岁": 42153,
    "18至24岁": 74257,
    "25至44岁": 198724,
    "45至64岁": 183159,
    "65岁及以上": 50277
  }, {
    "state": "SD",
    "小于5岁": 58566,
    "5至13岁": 94438,
    "14至17岁": 45305,
    "18至24岁": 82869,
    "25至44岁": 196738,
    "45至64岁": 210178,
    "65岁及以上": 116100
  }, {
    "state": "DE",
    "小于5岁": 59319,
    "5至13岁": 99496,
    "14至17岁": 47414,
    "18至24岁": 84464,
    "25至44岁": 230183,
    "45至64岁": 230528,
    "65岁及以上": 121688
  }, {
    "state": "MT",
    "小于5岁": 61114,
    "5至13岁": 106088,
    "14至17岁": 53156,
    "18至24岁": 95232,
    "25至44岁": 236297,
    "45至64岁": 278241,
    "65岁及以上": 137312
  }, {
    "state": "RI",
    "小于5岁": 60934,
    "5至13岁": 111408,
    "14至17岁": 56198,
    "18至24岁": 114502,
    "25至44岁": 277779,
    "45至64岁": 282321,
    "65岁及以上": 147646
  }, {
    "state": "HI",
    "小于5岁": 87207,
    "5至13岁": 134025,
    "14至17岁": 64011,
    "18至24岁": 124834,
    "25至44岁": 356237,
    "45至64岁": 331817,
    "65岁及以上": 190067
  }, {
    "state": "NH",
    "小于5岁": 75297,
    "5至13岁": 144235,
    "14至17岁": 73826,
    "18至24岁": 119114,
    "25至44岁": 345109,
    "45至64岁": 388250,
    "65岁及以上": 169978
  }, {
    "state": "ME",
    "小于5岁": 71459,
    "5至13岁": 133656,
    "14至17岁": 69752,
    "18至24岁": 112682,
    "25至44岁": 331809,
    "45至64岁": 397911,
    "65岁及以上": 199187
  }, {
    "state": "ID",
    "小于5岁": 121746,
    "5至13岁": 201192,
    "14至17岁": 89702,
    "18至24岁": 147606,
    "25至44岁": 406247,
    "45至64岁": 375173,
    "65岁及以上": 182150
  }, {
    "state": "NE",
    "小于5岁": 132092,
    "5至13岁": 215265,
    "14至17岁": 99638,
    "18至24岁": 186657,
    "25至44岁": 457177,
    "45至64岁": 451756,
    "65岁及以上": 240847
  },]

function getComponent(data) {
  const dv = new DataSet.View().source(data);
  dv.transform({
    type: "fold",
    fields: ["小于5岁", "5至13岁", "14至17岁"],
    // 展开字段集
    key: "age",
    value: "count"
  }).transform({
    type: "percent",
    field: "count",
    dimension: "age",
    groupBy: ["state"],
  });

  class SliderChart extends React.Component {
    render() {
      return (
        <Chart height={100} data={dv} forceFit padding={0}>
          <Tooltip />
          <Facet
            type="list"
            fields={["state"]}
            showTitle={false}
            padding={0}
            eachView={(view, facet) => {
              view.coord("theta", {
                radius: 0.8,
                innerRadius: 0.6
              });
              view
                .intervalStack()
                .position("percent")
                .color("age");
              view.guide().html({
                position: ["50%", "50%"],
                html:
                  '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">' +
                  facet.data[0].state +
                  "</div>",
                alignX: "middle",
                alignY: "middle"
              });
            }}
          />
        </Chart>
      );
    }
  }
  return SliderChart;
}

class Piemultidonuts extends React.Component {
  render() {
    const SliderChart = getComponent(data);
    return (
      <div>
        <SliderChart />
      </div>
    );
  }
}
export default autoHeight()(Piemultidonuts);

